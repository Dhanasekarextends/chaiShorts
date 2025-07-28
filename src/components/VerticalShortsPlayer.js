import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

function normalizeShortsData(data) {
  if (!data) return [];
  if (Array.isArray(data) && data.every(item => item.videoUri)) return data;
  if (Array.isArray(data) && data[0] && Array.isArray(data[0].shorts)) {
    return data.flatMap(series =>
      (series.shorts || []).map(short => ({
        ...short,
        seriesImage: series.image,
        seriesTitle: series.title,
        seriesTagline: series.tagline,
      })),
    );
  }
  if (data.shorts && Array.isArray(data.shorts)) {
    return data.shorts.map(short => ({
      ...short,
      seriesImage: data.image,
      seriesTitle: data.title,
      seriesTagline: data.tagline,
    }));
  }
  if (data.videoUri) return [data];
  return [];
}
const ShortVideoItem = React.memo(function ShortVideoItem({
  item,
  index,
  current,
  isPaused,
  videoLoaded,
  videoSizes,
  setIsPaused,
  handleVideoLoad,
}) {
  const key = index.toString();
  const size = videoSizes[key] || {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  };
  const showSeriesInfo = !!item.seriesTitle;
  const thumbUri =
    item.thumbnail || item.image || item.seriesImage || undefined;

  return (
    <View
      style={[
        styles.videoContainer,
        { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={() => setIsPaused(val => !val)}
      >
        {!videoLoaded[key] && thumbUri ? (
          <Image
            source={{ uri: thumbUri }}
            style={[
              styles.video,
              {
                width: size.width,
                height: size.height,
                alignSelf: 'center',
                position: 'absolute',
              },
            ]}
            resizeMode="cover"
          />
        ) : null}
        <Video
          source={{ uri: item.videoUri }}
          style={{
            width: size.width,
            height: size.height,
            alignSelf: 'center',
          }}
          resizeMode="contain"
          repeat
          paused={current !== index || isPaused}
          muted={false}
          controls={false}
          onLoad={handleVideoLoad(key)}
          ignoreSilentSwitch="ignore"
          poster={thumbUri || undefined}
          posterResizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.overlay}>
        {showSeriesInfo && (
          <>
            <Text style={styles.seriesTitle}>{item.seriesTitle}</Text>
            {item.seriesTagline && (
              <Text style={styles.seriesTagline}>{item.seriesTagline}</Text>
            )}
          </>
        )}
        <Text style={styles.title}>
          {item.title || item.episodeTitle || 'Short'}
        </Text>
        {item.tagline && <Text style={styles.ep}>{item.tagline}</Text>}
        {item.description && (
          <Text style={styles.desc}>{item.description}</Text>
        )}
        {item.episodeNumber != null && (
          <Text style={styles.ep}>Episode: {item.episodeNumber}</Text>
        )}
        {item.duration != null && (
          <Text style={styles.duration}>Duration: {item.duration}s</Text>
        )}
      </View>
    </View>
  );
});

const VerticalShortsPlayer = props => {
  const { data, onEndReached } = props;
  const flatShorts = normalizeShortsData(data);

  const [current, setCurrent] = useState(0);
  const flatListRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState({});
  const [videoSizes, setVideoSizes] = useState({});

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrent(viewableItems[0].index);
  }).current;
  const viewabilityConfig = { itemVisiblePercentThreshold: 85 };

  const handleVideoLoad = useCallback(
    key => e => {
      setVideoLoaded(prev => ({ ...prev, [key]: true }));
      const { width = SCREEN_WIDTH, height = SCREEN_HEIGHT } =
        e.naturalSize || {};
      if (width && height) {
        const vidAspect = width / height;
        const screenAspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        let finalWidth = SCREEN_WIDTH,
          finalHeight = SCREEN_HEIGHT;
        if (vidAspect > screenAspect) {
          finalWidth = SCREEN_WIDTH;
          finalHeight = SCREEN_WIDTH / vidAspect;
        } else {
          finalHeight = SCREEN_HEIGHT;
          finalWidth = SCREEN_HEIGHT * vidAspect;
        }
        setVideoSizes(prev => ({
          ...prev,
          [key]: { width: finalWidth, height: finalHeight },
        }));
      }
    },
    [],
  );

  const renderItem = useCallback(
    ({ item = {}, index }) => (
      <ShortVideoItem
        item={item}
        index={index}
        current={current}
        isPaused={isPaused}
        videoLoaded={videoLoaded}
        videoSizes={videoSizes}
        setIsPaused={setIsPaused}
        handleVideoLoad={handleVideoLoad}
      />
    ),
    [current, isPaused, videoLoaded, videoSizes, handleVideoLoad],
  );

  const keyExtractor = useCallback((item, index) => index.toString());

  return (
    <FlatList
      ref={flatListRef}
      data={flatShorts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      getItemLayout={(_, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
      style={styles.list}
      onEndReachedThreshold={0.8}
      onEndReached={onEndReached}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#000' },
  videoContainer: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#111',
    justifyContent: 'flex-end',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: SCREEN_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    left: 16,
    bottom: 70,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.23)',
    padding: 16,
    borderRadius: 12,
  },
  seriesTitle: { color: '#f6c71a', fontWeight: 'bold', fontSize: 19 },
  seriesTagline: { color: '#fff3', fontSize: 14, marginBottom: 4 },
  title: { color: '#fff', fontWeight: '700', fontSize: 18, marginTop: 2 },
  desc: { color: '#fff', fontSize: 13, marginTop: 2 },
  ep: { color: '#fff9', fontSize: 13, marginTop: 2 },
  duration: { color: '#aaa', fontSize: 12, marginTop: 2 },
});

export default VerticalShortsPlayer;
