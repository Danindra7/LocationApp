/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RootScreen from './src/RootScreen';


const App = () => {

  return (
    <SafeAreaView>
      <View>
        <RootScreen />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
