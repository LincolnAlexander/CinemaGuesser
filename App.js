/*
import { useFonts } from "expo-font";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./pages/LoginPage";
//import TestReactNative from "./pages/TestReactNative";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
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
function Home() {
  return <HomePage />;
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={HomeScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="testReact" component={Test} />
          <Stack.Screen name="Home" component={Home} />
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

*/

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/screens/LoginScreen";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./src/views/components/Loader";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("HomeScreen");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
