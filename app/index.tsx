import { useRouter } from "expo-router";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";

// Import de logoApp.svg
import LogoApp from "../assets/images/logoApp.svg";

export default function Index() {

  const router = useRouter();
  
  return (
    <View
      style={styles.container}
    >
      <LogoApp width={250} height={350} />
      <Text style={styles.texto}>¡El clásico juego del tres en raya ahora en tu dispositivo móvil!</Text>
      <View style={styles.contenedorBotones}>
        <Pressable style={styles.boton} onPress={() => router.push("/nueva_partida_nombre")}>
          <Text style={styles.textoBoton}>Jugar</Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={() => router.push("/puntuaciones_dificultad")}>
          <Text style={styles.textoBoton}>Puntuaciones</Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.textoBoton}>Salir</Text>
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
    width: 300,
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    rowGap: 20
  },
  boton: {
    borderRadius: 30,
    backgroundColor: "#000000",
    height: 55,
    width: 240,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "1px 9px 5.800000190734863px 0px rgba(0, 0, 0, 24%)"
  },
  textoBoton: {
    color: "#ffffff",
    fontSize: 25
  }
});