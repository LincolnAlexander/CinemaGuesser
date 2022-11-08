import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import * as React from "react";
import { useFonts } from "expo-font";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
//import { NavigationContainer } from "react-navigation/native";
const axios = require("axios");
const customFont = "RobotoSlab-Medium";

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("./assets/fonts/RobotoSlab-Medium.ttf"),
  });
  return <RegisterPage />;
  //return <LoginPage />;
}
