import { View, Text, StyleSheet, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "react-native-elements";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

const HomeScreen = ({ openSearch }) => {
  const [photos, setPhotos] = useState([]);
  const [result, setResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(openSearch);

  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    // console.log(res.headers)
    setPhotos(res.data.photos);
    setResult(res.data.total_results);
    console.log(res.data.total_results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => {
    await loadImages(searchTerm);
    Keyboard.dismiss(); //Ocultar teclado
  };

  // leftIcon icono del input
  return (
    <>
      {openSearch && (
        <View style={styles.searchSection}>
          <Input
            leftIcon={{ type: "material", name: "search", color: "#fff" }}
            leftIconContainerStyle={styles.searchLeftIcon}
            placeholder="Busca un termino"
            //hay diferentes aplicadores de estilo style | containerStyle | inputContainerStyle
            inputContainerStyle={styles.searchInput}
            onChangeText={(value) => setSearchTerm(value)}
            style={styles.input}
          />
          <Button
            title="Buscar"
            buttonStyle={styles.buttonSearch}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.totalResultsText}>Resultados: {result}</Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //ocupa todo el espacio disponible
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResultsText: {
    color: "white",
    textAlign: "right",
    width: "100%",
    paddingTop: 25,
    paddingRight: 10,
  },
  searchSection: {
    backgroundColor: "#202020",
    width: "100%",
    paddingHorizontal: 15,
    paddingRight: 90,
    flex: 1 / 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#2c292c",
    borderBottomWidth: 0,
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  input: {
    color: "#fff",
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7,
  },
  buttonSearch: {
    backgroundColor: "#229783",
    marginBottom: 25,
    borderRadius: 10,
  },
});

export default HomeScreen;
