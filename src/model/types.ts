// /model/types.ts

import { ContentType, SubscriptionTier } from '../constants/enums';

export interface BannerConfig {
  display: boolean;
  type: ContentType | string;
  id: string;
  image: string;
  title: string;
  subtitle: string;
  subscriptionTier: SubscriptionTier | string;
}

export interface HomeConfig {
  banners: BannerConfig[];
  widgets: WidgetDisplayMap;
}

export interface WidgetDisplayMap {
  continueWatching: { display: boolean };
  categoryRows: { display: boolean };
  discoverShortsWidget: { display: boolean };
  featuredCreatorsWidget: { display: boolean };
}

export interface HomeContentItem {
  type: ContentType | string;
  id: string;
  image: string;
  title: string;
  episodeTitle?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  progress?: number;
  tagline?: string;
  subscriptionTier?: SubscriptionTier | string;
}

export interface CategoryRow {
  title: string;
  display?: boolean; // for future: API should NOT send this
  subscriptionTier?: SubscriptionTier | string;
  items: HomeContentItem[];
}

export interface WidgetConfig {
  title: string;
  subtitle?: string;
  actionText?: string;
  image?: string;
  link?: string;
}

export interface CreatorsWidgetConfig {
  title: string;
  creators: {
    id: string;
    displayName: string;
    profileImage: string;
    shortsCount: number;
  }[];
}

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  lastLoginAt?: string;
  emailVerified?: boolean;
  mobileNumber?: string;
  mobileVerified?: boolean;
  subscription: {
    tier: SubscriptionTier | string;
    isActive: boolean;
    expiresAt?: string;
    isTrial?: boolean;
    paymentProvider?: string;
    autoRenew?: boolean;
  };
  preferences?: {
    language?: string;
    theme?: string;
    autoplayNext?: boolean;
    notifications?: {
      news?: boolean;
      recommendations?: boolean;
      productUpdates?: boolean;
    };
  };
  parentalControls?: {
    enabled: boolean;
    maxTierAllowed?: SubscriptionTier | string;
    pinSet?: boolean;
  };
  bookmarks?: string[];
  continueWatching?: Array<{
    type: string;
    id: string;
    seriesId?: string;
    progress: number;
    lastWatchedAt?: string;
  }>;
  history?: Array<{
    id: string;
    type: string;
    watchedAt: string;
  }>;
  roles?: string[];
  status?: 'active' | 'banned' | 'inactive';
  social?: {
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  meta?: {
    lastDevice?: string;
    appVersion?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
