import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomeScreen from './src/modules/HomeScreen/HomeScreen';

function App() {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
