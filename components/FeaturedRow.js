import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import sanityClient from "../sanity";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type=='featured' && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          }
        }[0]`,
				{ id }
			)
			.then((data) => setRestaurants(data?.restaurants));
	}, [id]);
	return (
		<View>
			<View style={styles.featuredCard}>
				<Text style={styles.featuredTxt}>{title}</Text>
				<ArrowRightIcon color={"#00ccbb"} />
			</View>

			<Text style={styles.description}>{description}</Text>

			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
				showsHorizontalScrollIndicator={false}
				style={styles.restCard}
			>
				{restaurants?.map((restaurant) => (
					<RestaurantCard
						key={restaurant._id}
						id={restaurant._id}
						imgUrl={restaurant.image}
						title={restaurant.name}
						rating={restaurant.rating}
						genre={restaurant.type?.name}
						address={restaurant.address}
						short_description={restaurant.short_description}
						dishes={restaurant.dishes}
						long={restaurant.long}
						lat={restaurant.lat}
					/>
				))}
			</ScrollView>
			{/* <Text>{featuredCategory}</Text> */}
		</View>
	);
};

export default FeaturedRow;

const styles = StyleSheet.create({
	featuredCard: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 16,
		paddingRight: 16,
	},
	featuredTxt: {
		fontWeight: "bold",
		fontSize: 18,
	},
	description: {
		fontSize: 12,
		color: "#6B7280",
		paddingLeft: 16,
		paddingRight: 16,
	},
	restCard: {
		paddingTop: 16,
	},
});
