import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../styles/theme';

const ProgressBar: React.FC<{ progress: number }> = ({ progress = 0 }) => (
  <View style={styles.barBg}>
    <View style={[styles.progress, { width: `${progress}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  barBg: {
    height: 5,
    backgroundColor: Theme.Colors.GREY,
    width: '100%',
    borderRadius: 3,
    marginTop: 4,
  },
  progress: {
    backgroundColor: Theme.Colors.PRIMARY,
    height: 5,
    borderRadius: 3,
  },
});

export default ProgressBar;
