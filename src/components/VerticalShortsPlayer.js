import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
// Changing input to array of objects with videoUri,title,desc
function normalizeShortsData(data) {
  if (!data) return [];
  // If its an array and each item has videoUri return as standalone,continueWatching.
  if (Array.isArray(data) && data.every(item => item.videoUri)) return data;
  // If its an array of series objects with shorts array.
  if (Array.isArray(data) && data[0] && Array.isArray(data[0].shorts)) {
    // Flatten all series to a single big shorts array add seriesTitle to help with overlay
    return data.flatMap(series =>
      (series.shorts || []).map(short => ({
        ...short,
        seriesImage: series.image,
        seriesTitle: series.title,
        seriesTagline: series.tagline,
      })),
    );
  }

  // If its a single series object with shorts
  if (data.shorts && Array.isArray(data.shorts)) {
    return data.shorts.map(short => ({
      ...short,
      seriesImage: data.image,
      seriesTitle: data.title,
      seriesTagline: data.tagline,
    }));
  }

  // If its a single item with videoUri
  if (data.videoUri) return [data];
  return [];
}

const VerticalShortsPlayer = ({ data }) => {
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

  const handleVideoLoad = key => e => {
    setVideoLoaded(prev => ({ ...prev, [key]: true }));
    const { width = SCREEN_WIDTH, height = SCREEN_HEIGHT } =
      e.naturalSize || {};
    if (width && height) {
      const vidAspect = width / height;
      const screenAspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      let finalWidth = SCREEN_WIDTH,
        finalHeight = SCREEN_HEIGHT;
      // Below function is if the video is wider than screen, scale by width. But can we removed if we restrict it in admin login
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
  };

  const renderOverLay = (item, showSeriesInfo, key) => {
    return (
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
        {item.description ? (
          <Text style={styles.desc}>{item.description}</Text>
        ) : null}
        {item.episodeNumber != null && (
          <Text style={styles.ep}>Episode: {item.episodeNumber}</Text>
        )}
      </View>
    );
  };

  const renderPlaceHolderThumbnail = (thumbUri, key, size) => {
    //   Poster Image until loaded
    return (
      !videoLoaded[key] &&
      (thumbUri ? (
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
          blurRadius={0}
        />
      ) : (
        <View
          style={[
            styles.video,
            {
              backgroundColor: '#222',
              position: 'absolute',
              width: size.width,
              height: size.height,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ))
    );
  };

  const renderItem = ({ item = {}, index }) => {
    const key = item.id || item.videoUri || item.episodeNumber || index;
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
          {renderPlaceHolderThumbnail(thumbUri, key, size)}
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
        {renderOverLay(item, showSeriesInfo, key)}
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={flatShorts}
      keyExtractor={(_, index) => index.toString()}
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
      initialNumToRender={2}
      windowSize={3}
      style={styles.list}
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
});

export default VerticalShortsPlayer;
