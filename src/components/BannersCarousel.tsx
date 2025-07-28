import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { BannerConfig } from '../model/types';
import { Theme } from '../styles/theme';

const { width } = Dimensions.get('window');

export interface BannersCarouselProps {
  banners: BannerConfig[];
  onPressBanner?: (banner: BannerConfig) => void;
}

const BannersCarousel: React.FC<BannersCarouselProps> = ({
  banners,
  onPressBanner,
}) => {
  const items = banners.filter(b => b.display);
  if (!items?.length) return null;
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 32 + 16} // card width + gap
      decelerationRate="fast"
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.bannerContainer,
            { marginRight: index === items.length - 1 ? 0 : 16 },
          ]}
          activeOpacity={0.8}
          onPress={() => onPressBanner && onPressBanner([item])}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textOverlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width - 32,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Theme.Colors.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    left: 24,
    bottom: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: 8,
  },
  title: {
    color: Theme.Colors.TERTIARY,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Theme.Colors.LIGHT_GREY,
    fontSize: 16,
    marginTop: 4,
  },
});

export default BannersCarousel;
