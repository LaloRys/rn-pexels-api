import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from 'react-native-toast-message';

import ImageList from "../components/ImageList";
import { getImages } from "../api/pexels";


// Con navigate la informacion llega por route.params
const ImageScreen = ({ route }) => {
  //se destructura
  const { image } = route.params;
  const [photos, setPhotos] = useState([]);

  const loadImages = async () => {
    const res = await getImages();
    setPhotos(res.data.photos);
    console.log(res.data.total_results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlePress = async () =>
    await WebBrowser.openBrowserAsync(image.photographer_url);

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";
      const { uri } = await FileSystem.downloadAsync(image.src.original, fileUri);
      saveFile(uri);
    } catch (error) {
      console.error(error)
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      // Se permitio acceso
      const asset = await MediaLibrary.createAssetAsync(fileUri); //crea el archivo
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Toast.show({
        type: 'success',
        text1: 'Imagen descargada correctamente',
        text2: '✅'
      });
    }
  };

  const handleDownload = async () => {
    downloadFile()
  };

  //view similar a Div
  return (
    <View style={styles.headerPhotographer}>
      <Image source={{ uri: image.src.large }} style={styles.image} />
      <View
        style={{
          display: "flex",
          paddingVertical: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={styles.viewAvatarText}>
          <Avatar
            title={image.photographer
              .split(" ")
              .map((str) => str[0])
              .join("")
              .toUpperCase()}
            containerStyle={styles.avatar}
            size="medium"
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>
              {image.photographer.charAt(0).toUpperCase() +
                image.photographer.slice(1).toLowerCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={styles.button}
          onPress={handleDownload}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#202020",
    flex: 1, //ocupa todo el espacio disponible
    flexDirection: "column", //alineacion vertical
    padding: 10,
  },
  image: {
    borderRadius: 8,
    margin: 10,
    width: "auto",
    height: 350,
    backgroundColor: "#202020",
  },
  viewAvatarText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#8A01D8",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    marginStart: 5,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#00DFC4",
  },
});
