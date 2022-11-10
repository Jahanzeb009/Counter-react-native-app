/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { DefaultTheme } from 'react-native-paper';
import CountDown from './src/screens/countDown';


import Home from './src/screens/home';
import Setting from './src/screens/setting';

const Stack = createNativeStackNavigator()

const App = () => {


  const myLight = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#03a073',
      background: "#f3f4f6",
      card: "#ffffff",
      border: '#c7c7c7',
      mainText: '#1f1f1f',
      subMainText: '#474747',
      smallBoxCenter: "#b2d7d7",
    }, roundness: 26,
  }

  const myDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#03a073',
      background: '#151515',
      card: "#000000",
      border: '#5e5e5e',
      mainText: '#c7c7c7',
      subMainText: '#8f8f8f',
      smallBoxCenter: '#4d4d4d',
    }
  }

  let theme = useColorScheme() === 'dark' ? myDark : myLight


  return (
    // <NativeViewGestureHandler disallowInterruption={true}>
      <NavigationContainer theme={theme} >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CountDown' component={CountDown} />
          <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    // {/* </NativeViewGestureHandler> */}
  )

};



export default App;
