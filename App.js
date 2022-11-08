import * as React from "react";
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
import { useFonts } from "expo-font";
import LoginPage from "./pages/LoginPage";
/*make sure to install axios on mobile
steps: on terminal type:
1) npm init -y
2) npm install axios
*/
const axios = require("axios");

const customFont = "RobotoSlab-Medium";

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("./assets/fonts/RobotoSlab-Medium.ttf"),
  });
  return <LoginPage />;
}
