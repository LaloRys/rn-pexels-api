import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, StyleSheet } from "react-native";
import pexelsLogo from "./assets/pexels.png";

import HomeScreen from "./screens/HomeScreen";
import ImageScreen from "./screens/ImageScreen";
import { useState } from "react";

import Toast from 'react-native-toast-message'

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [openSearch, setOpenSearch] = useState(false)
  
  return (
    <NavigationContainer>
      {/* Navegacion de las pantallas */}
      <Stack.Navigator>

        <Stack.Screen
          name="HomeScreen"
          // component={HomeScreen}  || Se pasa como hijo por props
          options={{
            //Diseño de la pantalla principal
            headerLeft: () => <Image source={pexelsLogo} style={styles.logo} />,
            title: "Pexels App",
            // headerTitleAlign: 'left',
            // headerTintColor: '#fff',
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: "#202020",
            },
            headerRight: () => {
              return (
                <Text
                  style={{ color: "#fff", fontSize: 20 }}
                  onPress={() => setOpenSearch(!openSearch)} //Valor contrario de openSearch
                >
                  {openSearch ? "Close" : "Search"}
                </Text>
              );
            },
          }}
        > 
        {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </Stack.Screen>

        <Stack.Screen name="ImageScreen" component={ImageScreen} />

      </Stack.Navigator>

      <StatusBar style="auto" />

      <Toast />
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd: 5,
    borderRadius: 50,
  },
});
