import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { WidgetConfig } from '../model/types';
import { Theme } from '../styles/theme';

const DiscoverShortsWidget: React.FC<{ widget: WidgetConfig }> = ({
  widget,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85}>
      {widget.image && (
        <Image source={{ uri: widget.image }} style={styles.image} />
      )}
      <View style={styles.text}>
        <Text style={styles.title}>{widget.title}</Text>
        {widget.subtitle && (
          <Text style={styles.subtitle}>{widget.subtitle}</Text>
        )}
        {!!widget.actionText && (
          <Text style={styles.actionText}>{widget.actionText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    backgroundColor: Theme.Colors.SECONDARY,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 82,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  text: { padding: 14 },
  title: { color: Theme.Colors.TERTIARY, fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: Theme.Colors.GREY, fontSize: 15, marginTop: 4 },
  actionText: { color: Theme.Colors.PRIMARY, fontWeight: '700', marginTop: 8 },
});

export default DiscoverShortsWidget;
