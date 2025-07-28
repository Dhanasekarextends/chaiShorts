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
import { CategoryRow, HomeContentItem } from '../model/types';
import { Theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const CategoryRowSection: React.FC<{
  row: CategoryRow;
  onPressItem: (item: HomeContentItem) => void;
}> = ({ row, onPressItem }) =>
  row.display ? (
    <View style={styles.container}>
      <Text style={styles.title}>{row.title}</Text>
      <FlatList
        data={row.items}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onPressItem(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text numberOfLines={2} style={styles.itemTitle}>
              {item.title}
            </Text>
            {item.tagline && <Text style={styles.tagline}>{item.tagline}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  ) : null;

const styles = StyleSheet.create({
  container: { marginVertical: 16, paddingLeft: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.Colors.TERTIARY,
    marginBottom: 8,
  },
  item: { width: width * 0.34, marginRight: 14 },
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
  tagline: {
    fontSize: 11,
    color: Theme.Colors.GREY,
    marginTop: 2,
  },
});

export default CategoryRowSection;
