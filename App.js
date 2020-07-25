
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomScreen from './screens/WelcomeScreen';
console.disableYellowBox = true;
export default function App() {
  return (
    <WelcomScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
