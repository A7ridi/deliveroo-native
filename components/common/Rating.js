import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon } from "react-native-heroicons/solid";

const Rating = ({ rating, genre, address }) => {
	return (
		<>
			{rating ? (
				<View style={styles.icon}>
					<StarIcon color={"green"} size={22} opacity={0.5} />
					<Text style={styles.ratingGenre}>
						<Text style={styles.rating}>{rating}</Text> &#8226; {genre}
					</Text>
				</View>
			) : (
				<View style={styles.marker}>
					<MapPinIcon color="gray" opacity={0.4} size={22} />
					<Text style={styles.location}>Nearby &#8226; {address}</Text>
				</View>
			)}
		</>
	);
};

export default Rating;

const styles = StyleSheet.create({
	icon: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingGenre: {
		marginLeft: 4,
		color: "#6B7280",
	},
	rating: {
		color: "#22C55E",
	},
	marker: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 4,
	},
	location: {
		fontSize: 12,
		color: "#6B7280", // text-gray-500
		marginLeft: 4,
		wordWrap: "break-word",
		width: 210,
	},
});
