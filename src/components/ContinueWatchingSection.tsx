import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { HomeContentItem } from '../model/types';
import ProgressBar from './ProgressBar';
import { Theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const ContinueWatchingSection: React.FC<{
  items: HomeContentItem[];
  onPressItem: (item: HomeContentItem) => void;
}> = ({ items, onPressItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Continue Watching</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onPressItem([item])}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text numberOfLines={2} style={styles.itemTitle}>
              {item.title}
            </Text>
            {typeof item.progress === 'number' && (
              <ProgressBar progress={item.progress} />
            )}
            {item.episodeTitle && (
              <Text style={styles.episode}>Ep: {item.episodeTitle}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16, paddingLeft: 16 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: Theme.Colors.SECONDARY,
    marginBottom: 8,
    color: Theme.Colors.TERTIARY,
  },
  item: { width: width * 0.34, marginRight: 16 },
  image: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 8,
    backgroundColor: Theme.Colors.SECONDARY,
  },
  itemTitle: {
    marginTop: 5,
    color: Theme.Colors.TERTIARY,
    fontWeight: 'bold',
    fontSize: 14,
  },
  episode: {
    fontSize: 12,
    color: Theme.Colors.GREY,
    marginTop: 2,
  },
});

export default ContinueWatchingSection;
