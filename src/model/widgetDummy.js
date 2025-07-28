export default {
  widgets: {
    continueWatchingItems: {
      display: true,
      items: [
        // Series in progress example
        {
          type: 'shortSeries',
          id: 'cdfed42059f14afc8be5bca13abc5800',
          seriesId: 'f1a8fcbf36e044bfaa406eebffefd36e',
          episodeNumber: 3,
          progress: 87,
          progressTime: 61, // seconds into this episode
          image:
            'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTY_oFMWa4w_MOegHro1RQFJygb7yu6ECJNjt0DIKOAEA00qkrtT2db1NM6RKMyEuhv4LPUrF96wCiAEvoSewxNHpcLSAQvrnr4.webp?r=c69',
          title: 'Minute Magic',
          episodeTitle: 'How Rainbows Form',
          seasonNumber: 1,
          subscriptionTier: 'free',
          videoUri:
            'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
          lastWatchedAt: '2024-07-29T10:09:10Z',
        },
        // Standalone short
        {
          type: 'shortStandalone',
          id: 'c6427ba2d3134a608bef09dd52a005e8',
          image:
            'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABYstWSrea_lL8g7-wOCuu2Knms2Gjf0LTvZhkWq__5Lec5JnoohcKvRTXHXN0dfj7PccZ7U9pcQ2AOJH6dx-GydOx1dX38QcmmM.webp?r=75b',
          title: 'Code in 60 Seconds',
          progress: 100,
          progressTime: 60,
          subscriptionTier: 'pro',
          videoUri:
            'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
          lastWatchedAt: '2024-07-29T11:01:00Z',
        },
      ],
    },

    categoryRows: [
      {
        title: 'Trending Shorts Series',
        display: true,
        subscriptionTier: 'free',
        items: [
          {
            type: 'shortSeries',
            id: 'f1a8fcbf36e044bfaa406eebffefd36e',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABWnLE3GO0IoZDxcYP4RNTiQjDbCH1Q5IaFrptOJP3uhS89tCWue1UFeWYdy5u61vl3rGy1fzFL7hPHpTKkHP1pos9TrXJuA7pnU.webp?r=e4d',
            title: 'Minute Magic',
            tagline: 'Bite-size Science Explainers',
            shorts: [
              {
                seriesId: 'f1a8fcbf36e044bfaa406eebffefd36e',

                id: '7e1bc79fff6144e7bb92e00b594a65404',
                videoUri:
                  'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
                episodeNumber: 1,
                title: 'Air Pressure in a Glass',
                seasonNumber: 1,
                duration: 62,
              },
              {
                seriesId: 'f1a8fcbf36e044bfaa406eebffefd36e',

                id: '7e1bc79fff6144e7bb92e00b594a65403',
                videoUri:
                  'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4',
                episodeNumber: 2,
                title: 'Gravity Drop Demo',
                seasonNumber: 1,
                duration: 58,
              },
            ],
          },
          {
            type: 'shortSeries',
            id: '7e1bc79fff6144e7bb92e00b594a6540',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABZbwxFGCqW08vgMocRcj8spLhTTZnpooMHRR29KNJPyVVK-iHwmVyp-FddoE6_qrL9h7O-xi9ZusyEssewrn1vqnHQ4XFTqsiTCkLzi6n7GB8E_ZCbtJXI-YOj_17MFlShrR.jpg?r=7ec',
            title: 'Science in a Snap',
            tagline: 'One concept per minute',
            shorts: [
              {
                seriesId: '7e1bc79fff6144e7bb92e00b594a6540',

                id: '7e1bc79fff6144e7bb92e00b594a65401',
                videoUri:
                  'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
                episodeNumber: 1,
                title: 'Molecules Move!',
                seasonNumber: 1,
                duration: 55,
              },
              {
                seriesId: 'f1a8fcbf36e044bfaa406eebffefd36e',

                id: '7e1bc79fff6144e7bb92e00b594a65402',
                videoUri:
                  'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4',
                episodeNumber: 2,
                title: 'Gravity Drop Demo',
                seasonNumber: 1,
                duration: 58,
              },
            ],
          },
        ],
      },
      {
        title: 'Top Standalone Shorts',
        display: true,
        subscriptionTier: 'premium',
        items: [
          {
            type: 'shortStandalone',
            id: '4fe61c6f0b2e427cb8ae99bb95fa4bb7',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABe9u0MfXau6hIjEoeE48IxAmwXjEnbYbCk5mlPA4Y1fLvENTeZ3CAD5giKQaamh8viznjv2n7FygoP_YYybNUcmvm-TnuTsWhoLIeKJceFkbCrJk3871ovdvsbkxa-uZKMl4.jpg?r=400',
            title: 'AI Explained in 59s',
            videoUri:
              'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
          },
          {
            type: 'shortStandalone',
            id: 'abcd4e6fa29c4d1d84e2008c9940e222',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVhr_pvD_nVEmKOOwzMp0wrKSLAS4WWQBsWCsg-28OVYwcp9x0MXq2U3EMppz2Ood62J57FDYxaOuwAFBXlZN4ZrNOQ8n1URDVI.webp?r=65f',
            title: 'Quick CSS Grid Hack',
            videoUri:
              'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
          },
        ],
      },
      {
        title: "Editor's Picks – Shorts",
        display: true,
        subscriptionTier: 'pro',
        items: [
          {
            type: 'shortSeries',
            id: '25c1ee94b349404b8eacd51da8f43e31',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABa5BCf6HoCBQCEQW5JNP301dwSPyJPEXbFicrHodTtnqA1AtzHfQyEfkHWQurDLPdc9Eq4LszcOs9gzzykJ3FvNwjhX2B7KLteY.webp?r=edfg',
            title: 'Data Science Bites',
            tagline: 'Quick Data Know-How',
            shorts: [
              {
                seriesId: '25c1ee94b349404b8eacd51da8f43e31',
                videoUri:
                  'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
                episodeNumber: 1,
                title: 'What is Regression?',
                seasonNumber: 1,
                duration: 67,
              },
            ],
          },
          {
            type: 'shortStandalone',
            id: 'b2078f512e7b4da28367e3d957b6c1f1',
            image:
              'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABYOSv2XJhtOOxZoDqYpV6u0SCSDe7-CoptcE7d7C-mQG1S8zXfN-XNDIqKk76UVniPM5fHO6rSQJLwK7GURCu11d0Tgv7JKu4NM.webp?r=722',
            title: 'What is a Neural Net?',
            videoUri:
              'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4',
          },
        ],
      },
    ],

    discoverShortsWidget: {
      display: true,
      title: 'Discover More Shorts',
      subtitle: 'Fresh, fast content daily',
      actionText: 'Explore All',
      image:
        'https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABfeLrQXKvW3LIkk1Q1DIaa7SdwumRV7svm0aMOhQfK8tUy_W4By4lgMSV8x5gOvNzW19CjKPl2Y9MOcVscjIYmyDz-P0aBcb639bBtF88A0SEfO6uQlhMRynQSjC2RWIRTmsVOysIQ8mj-mNLCsQb7jOpWwiCVrkt7jFbNe5ADBP7j1MVL3HDgQCv1VKJWs.jpg?r=0d8',
      link: '/discover/shorts',
    },

    featuredCreatorsWidget: {
      display: true,
      title: 'Featured Creators',
      creators: [
        {
          id: 'e9a151e3182d45cba5336ac3ff30c03c',
          displayName: 'TechGirl',
          profileImage:
            'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
          shortsCount: 14,
        },
        {
          id: 'c6e9b1ae9bb64a7ab634c4d6928601d7',
          displayName: 'DrQuick',
          profileImage:
            'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
          shortsCount: 7,
        },
      ],
    },
  },
};
