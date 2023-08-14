import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ imrUrl, title }) => {
	return (
		<TouchableOpacity style={styles.cardContainer}>
			<Image
				source={{
					uri: imrUrl,
				}}
				style={styles.image}
			/>
			<Text style={styles.imageText}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;

const styles = StyleSheet.create({
	cardContainer: {
		marginRight: 4,
		position: "relative",
	},
	image: {
		height: 80,
		width: 80,
		paddingBottom: 16,
		borderRadius: 50,
		marginLeft: 8,
		borderRadius: 10,
	},
	imageText: {
		position: "absolute",
		left: 12,
		bottom: 4,
		fontWeight: "bold",
		color: "white",
		backgroundColor: "rgba(136, 136, 136, 0.5)",
		paddingLeft: 4,
		paddingRight: 4,
		borderRadius: 4,
	},
});
