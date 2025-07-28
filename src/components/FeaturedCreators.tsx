import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { CreatorsWidgetConfig } from '../model/types';
import { Theme } from '../styles/theme';

const FeaturedCreators: React.FC<{ widget: CreatorsWidgetConfig }> = ({
  widget,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{widget.title}</Text>
    <FlatList
      data={widget.creators}
      horizontal
      keyExtractor={c => c.id}
      renderItem={({ item }) => (
        <View style={styles.creatorItem}>
          <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          <Text style={styles.name}>{item.displayName}</Text>
          <Text style={styles.count}>{item.shortsCount} shorts</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 16, marginLeft: 16 },
  title: {
    color: Theme.Colors.TERTIARY,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  creatorItem: { alignItems: 'center', marginRight: 24 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.Colors.SECONDARY,
  },
  name: { color: Theme.Colors.TERTIARY, marginTop: 6, fontWeight: '600' },
  count: { color: Theme.Colors.GREY, fontSize: 12, marginTop: 2 },
});

export default FeaturedCreators;
