import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


//View no cuenta con evento onPress || pero TouchableOpacity si
const CardImage = ({ image }) => {

  //Navigate tambien permite enviar datos Como image ('ImageScreen', {image})}
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity style={styles.cardImage} onPress={() => navigation.navigate('ImageScreen', {image})}>
      <Image
        source={{
          uri: !image.src
            ? "https://img.icons8.com/?size=512&id=1G2BW7-tQJJJ&format=png"
            : image.src.tiny,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "48%", // Para lograr centrarlas + margin: 2 || o w :48% y m-4
    margin: 4,
    justifyContent: "space-between",
    backgroundColor: "#202020",
    borderWidth: 0,
    // borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: "100%", // Asegura que la imagen ocupe todo el ancho del TouchableOpacity
    height: 180,
    borderRadius: 5,
  },
});


export default CardImage;
