import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Imports de SVG
import BotonAtras from "../assets/images/botonAtras.svg";
import LogoApp from "../assets/images/logoApp.svg";

export default function Puntuaciones() {

    const router = useRouter();
    const {dificultad} = useLocalSearchParams();

    return (
        <View
            style={styles.container}
        >
            <View style={styles.contenedorSuperior}>
                <BotonAtras width={20} height={20} onPress={() => router.push("/puntuaciones_dificultad")} />
                <LogoApp width={200} height={180} style={{ marginLeft: 30 }} />
            </View>
            <View style={styles.contenedorInfo}>
                <Text style={styles.texto}>Nombre </Text>
                <Text style={styles.texto}>Tiempo </Text>
            </View>
            <View style={{ height: 1, width: 300, borderColor: "#7E40F3", borderWidth: 1 }}></View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    contenedorSuperior: {
        marginTop: 52,
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
});