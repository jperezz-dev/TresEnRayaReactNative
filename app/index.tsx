import { Pressable, StyleSheet, Text, View } from "react-native";

// Import de logoApp.svg
import LogoApp from "../assets/images/logoApp.svg";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <LogoApp width={250} height={350} />
      <Text style={styles.texto}>¡El clásico juego del tres en raya ahora en tu dispositivo móvil!</Text>
      <View style={styles.contenedorBotones}>
        <Pressable style={styles.boton}>
          <Text>Jugar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  texto: {
    textAlign: "center",
    marginHorizontal: 50,
    fontSize: 20,
    color: "#414141"
  },
  contenedorBotones: {
    flex: 1,
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 2,
    width: 300,
    marginTop: 10,
    marginBottom: 10
  },
  boton: {
    borderRadius: 60,
    backgroundColor: "#000000",
    color: "white"
  }
});
