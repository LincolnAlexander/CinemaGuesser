//import { AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
const axios = require("axios");
const customFont = "RobotoSlab-Medium";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen() {
  return <LoginPage />;
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function RegisterPage() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
  });

  const ref = React.useRef(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/AppBackground.jpg")}
      >
        <View style={styles.header}>
          <View style={styles.loginContainer}>
            <View style={styles.loginText}>
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="white"
                placeholder="First Name"
                onChangeText={(newText) => setFirst(newText)}
                defaultValue={firstName}
              />
              <View style={styles.horizontalBar}></View>
            </View>

            <View style={styles.loginText}>
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="white"
                placeholder="Last Name"
                onChangeText={(newText) => setLast(newText)}
                defaultValue={lastName}
              />
              <View style={styles.horizontalBar}></View>
            </View>

            <View style={styles.loginText}>
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="white"
                placeholder="Username"
                onChangeText={(newText) => setUsername(newText)}
                defaultValue={username}
              />
              <View style={styles.horizontalBar}></View>
            </View>

            <View style={styles.loginText}>
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="white"
                placeholder="Password"
                onChangeText={(newText) => setPassword(newText)}
                defaultValue={password}
              />
              <View style={styles.horizontalBar}></View>
            </View>

            <View style={styles.loginText}>
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="white"
                placeholder="Email"
                onChangeText={(newText) => setEmail(newText)}
                defaultValue={email}
              />
              <View style={styles.horizontalBar}></View>
              <View style={styles.touchables}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => Alert.alert("Log in")}
                >
                  <Image
                    source={require("../assets/images/RegisterButton.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    marginTop: "15%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
  loginContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // margin: '5%',
  },

  username: {
    margin: 15,
  },

  password: {
    margin: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
    fontWeight: "500",
    fontSize: 20,
  },

  horizontalBar: {
    backgroundColor: "#F1CF54",
    height: 3,
    width: 275,
  },
  verticalBar: {
    backgroundColor: "#F1CF54",
    height: 20,
    width: 2,
  },

  touchables: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  loginText: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
  },
});
