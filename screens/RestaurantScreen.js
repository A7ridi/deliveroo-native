import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import RatingAndLocation from "../components/common/Rating";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
	const {
		params: {
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
		},
	} = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	useEffect(() => {
		dispatch(
			setRestaurant({
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
			})
		);
	}, [dispatch]);

	return (
		<ScrollView>
			<View style={styles.imageContainer}>
				<Image source={{ uri: urlFor(imgUrl).url() }} style={styles.image} />
				<TouchableOpacity onPress={navigation.goBack} style={styles.backBtn}>
					<ArrowLeftIcon size={20} color="#00ccbb" />
				</TouchableOpacity>
			</View>

			<View style={styles.addressContainer}>
				<View style={styles.addressHeader}>
					<Text style={styles.text}>{title}</Text>
					<View style={styles.ratingAndLoc}>
						<View style={styles.rating}>
							<RatingAndLocation rating={rating} genre={genre} />
						</View>

						<RatingAndLocation address={address} />
					</View>

					<Text style={styles.shortDesc}>{short_description}</Text>
				</View>

				<TouchableOpacity style={styles.allergyBox}>
					<QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
					<Text style={styles.allergyTxt}>Have a food allergy?</Text>
					<ChevronRightIcon color={"#00ccbb"} />
				</TouchableOpacity>
			</View>

			<View>
				<Text style={styles.menuTxt}>Menu</Text>

				<ScrollView style={styles.menuListCont} stickyHeaderIndices={[0]}>
					<BasketIcon />

					<View>
						{dishes?.map((dish) => (
							<DishRow
								key={dish?._id}
								id={dish?._id}
								name={dish?.name}
								description={dish?.short_description}
								price={dish?.price}
								image={dish?.image}
							/>
						))}
					</View>
				</ScrollView>
			</View>
		</ScrollView>
	);
};

export default RestaurantScreen;

const styles = StyleSheet.create({
	menuListCont: {
		position: "relative",
		marginBottom: 40,
	},
	menuTxt: {
		fontSize: 20,
		fontWeight: "bold",
		padding: 12,
	},
	allergyTxt: {
		flex: 1,
		paddingLeft: 8,
		fontSize: 16,
		fontWeight: "bold",
	},
	allergyBox: {
		flexDirection: "row",
		alignItems: "center",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#D1D5DB",
		padding: 10,
	},
	shortDesc: {
		color: "#6B7280",
		marginTop: 8,
	},
	rating: { marginRight: 6 },
	ratingAndLoc: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 26,
		fontWeight: "bold",
	},
	addressHeader: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 10,
		paddingBottom: 16,
	},
	addressContainer: {
		backgroundColor: "#fff",
	},
	imageContainer: {
		position: "relative",
	},
	backBtn: {
		position: "absolute",
		top: 50,
		left: 20,
		padding: 8,
		backgroundColor: "#F3F4F6",
		borderRadius: 50,
	},
	image: {
		width: "100%",
		height: 224,
		backgroundColor: "#6B7280",
	},
});
