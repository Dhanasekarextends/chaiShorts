import React, { useState } from 'react';
import { View, StyleSheet, ImageStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Theme } from '../styles/theme';

type ImageProps = {
  uri?: string;
  style?: ImageStyle;
  resizeMode?: keyof typeof FastImage.resizeMode;
  fallbackSource?: number; // e.g. require("../assets/fallback.png")
  skeletonProps?: {
    borderRadius?: number;
    width?: number;
    height?: number;
  };
};

const Image: React.FC<ImageProps> = ({
  uri,
  style,
  resizeMode = 'cover',
  fallbackSource,
  skeletonProps = {},
}) => {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // If no URI, fallback
  if (!uri || failed) {
    return (
      <View
        style={[
          style,
          styles.fallback,
          {
            backgroundColor: Theme.Colors.LIGHT_GREY,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {fallbackSource ? (
          <FastImage
            style={[style]}
            source={fallbackSource}
            resizeMode={FastImage.resizeMode[resizeMode]}
          />
        ) : null}
      </View>
    );
  }

  return (
    <View style={style}>
      {loading && (
        <SkeletonPlaceholder backgroundColor={Theme.Colors.SECONDARY}>
          <SkeletonPlaceholder.Item
            width={skeletonProps.width || '100%'}
            height={skeletonProps.height || '100%'}
            borderRadius={
              skeletonProps.borderRadius || (style as any)?.borderRadius || 0
            }
          />
        </SkeletonPlaceholder>
      )}
      <FastImage
        style={[StyleSheet.absoluteFill, style]}
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode[resizeMode]}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {},
});

export default Image;
