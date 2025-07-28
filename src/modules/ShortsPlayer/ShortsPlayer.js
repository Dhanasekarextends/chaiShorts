import React from 'react';
import VerticalShortsPlayer from '../../components/VerticalShortsPlayer';

export default function ShortsPlayerScreen({ data }) {
  console.log('ShortsPlayerScreen data:', data);
  return <VerticalShortsPlayer data={data} />;
}
