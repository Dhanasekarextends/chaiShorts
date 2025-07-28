// src/utils/utils.js

import { Api, ApiError } from './api';
import user from '../model/userData.json';

// --------- Utility Functions ---------

// Check user's access level (you may want to keep your enum import, or just use strings)
export function canAccess(userTier, requiredTier) {
  const hierarchy = ['free', 'premium', 'pro'];
  return hierarchy.indexOf(userTier) >= hierarchy.indexOf(requiredTier);
}

// Find full item info by ID
export function findItemById(items, id) {
  return items.find(item => item.id === id);
}

// Merge Continue Watching info from user and config
export function getContinueWatchingItems(user, configItems) {
  if (!user.continueWatching || !Array.isArray(user.continueWatching))
    return [];
  return user.continueWatching
    .map(ucw => findItemById(configItems, ucw.id))
    .filter(Boolean);
}

// -- Dashboard Widget Bulk API Fetch --
function fetchAndResolve(apiEndpoint, widgetName) {
  return Api.get(apiEndpoint)
    .then(data => [widgetName, data])
    .catch(error => {
      console.error(`Error fetching ${widgetName}:`, error);
      return [widgetName, null];
    });
}

export function fetchDashboardDetails(widgets) {
  const jobs = [];

  if (widgets.continueWatching) {
    fetchAndResolve('todos/1', 'continueWatchingItems');
  }

  if (widgets.categoryRows) {
    fetchAndResolve('todos/1', 'categoryRows');
  }

  if (widgets.discoverShortsWidget) {
    fetchAndResolve('todos/1', 'discoverShortsWidgetItem');
  }

  if (widgets.featuredCreatorsWidget) {
    fetchAndResolve('todos/1', 'featuredCreatorsItem');
  }

  return Promise.allSettled(jobs);
}

// -- Handle allSettled dashboard API results --
export function handleDashboardApiResults(results) {
  const data = {
    continueWatchingItems: null,
    categoryRows: null,
    discoverShortsWidgetItem: null,
    featuredCreatorsItems: null,
  };
  let error = null;

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const [key, value] = result.value || [];
      if (key in data) data[key] = value;
    } else if (!error && result.status === 'rejected') {
      // First error message wins
      if (result.reason && result.reason.message) {
        error = result.reason.message;
      } else if (typeof result.reason === 'string') {
        error = result.reason;
      } else {
        error = 'Something went wrong while loading home content.';
      }
    }
  }

  return { ...data, error };
}
