import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../modules/HomeScreen/HomeScreen';
import ShortsPlayerScreen from '../modules/ShortsPlayer/ShortsPlayer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Can be mapped if we have multiple routes from an array */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShortsPlayer" component={ShortsPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
