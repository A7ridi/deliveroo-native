import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, totalBasketValue } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
	const items = useSelector(selectBasketItems);
	const navigation = useNavigation();
	const basketTotal = useSelector(totalBasketValue);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				disabled={!items?.length}
				onPress={() => navigation.navigate("Basket")}
				style={[styles.basket, !items.length && styles.disableBasket]}
			>
				<Text style={[styles.items, !items.length && styles.disableBasket]}>
					{items.length}
				</Text>
				<Text style={styles.text}>View Basket</Text>
				<Text style={styles.basketTotal}>$ {basketTotal}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BasketIcon;

const styles = StyleSheet.create({
	disableBasket: { backgroundColor: "#ccc" },
	basketTotal: {
		fontWeight: "bold",
		color: "white",
		fontSize: 24,
	},
	text: {
		flex: 1,
		color: "white",
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
	},
	items: {
		color: "white",
		fontWeight: "bold",
		fontSize: 24,
		backgroundColor: "#01a296",
		paddingTop: 0,
		borderRadius: 8,
		paddingLeft: 8,
		paddingRight: 8,
	},
	basket: {
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: "#00ccbb",
		padding: 16,
		borderRadius: 12,
		flexDirection: "row",
	},
	container: {
		// position: "absolute",
		width: "100%",
		zIndex: 50,
		// top: 300,
		marginBottom: 20,
	},
});
