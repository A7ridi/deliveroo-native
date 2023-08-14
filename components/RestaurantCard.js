import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import RatingAndLocation from "./common/Rating";

const RestaurantCard = ({
	id,
	imgUrl,
	title,
	rating,
	genre,
	address,
	short_description,
	dishes,
	long,
	lat,
}) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("Restaurant", {
					id,
					imgUrl,
					title,
					rating,
					genre,
					address,
					short_description,
					dishes,
					long,
					lat,
				});
			}}
			style={styles.card}
		>
			<Image source={{ uri: urlFor(imgUrl).url() }} style={styles.image} />
			<View style={styles.textArea}>
				<Text style={styles.imageTitle}>{title}</Text>

				<RatingAndLocation rating={rating} genre={genre} />

				<RatingAndLocation address={address} />
			</View>
		</TouchableOpacity>
	);
};

export default RestaurantCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		marginRight: 12,
		filter: "drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))",
		borderRadius: 10,
	},
	image: {
		height: 144,
		width: 256,
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	textArea: {
		paddingLeft: 12,
		paddingBottom: 16,
	},
	imageTitle: {
		fontWeight: "bold",
		fontSize: 18,
		paddingTop: 8,
	},
});
