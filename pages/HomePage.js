import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

// <Button title="Logout" onPress={logout} />
const HomePage = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginPage");
  };

  // function GamePage() {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#0A0A0A",
  //       }}
  //     >
  //       <Text>Click now to play</Text>
  //     </View>
  //   );
  // }

  const GamePage = () => {
    return (
      <View style={[styles.flexContainer, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column"
      }]}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 2, backgroundColor: "darkorange" }} />
        <View style={{ flex: 3, backgroundColor: "green" }} />
        <View style={{ flex: 4, backgroundColor: "blue" }} />
      </View>
    );
  };
  

  //     <FlipCard
  //       style={styles.card}
  //       friction={6}
  //       perspective={1000}
  //       flipHorizontal={true}
  //       flipVertical={false}
  //       flip={false}
  //       clickable={true}
  //       onFlipEnd={(isFlipEnd) => {
  //         console.log("isFlipEnd", isFlipEnd);
  //       }}
  //     >
  //       {/* Face Side */}
  //       <View style={styles.face}>
  //         <Text>The Face</Text>
  //       </View>
  //       {/* Back Side */}
  //       <View style={styles.back}>
  //         <Text>The Back</Text>
  //       </View>
  //     </FlipCard>
  //   );
  // }

  function SettingsPage() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <Text>Settings!</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  // function WatchListPage() {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#0A0A0A",
  //       }}
  //     >
  //       <Text>Watch List!</Text>
  //       <Text>
  //         Implement a plus symbol on the home page that will allow the user to
  //         add the movie to their watch list. The watch list will be a list of
  //         movies that the user can reference.
  //       </Text>
  //     </View>
  //   );
  // }

  function RulesPage() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <Text>Rules Page!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Play") {
            iconName = focused ? "play" : "play-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          // } else if (route.name === "Watch List") {
          //   iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Rules") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e8b923",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#0A0A0A" },
      })}
    >
      <Tab.Screen name="Play" component={GamePage} />
      {/* <Tab.Screen name="Watch List" component={WatchListPage} /> */}
      <Tab.Screen name="Rules" component={RulesPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    width: 320,
    height: 470,
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  flexContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    lineHeight: 470,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

export default HomePage;
