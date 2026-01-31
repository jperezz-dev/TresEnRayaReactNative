import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Imports de SVG
import BotonAtras from "../assets/images/botonAtras.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function PuntuacionesDificultad() {

    const router = useRouter();

    return (
        <View
            style={styles.container}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contenedorSuperior}>
                <BotonAtras width={20} height={20} onPress={() => router.push("/")} />
                <LogoApp width={200} height={180} style={{ marginLeft: 30 }} />
            </View>
            <Text style={styles.textoGrande}>¿Que puntuaciones quieres visualizar?</Text>
            <Text style={styles.texto}>Las puntuaciones se almacenan de forma independiente en función de la dificultad de la partida.</Text>
            <View style={styles.contenedorBotones}>
                <Pressable style={styles.boton} onPress={() => router.push({
                    pathname: "/puntuaciones",
                    params: { dificultad: "facil" }
                })}>
                    <Text style={styles.textoBoton}>Fácil</Text>
                </Pressable>
                <Pressable style={styles.boton} onPress={() => router.push({
                    pathname: "/puntuaciones",
                    params: { dificultad: "dificil" }
                })}>
                    <Text style={styles.textoBoton}>Difícil</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    contenedorSuperior: {
        marginTop: 20,
        flexDirection: "row",
        width: 300
    },
    textoGrande: {
        textAlign: "center",
        marginHorizontal: 15,
        fontSize: 25,
        color: "#000"
    },
    introducirTexto: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        width: 280
    },
    texto: {
        textAlign: "center",
        marginHorizontal: 30,
        fontSize: 15,
        color: "#414141"
    },
    contenedorBotones: {
        rowGap: 20,
        marginBottom: 30
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
    botonInferior: {
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
        fontSize: 25,
    }
});