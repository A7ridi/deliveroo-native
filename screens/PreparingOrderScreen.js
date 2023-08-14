import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery");
		}, 3000);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Animatable.Image
				source={require("../assets/order.png")}
				animation="slideInUp"
				iterationCount={1}
				style={styles.animation}
			/>

			<Animatable.Text
				animation={"slideInUp"}
				iterationCount={1}
				style={styles.text}
			>
				Waiting for Restaurant to accept your order!
			</Animatable.Text>

			<Progress.Circle
				style={styles.progressBar}
				progress={0.6}
				width={200}
				color={"yellow"}
				indeterminate={true}
			/>
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({
	progressBar: {
		marginTop: 30,
		color: "rgba(0, 122, 255, 1)",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		paddingLeft: 30,
		paddingRight: 30,
		marginTop: -30,
	},
	animation: { height: 96 * 4, width: 96 * 4, marginRight: 35 },
	container: {
		backgroundColor: "#00ccbb",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
