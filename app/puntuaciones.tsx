import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { obtenerPuntuaciones as obtenerPuntuacionesDB } from "./db";

// Imports de SVG
import BotonAtras from "../assets/images/botonAtras.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function Puntuaciones() {

    const router = useRouter();
    const { dificultad } = useLocalSearchParams();
    const [listaPuntuaciones, setListaPuntuaciones] = useState<any[]>([]); // Array de puntuaciones

    useEffect(() => {
        // Cambio a primitivo
        const dificultadObtener = String(dificultad);

        try {
            const datos = obtenerPuntuacionesDB(dificultadObtener);
            setListaPuntuaciones(datos);
        } catch (error) {
            console.error("Error al obtener puntuaciones:", error);
        }
    }, [dificultad]);

    return (
        <View
            style={styles.container}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contenedorSuperior}>
                <BotonAtras width={20} height={20} onPress={() => router.push("/puntuaciones_dificultad")} />
                <LogoApp width={200} height={180} style={{ marginLeft: 30 }} />
            </View>
            <View style={styles.contenedorInfo}>
                <Text style={styles.texto}>Nombre </Text>
                <Text style={styles.texto}>Tiempo </Text>
            </View>
            <View style={{ height: 1, width: 300, borderColor: "#7E40F3", borderWidth: 1 }}></View>
            <FlatList
                data={listaPuntuaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.filaPuntuacion}>
                        <Text style={styles.textoFila}>{item.nombre}</Text>
                        <Text style={styles.textoFila}>{item.tiempo}</Text>
                    </View>
                )}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    contenedorSuperior: {
        marginTop: 92,
        marginBottom: 80,
        flexDirection: "row",
        width: 300,
    },
    contenedorInfo: {
        alignItems: "center",
        columnGap: 50,
        flexDirection: "row",
        marginTop: 20
    },
    texto: {
        fontSize: 25,
        color: "#000"
    },
    filaPuntuacion: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        marginTop: 5
    },
    textoFila: {
        fontSize: 18,
        color: "#414141"
    }
});