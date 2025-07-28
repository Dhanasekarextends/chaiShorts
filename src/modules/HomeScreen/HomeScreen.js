import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import BannersCarousel from '../../components/BannersCarousel';
import ContinueWatchingSection from '../../components/ContinueWatchingSection';
import CategoryRowSection from '../../components/CategoryRowSection';
import DiscoverShortsWidget from '../../components/DiscoverShortsWidget';
import FeaturedCreators from '../../components/FeaturedCreators';
import { Theme } from '../../styles/theme';
import config from '../../model/baseConfig.json';
import user from '../../model/userData.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fetchDashboardDetails,
  handleDashboardApiResults,
} from '../../utils/utils';
import widgetDummy from '../../model/widgetDummy';
import ShortsPlayer from '../../components/VerticalShortsPlayer';

export default function HomeScreen() {
  const [widgetsLoading, setWidgetsLoading] = useState(true);

  // Widget data
  const [continueWatchingItems, setContinueWatchingItems] = useState([]);
  const [categoryRows, setCategoryRows] = useState([]);
  const [discoverShortsWidgetData, setDiscoverShortsWidgetData] = useState([]);
  const [featuredCreatorsData, setFeaturedCreatorsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentShortsData, setCurrentShortsData] = useState(null);

  // One global error for all
  const [apiError, setApiError] = useState(null);

  const banners = config.banners.filter(b => b.display);

  useEffect(() => {
    setWidgetsLoading(true);
    setApiError(null);

    // Gather widget config (display flags)
    const widgets = {
      continueWatching: config.widgets.continueWatching.display,
      categoryRows: config.widgets.categoryRows.display,
      discoverShortsWidget: config.widgets.discoverShortsWidget.display,
      featuredCreatorsWidget: config.widgets.featuredCreatorsWidget.display,
    };

    fetchDashboardDetails(widgets)
      .then(handleDashboardApiResults)
      .then(({ error }, apiResponse) => {
        const {
          continueWatchingItems,
          categoryRows,
          discoverShortsWidget,
          featuredCreatorsWidget,
        } = widgetDummy.widgets;
        console.log('API Response:', {
          widgetDummy,
          continueWatchingItems,
          categoryRows,
          discoverShortsWidget,
          featuredCreatorsWidget,
        });
        setContinueWatchingItems(continueWatchingItems.items || []);
        setCategoryRows(categoryRows || []);
        setDiscoverShortsWidgetData(discoverShortsWidget || []);
        setFeaturedCreatorsData(featuredCreatorsWidget || []);
        setApiError(error);
      })
      .finally(() => setWidgetsLoading(false));
  }, [
    config.widgets.continueWatching.display,
    config.widgets.categoryRows.display,
    config.widgets.discoverShortsWidget.display,
    config.widgets.featuredCreatorsWidget.display,
    user.id,
  ]);

  const handlePressItem = item => {
    setCurrentShortsData(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentShortsData(null);
  };

  // Render functions
  function renderBanners() {
    return banners.length > 0 ? (
      <BannersCarousel banners={banners} onPressBanner={handlePressItem} />
    ) : (
      []
    );
  }
  function renderContinueWatching() {
    if (!continueWatchingItems) return [];
    return (
      <ContinueWatchingSection
        items={continueWatchingItems || []}
        onPressItem={handlePressItem}
      />
    );
  }
  function renderCategoryRows() {
    if (!categoryRows) return [];
    return categoryRows.length > 0
      ? categoryRows.map(row => (
          <CategoryRowSection
            key={row.title}
            row={row}
            onPressItem={handlePressItem}
          />
        ))
      : [];
  }
  function renderDiscoverShortsWidget() {
    if (!discoverShortsWidgetData) return [];
    return <DiscoverShortsWidget widget={discoverShortsWidgetData} />;
  }
  function renderFeaturedCreators() {
    if (!featuredCreatorsData) return [];
    return <FeaturedCreators widget={featuredCreatorsData} />;
  }
  function renderWelcomeMessage() {
    return (
      <View style={styles.greetingRow}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.hello}>
          Hello,{' '}
          <Text style={{ color: Theme.Colors.PRIMARY }}>
            {user.displayName}
          </Text>
          !
        </Text>
      </View>
    );
  }

  function renderLoading() {
    if (widgetsLoading) {
      return (
        <ActivityIndicator
          style={styles.loading}
          color={Theme.Colors.PRIMARY}
        />
      );
    }
  }

  const renderShortsModal = () => {
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <View style={styles.modalPlayerContainer}>
          <Text style={styles.closeButton} onPress={closeModal}>
            ✕
          </Text>
          <ShortsPlayer data={currentShortsData} />
        </View>
      </Modal>
    );
  };

  function renderApiError() {
    <Text style={styles.errorText}>{apiError}</Text>;
  }

  // Main JSX
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderWelcomeMessage()}
        {renderBanners()}
        {renderLoading()}
        {apiError ? (
          renderApiError()
        ) : (
          <>
            {renderContinueWatching()}
            {renderCategoryRows()}
            {renderDiscoverShortsWidget()}
            {renderFeaturedCreators()}
          </>
        )}
      </ScrollView>
      {renderShortsModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.Colors.BACKGROUND },
  greetingRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: Theme.Colors.SECONDARY,
  },
  hello: { color: Theme.Colors.TERTIARY, fontSize: 22 },
  loading: { marginVertical: 24 },
  errorText: {
    color: Theme.Colors.RED,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalPlayerContainer: { flex: 1, backgroundColor: '#000' },
  closeButton: {
    color: '#fff',
    fontSize: 28,
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
  },
});
