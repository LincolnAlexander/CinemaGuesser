
import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Button, Alert } from 'react-native';
import { useFonts } from 'expo-font'; 
import LoginPage from './pages/LoginPage';

const customFont = 'RobotoSlab-Medium';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoSlab-Medium': require('./assets/fonts/RobotoSlab-Medium.ttf'),
  });
  return (
    
    <LoginPage/>
    
  );
}


