/*
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
import { SafeAreaView } from "react-native";

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

/*
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

*/
/*
const RegisterPage = ({ navigation }) => {
  return <SafeAreaView></SafeAreaView>;
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    marginTop: "50%",
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

*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import COLORS from "../components/const/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

const RegisterPage = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("LoginPage");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const doRegister = async (event) => {
    event.preventDefault();

    // const loginName = loginNameRef.current.value;
    // const loginPassword = loginPasswordRef.current.value;
    // const firstName = firstNameRef.current.value;
    // const lastName = lastNameRef.current.value;
    // const email = emailRef.current.value;

    let obj = {
      FirstName: inputs.firstname,
      LastName: inputs.lastName,
      Login: inputs.email,
      Pass: inputs.password,
      Email: inputs.email,
    };
    let js = JSON.stringify(obj);

    try {
      
      const response = await fetch('https://cinema-guesser.herokuapp.com/api/register', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      let res = JSON.parse(await response.text());

      if (res.error !== '') {
        Alert.alert("Error", "Something went wrong");
        
      } else {
        
        
        navigation.navigate("LoginPage");
      }
    } catch (e) {
      ;
      Alert.alert(alert(e.toString()));
      return;
    }
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      {/* <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 1 }}
      > */}
        <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <View style={{ marginTop: "15%", paddingHorizontal: 10, flex: 1, }}>
          <Input
              onChangeText={(text) => handleOnchange(text, "firstname")}
              onFocus={() => handleError(null, "firstname")}
              iconName="account-outline"
              label="FirstName"
              placeholder="Enter Firstame"
              error={errors.fullname}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "lastname")}
              onFocus={() => handleError(null, "lastname")}
              iconName="account-outline"
              label="LastName"
              placeholder="Enter Lastname"
              error={errors.fullname}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              placeholder="Enter email address"
              error={errors.email}
            />

            
            <Input
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter password"
              error={errors.password}
              password
            />

            <View style={styles.touchables}>
              {<Button title="Register" onPress={doRegister} />}
              <Text
                onPress={() => navigation.navigate("LoginPage")}
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Already have account? Login
              </Text>
            </View>
          </View>
          </ImageBackground> 
        </View>
        {/* </ImageBackground>  */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default RegisterPage;

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
    flex: 1,
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
