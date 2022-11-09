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
const customFont = "RobotoSlab-Medium";

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

export default function LoginPage() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
  });
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/AppBackground.jpg")}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/AppLogo.png")}
          ></Image>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.username}>
            <TextInput
              style={{ color: "white" }}
              placeholderTextColor="white"
              placeholder="username"
              onChangeText={(newText) => setUsername(newText)}
              defaultValue={username}
            />
            <View style={styles.horizontalBar}></View>
          </View>
          <View style={styles.password}>
            <TextInput
              style={{ color: "white" }}
              placeholderTextColor="white"
              placeholder="Password"
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={username}
            />
            <View style={styles.horizontalBar}></View>
          </View>

          <View style={styles.touchables}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => Alert.alert("Log in")}
            >
              <Image
                source={require("../assets/images/LoginButton.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={styles.loginText}
                onPress={() => Alert.alert("Log in")}
              >
                Create Account
              </Text>
              <View style={styles.verticalBar}></View>
              <TouchableOpacity>
                <Text
                  style={styles.loginText}
                  onPress={() => Alert.alert("Log in")}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
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
