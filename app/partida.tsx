import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Imports de SVG
import CirculoPeque from "../assets/images/circuloPeque.svg";
import CruzPeque from "../assets/images/cruzPeque.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function Partida() {

  const router = useRouter();
  const { nombre, dificultad } = useLocalSearchParams(); // Parámetro dificultad recibido del screen anterior

  // Tablero
  const [tablero, setTablero] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ])

  // Turnos
  const [esTurnoJugador, setTurnoJugador] = useState(true);


  return (
    <View
      style={styles.container}
    >
      <LogoApp width={200} height={140} style={{ marginTop: 20 }} />
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedor}>
          <Text style={styles.texto}>Tiempo: </Text>
        </View>
        <View style={styles.contenedor}>
          <Text style={styles.texto}>Turno: </Text>
        </View>
      </View>
      <View style={styles.tablero}>
        <View style={[styles.celda, {borderBottomWidth: 3}]} key={"celda00"}></View>
        <View style={[styles.celda, {borderBottomWidth: 3, borderLeftWidth: 3, borderRightWidth: 3}]} key={"celda01"}></View>
        <View style={[styles.celda, {borderBottomWidth: 3}]} key={"celda02"}></View>
        <View style={[styles.celda, {borderBottomWidth: 3}]} key={"celda10"}></View>
        <View style={[styles.celda, {borderBottomWidth: 3, borderLeftWidth: 3, borderRightWidth: 3}]} key={"celda11"}></View>
        <View style={[styles.celda, {borderBottomWidth: 3}]} key={"celda12"}></View>
        <View style={styles.celda} key={"celda20"}></View>
        <View style={[styles.celda, {borderLeftWidth: 3, borderRightWidth: 3}]} key={"celda21"}></View>
        <View style={styles.celda} key={"celda22"}></View>
      </View>
      <View style={styles.contenedor}>
        <View style={{ flexDirection: "row", marginRight: 40, columnGap: 15, alignItems: "center" }}>
          <Text style={styles.texto}>Jugador</Text>
          <CirculoPeque width={30} height={30}></CirculoPeque>
        </View>
        <View style={{ flexDirection: "row", columnGap: 15, alignItems: "center" }}>
          <Text style={styles.texto}>IA</Text>
          <CruzPeque width={30} height={30}></CruzPeque>
        </View>
      </View>
      <Pressable style={styles.boton} onPress={() => router.push("/")}>
        <Text style={styles.textoBoton}>Salir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  contenedorInfo: {
    alignItems: "center",
    columnGap: 100,
    flexDirection: "row",
    marginTop: 20
  },
  contenedor: {
    alignItems: "center",
    columnGap: 10,
    flexDirection: "row"
  },
  tablero: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 290,
    width: 300
  },
  celda: {
    justifyContent: "center",
    alignItems: "center",
    width: '33.33%',
    height: '33.33%'
  },
  textoCelda: {
    fontSize: 40,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 25,
    color: "#000"
  },
  boton: {
    borderRadius: 30,
    backgroundColor: "#000000",
    height: 55,
    width: 240,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "1px 9px 5.800000190734863px 0px rgba(0, 0, 0, 24%)",
    marginTop: 50,
    marginBottom: 50
  },
  textoBoton: {
    color: "#ffffff",
    fontSize: 25
  }
});