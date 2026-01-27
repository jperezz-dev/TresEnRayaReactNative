import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// Imports de SVG
import BotonAtras from "../assets/images/botonAtras.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function NuevaPartidaNombre() {

    const router = useRouter();
    const [nombre, setNombre] = useState('');

    return (
        <View
            style={styles.container}
        >
            <View style={styles.contenedorSuperior}>
                <BotonAtras width={20} height={20} onPress={() => router.push("/")} />
                <LogoApp width={200} height={180} style={{ marginLeft: 30 }} />
            </View>
            <Text style={styles.textoGrande}>Introduce tu nombre de jugador:</Text>
            <TextInput style={styles.introducirTexto} placeholder="Introduce tu nombre..." onChangeText={(texto) => setNombre(texto)}></TextInput>
            <Text style={styles.texto}>El nombre introducido es el que se mostrará en la tabla de resultados una vez finalice la partida.</Text>
            <Pressable style={styles.boton} onPress={() => router.push({
                pathname: "/nueva_partida_dificultad",
                params: { nombreJugador: nombre }
            })
            } >
                <Text style={styles.textoBoton}>Siguiente</Text>
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
    contenedorSuperior: {
        flexDirection: "row",
        width: 300,
    },
    textoGrande: {
        textAlign: "center",
        marginHorizontal: 20,
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
    boton: {
        borderRadius: 30,
        backgroundColor: "#000000",
        height: 55,
        width: 240,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "1px 9px 5.800000190734863px 0px rgba(0, 0, 0, 24%)",
        marginBottom: 80

    },
    textoBoton: {
        color: "#ffffff",
        fontSize: 25,
    }
});