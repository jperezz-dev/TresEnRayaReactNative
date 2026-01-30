import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

// Imports de SVG
import CirculoPeque from "../assets/images/circuloPeque.svg";
import CruzPeque from "../assets/images/cruzPeque.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function Partida() {

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false); // Parámetro modal visible
  const [mensajeResultado, setMensajeResultado] = useState(""); // Parámetro mensaje de final de partida
  const { nombre, dificultad } = useLocalSearchParams(); // Parámetro dificultad recibido del screen anterior

  // Tiempo de juego
  const [segundos, setSegundos] = useState(0);

  // Tiempo formateado
  const tiempoFormateado = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundosRestantes = totalSegundos % 60;

    const minutosFormateados = minutos.toString().padStart(2, '0'); // Fuerza dos digitos aun que sea uno (Ej 5 -> 05)
    const segundosFormateados = segundosRestantes.toString().padStart(2, '0'); // Fuerza dos digitos aun que sea uno (Ej 5 -> 05)

    return `${minutosFormateados}:${segundosFormateados}`;
  };

  // Inicio de contador de tiempo
  useEffect(() => {
    const idIntervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(idIntervalo);
  }, []);

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
      if (!comprobarGanador(nuevoTablero)) { // Comprobación de victoria por cada turno
        setTurnoJugador(false); // Cambio de turno
        setTimeout(() => {
          turnoIA(nuevoTablero); // Llamada al turno de la IA
        }, 1000);
      }
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
    const nuevoTableroIA = nuevoTablero.map((filaArray: any) => [...filaArray]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (nuevoTableroIA[i][j] === " ") { // Comprobación de celda vacía sobre el tablero nuevo
          nuevoTableroIA[i][j] = "X";
          setTablero(nuevoTableroIA);
          if (!comprobarGanador(nuevoTableroIA)) { // Comprobación de victoria por cada turno
            setTurnoJugador(true); // Cambio de turno
          }
          return;
        }
      }
    }
  }

  // Función de reinicio de juego
  function reiniciarJuego() {
    const tableroReinicio = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]

    setTablero(tableroReinicio);  // Reinicio del tablero copiando la matriz
    setSegundos(0); // Reinicio del tiempo
  }

  // Función de comprobación de ganador
  function comprobarGanador(nuevoTablero: any) {
    const nuevoTableroGanador = nuevoTablero.map((filaArray: any) => [...filaArray]);
    if (
      // Jugador gana linea en fila superior
      nuevoTablero[0][0] === "O" && nuevoTablero[0][1] === "O" && nuevoTablero[0][2] === "O" ||
      // Jugador gana linea del medio
      nuevoTablero[1][0] === "O" && nuevoTablero[1][1] === "O" && nuevoTablero[1][2] === "O" ||
      // Jugador gana linea inferior
      nuevoTablero[2][0] === "O" && nuevoTablero[2][1] === "O" && nuevoTablero[2][2] === "O" ||
      // Jugador gana linea izquierda
      nuevoTablero[0][0] === "O" && nuevoTablero[1][0] === "O" && nuevoTablero[2][0] === "O" ||
      // Jugador gana linea medio (Superior inferior)
      nuevoTablero[0][1] === "O" && nuevoTablero[1][1] === "O" && nuevoTablero[2][1] === "O" ||
      // Jugador gana linea derecha
      nuevoTablero[0][2] === "O" && nuevoTablero[1][2] === "O" && nuevoTablero[2][2] === "O" ||
      // Juagador gana diagonal 1
      nuevoTablero[0][0] === "O" && nuevoTablero[1][1] === "O" && nuevoTablero[2][2] === "O" ||
      // Jugador gana diagonal 2
      nuevoTablero[2][0] === "O" && nuevoTablero[1][1] === "O" && nuevoTablero[0][2] === "O"
    ) {
      setMensajeResultado("¡Has ganado!");
      setModalVisible(true);
      return true;
    }
    else if (
      // IA gana linea en fila superior
      nuevoTablero[0][0] === "X" && nuevoTablero[0][1] === "X" && nuevoTablero[0][2] === "X" ||
      // IA gana linea del medio
      nuevoTablero[1][0] === "X" && nuevoTablero[1][1] === "X" && nuevoTablero[1][2] === "X" ||
      // IA gana linea inferior
      nuevoTablero[2][0] === "X" && nuevoTablero[2][1] === "X" && nuevoTablero[2][2] === "X" ||
      // IA gana linea izquierda
      nuevoTablero[0][0] === "X" && nuevoTablero[1][0] === "X" && nuevoTablero[2][0] === "X" ||
      // IA gana linea medio (Superior inferior)
      nuevoTablero[0][1] === "X" && nuevoTablero[1][1] === "X" && nuevoTablero[2][1] === "X" ||
      // IA gana linea derecha
      nuevoTablero[0][2] === "X" && nuevoTablero[1][2] === "X" && nuevoTablero[2][2] === "X" ||
      // IA gana diagonal 1
      nuevoTablero[0][0] === "X" && nuevoTablero[1][1] === "X" && nuevoTablero[2][2] === "X" ||
      // IA gana diagonal 2
      nuevoTablero[2][0] === "X" && nuevoTablero[1][1] === "X" && nuevoTablero[0][2] === "X"
    ) {
      setMensajeResultado("¡Has perdido!");
      setModalVisible(true);
      return true;

    } else if (!nuevoTablero.flat().includes(" ")) { // Comprobación de que no haya espacios vacíos
      setMensajeResultado("¡Empate!");
      setModalVisible(true);
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LogoApp width={200} height={140} style={{ marginTop: 20 }} />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.fondoModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.texto}>{mensajeResultado}</Text>
            <Pressable
              style={[styles.boton, { marginBottom: 0 }]}
              onPress={() => [setModalVisible(!modalVisible), reiniciarJuego()]}>
              <Text style={styles.textoBoton}>Volver a jugar</Text>
            </Pressable>
            <Pressable
              style={[styles.boton, { marginBottom: 0, marginTop: 20 }]}
              onPress={() => [setModalVisible(!modalVisible), router.push("/")]}>
              <Text style={styles.textoBoton}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedor}>
          <Text style={styles.texto}>Tiempo: </Text>
          <Text style={{ fontSize: 30, color: "#414141" }}>{tiempoFormateado(segundos)}</Text>
        </View>
        <View style={styles.contenedor}>
          <Text style={styles.texto}>Turno: </Text>
          <View>
            {esTurnoJugador && <CirculoPeque width={30} height={30} />}
            {!esTurnoJugador && <CruzPeque width={30} height={30} />}
          </View>
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
    columnGap: 70,
    flexDirection: "row",
    marginTop: 20
  },
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    flexDirection: "row"
  },
  fondoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  contenidoModal: {
    backgroundColor: "#ffff",
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    padding: 30
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
    textAlign: "center",
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