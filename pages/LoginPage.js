import { AsyncStorage } from "@react-native-async-storage/async-storage";
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
import RegisterPage from "./RegisterPage";
const customFont = "RobotoSlab-Medium";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { createErrorHandler } from "expo/build/errors/ExpoErrorManager";
import { setStatusBarBackgroundColor } from "expo-status-bar";
const Stack = createStackNavigator();

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

function Register() {
  return <RegisterPage />;
}

const errorHandler = () => {
  setStatusBarBackgroundColor("red");
};

const Login = async () => {
  let uError = (pError = null);

  if (username == null || password == null) {
    if (username == null) {
      uError = "Please Enter your Username";
    }

    if (password == null) {
      pError = "Please Enter your Password";
    }
  } else {
    const payload = {
      username: username,
      password: password,
    };

    try {
      setLoad(true);

      const baseURL = "https://cinema-guesser.herokuapp.com";

      const response = await axios.post(baseURL + "/api/user/login/", payload);

      console.log(response.data);
    } catch (error) {
      uError = "Incorrect Username";

      pError = "Incorrect Password";
    }
  }

  setError({ username: uError, password: pError });

  setLoad(false);
};

export default function LoginPage() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ref = React.useRef(null);

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
              defaultValue={password}
            />
            <View style={styles.horizontalBar}></View>
          </View>

          <View style={styles.touchables}>
            <TouchableOpacity style={styles.loginBtn} onPress={Login}>
              <Image
                source={require("../assets/images/LoginButton.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={styles.loginText}
                onPress={() => ref.current && ref.current.navigate("Register")}
              >
                Create Account
              </Text>
              <View style={styles.verticalBar}></View>
              <TouchableOpacity>
                <Text
                  style={styles.loginText}
                  onPress={() =>
                    ref.current && ref.current.navigate("Register")
                  }
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
