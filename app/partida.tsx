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

  // Manejador click celda
  function manejadorCeldas(fila: number, columna: number) {
    if (esTurnoJugador && comprobarCeldaVacia(fila, columna)) {
      const nuevoTablero = tablero.map((filaArray) => [...filaArray]); // Copia profunda del tablero
      nuevoTablero[fila][columna] = "O"; // Modificación de celda en la copia
      setTablero(nuevoTablero); // Actualización del tablero con los datos de la copia
      setTurnoJugador(false); // Cambio de turno
      turnoIA(nuevoTablero); // Llamada al turno de la IA
    }
  }

  // Comprobación de si la celda está vacía
  function comprobarCeldaVacia(fila: number, columna: number) {
    if ((tablero[fila][columna]) == " ") {
      return true;
    }
    else {
      return false;
    }
  }

  // Turno de la IA
  function turnoIA(nuevoTablero: any) {
    const nuevoTableroIA = nuevoTablero.map((filaArray) => [...filaArray]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (nuevoTableroIA[i][j] === " ") { // Comprobación de celda vacía sobre el tablero nuevo
          nuevoTableroIA[i][j] = "X";
          setTablero(nuevoTableroIA);
          setTurnoJugador(true);
          return;
        }
      }
    }
  }

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
        <Pressable onPress={() => manejadorCeldas(0, 0)} style={[styles.celda, { borderBottomWidth: 3 }]}>
          {tablero[0][0] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[0][0] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(0, 1)} style={[styles.celda, { borderBottomWidth: 3, borderLeftWidth: 3, borderRightWidth: 3 }]}>
          {tablero[0][1] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[0][1] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(0, 2)} style={[styles.celda, { borderBottomWidth: 3 }]}>
          {tablero[0][2] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[0][2] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(1, 0)} style={[styles.celda, { borderBottomWidth: 3 }]}>
          {tablero[1][0] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[1][0] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(1, 1)} style={[styles.celda, { borderBottomWidth: 3, borderLeftWidth: 3, borderRightWidth: 3 }]}>
          {tablero[1][1] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[1][1] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(1, 2)} style={[styles.celda, { borderBottomWidth: 3 }]}>
          {tablero[1][2] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[1][2] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(2, 0)} style={styles.celda}>
          {tablero[2][0] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[2][0] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(2, 1)} style={[styles.celda, { borderLeftWidth: 3, borderRightWidth: 3 }]}>
          {tablero[2][1] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[2][1] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
        <Pressable onPress={() => manejadorCeldas(2, 2)} style={styles.celda}>
          {tablero[2][2] === "O" && <CirculoPeque width={50} height={50} />}
          {tablero[2][2] === "X" && <CruzPeque width={50} height={50} />}
        </Pressable>
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