/*
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const axios = require("axios");
const customFont = "RobotoSlab-Medium";

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("./assets/fonts/RobotoSlab-Medium.ttf"),
  });
  //return <RegisterPage />;
  return <LoginPage />;
}

*/
import { useFonts } from "expo-font";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./pages/LoginPage";
//import TestReactNative from "./pages/TestReactNative";
import RegisterPage from "./pages/RegisterPage";
import { Transition } from "react-transition-group";
const axios = require("axios");
import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
const customFont = "RobotoSlab-Medium";
const Stack = createStackNavigator();
const duration = 300;

function HomeScreen() {
  return <LoginPage />;
}

function Register() {
  return <RegisterPage />;
}

function Test() {
  return <TestReactNative />;
}

function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("./assets/fonts/RobotoSlab-Medium.ttf"),
  });
  const ref = React.useRef(null);
  const [username, setUsername] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={HomeScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="testReact" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
      <Button
        onPress={() => ref.current && ref.current.navigate("Register")}
        title="Register"
      />
    </View>
  );
}

export default App;
