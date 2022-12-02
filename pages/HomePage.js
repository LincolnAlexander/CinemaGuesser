import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, Text,  View, ScrollView } from "react-native";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import GameContainer from "../components/GameContainer";

import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
// import { background } from "native-base/lib/typescript/theme/styled-system";

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
  
  
  const GamePage = () => {
    const [poster, setPoster] = useState(null);
    const [title, setTitle] = useState(false);
    const [desc, setDesc] = useState(false);
    const [genre, setGenre] = useState(false);
    const [actors, setActors] = useState(false);
    const [year, setYear] = useState(false);
     const [rating, setRating] = useState(0);
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState(null);
    
    const loadMovieInfo = async (event) => {
      
      // var movie_memt = JSON.parse(get_store("carl"));
      // var movie_mem = JSON.parse(await get_store("movie_mem"));
  
      // console.log(movie_mem + "hi");
      // console.log(movie_memt);
      let obj = {
        filter: [],
      };
      let js = JSON.stringify(obj);
      try {
        
        // 'https://cinema-guesser.herokuapp.com/api/movies_saved'
        // bp.buildPath('api/movies_saved')
        const response = await fetch(
          "https://cinema-guesser.herokuapp.com/api/movies_saved",
          {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
          }
        );
        let res = JSON.parse(await response.text());
  
        if (res.length == 0 || (res.error && res.error !== "")) {
          // setMessage('Username is taken, please try a different one.');
          //either by default or after filter
          console.log(res.err);
        } else
        {
          setDesc(res.omdb.Plot);
          setActors(res.omdb.Actors);
          // setBoxOffice(res.omdb.BoxOffice);
          setGenre(res.omdb.Genre);
          setPoster((res.omdb.Poster));
          setRating(parseInt(res.omdb.Ratings));
          setTitle(capitalize(res.omdb.Title));
          setYear(res.omdb.Year);
          setDesc(res.omdb.Plot)
          setGuess('');
          //on reload don't run again
          // if (movie_mem.list[movie_mem.head] !== res.omdb.Title) {
          //   movie_mem.list[movie_mem.head] = res.omdb.Title;
          //   movie_mem.head += 1;
          //   //this number '25' must be smaller than number of movies in 'Movies' DB
          //   //movie_mem.head %= 25;
          //   //console.log("UPDATE: " + JSON.stringify(movie_mem));
          //   //update movie_mem
          //   AsyncStorage.setItem("movie_mem", JSON.stringify(movie_mem));
          // }
  
          console.log(res.omdb);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    useEffect(() => {
      loadMovieInfo();
    }, []);

    const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );
    
    return (
      <View style = {{flex:1,}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
      
        <View style=
        {{ 
          flex: 1,
          width: '100%', 
          height: '100%',
          backgroundColor: "#0A0A0A"
        }}>
        {/* <GameContainer /> */}
        <View style= 
          {{
            
            flex: 10,
            justifyContent: "center",
            alignItems: "center",
            
            
          }}>
            <Text style = {{textAlign: 'center', color: '#f1cf54', fontSize: 19, marginTop: 5}}>{title} &#40;{year}&#41;</Text>
            <View style = 
            {{
              flex: 1,
              width: '70%',
              
              
              
            }}>
              <Image style = {{flex: 1, width: "100%", height: "100%", resizeMode: 'contain',}} source={{uri: poster}}></Image>
              
            </View>
           
        </View>
          <View style= 
            {{
              flex: 1, 
              borderColor: 'red',
              
            }}>
            <View style= 
            {{
              flex: 1, 
              borderColor: 'green',
              
            }}>
            <Text style = {{color: '#f1cf54', fontSize: 16, marginTop: 5}}>Description:<Text style={{color:'white',}}>{desc}</Text> </Text>
            
            <Text style = {{color: '#f1cf54', fontSize: 16, marginTop: 5}}>Genre:<Text style={{color:'white',}}>{genre}</Text> </Text>
            <Text style = {{color: '#f1cf54', fontSize: 16, marginTop: 5}}>Actors:<Text style={{color:'white',}}>{actors}</Text> </Text>
          </View>
          
          
          <View style= 
            {{
              flex: 1, 
              borderColor: 'blue',
              
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              
            {/* instead of loadMovieInfo, change it to display the round modal  */}
            <TextInput onSubmitEditing={ () => loadMovieInfo() } style = {{textAlign: 'center', color: 'white', fontSize: 18, borderBottomColor: '#f1cf54', borderBottomWidth: 2.5, width: '70%'}} onChangeText = {setGuess} placeholder = 'Guess Rating' placeholderTextColor= 'white'></TextInput>

          </View>
          

          </View>
        </View>
        
        </ScrollView>
        </View>
        
    );
  };

  function ProfilePage() {
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
        <Text style={styles.baseText}>
          Use your movie knowledge to guess the movie rating out of 100. Your
          will be given the movie poster, plot, actors, cast, and box office
          earnings. The closer you are to the movie rating, the more points you
          score. Good Luck Agent!
        </Text>
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
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-circle-outline";
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
      <Tab.Screen name="Profile" component={ProfilePage} />
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
  baseText: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
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
