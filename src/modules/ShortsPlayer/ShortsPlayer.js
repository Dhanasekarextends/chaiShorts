import React, { useCallback, useState } from 'react';
import VerticalShortsPlayer from '../../components/VerticalShortsPlayer';

export default function ShortsPlayerScreen({ data: initialData }) {
  const [shorts, setShorts] = useState(initialData || []);

  const fetchMoreShorts = useCallback(() => {
    // const base = shorts.length;
    // const extraShorts = [
    //   {
    //     id: `Short Concat #${base + 1}`,
    //     videoUri:
    //       'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
    //     title: `Short Concat`,
    //     tagline: 'Extra short, just added!',
    //     thumbnail:
    //       'https://media.gettyimages.com/id/1472616738/video/loading-green-circle-icon-on-alpha-channel-background-animation-vertical-9-16-format-smart.jpg?s=640x640&k=20&c=OpGCY9JHbb-nYNHGZS9uVT25CZIZF4jS3I1H30tZ18Q=',
    //     description: 'Auto-concat #1',
    //     duration: 65,
    //   },
    //   {
    //     id: `Short Concat #${base + 2}`,
    //     videoUri:
    //       'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4',
    //     title: `Short Concat`,
    //     tagline: 'Another short, appended!',
    //     thumbnail:
    //       'https://media.gettyimages.com/id/1472616738/video/loading-green-circle-icon-on-alpha-channel-background-animation-vertical-9-16-format-smart.jpg?s=640x640&k=20&c=OpGCY9JHbb-nYNHGZS9uVT25CZIZF4jS3I1H30tZ18Q=',
    //     description: 'Auto-concat #2',
    //     duration: 70,
    //   },
    // ];
    // setShorts(prev => [...prev, ...extraShorts]);
  }, []);

  return <VerticalShortsPlayer data={shorts} onEndReached={fetchMoreShorts} />;
}
