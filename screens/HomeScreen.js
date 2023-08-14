import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
	Image,
	Text,
	View,
	StyleSheet,
	TextInput,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ChevronDownIcon,
	UserCircleIcon,
	AdjustmentsVerticalIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type=='featured']{
			...,
			restaurants[]->{
				...,
				dishes[]->,
				type->{
					name
				}
			}
		}`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);

	return (
		<SafeAreaView style={styles.cont}>
			<View style={styles.container}>
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					style={styles.image}
				/>

				<View style={styles.location}>
					<Text style={styles.deliverNow}>Deliver Now!</Text>
					<Text style={styles.currLoc}>
						Current Location
						<ChevronDownIcon
							style={styles.arrowDownIcon}
							size={20}
							color="#00ccbb"
						/>
					</Text>
				</View>

				<UserCircleIcon style={styles.userIcon} size={35} color="#00ccbb" />
			</View>

			<View style={styles.searchBar}>
				<View style={styles.iconInput}>
					<MagnifyingGlassIcon
						style={styles.searchIcon}
						color="gray"
						size={20}
					/>
					<TextInput
						placeholder="Restaurants and cuisines"
						keyboardType="default"
					/>
				</View>

				<AdjustmentsVerticalIcon color={"#00ccbb"} />
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.categoryCont}
			>
				<Categories />

				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						id={category._id}
						title={category.name}
						description={category.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	arrowDownIcon: {
		marginLeft: 10,
	},
	userIcon: {
		marginRight: 12,
	},
	deliverNow: {
		fontWeight: "bold",
		color: "gray",
		fontSize: 12,
	},
	currLoc: {
		fontWeight: "bold",
		fontSize: 20,
		alignItems: "center",
		flexDirection: "row",
	},
	cont: {
		backgroundColor: "white",
		paddingTop: 20,
	},
	container: {
		flexDirection: "row",
		paddingBottom: 12,
		alignItems: "center",
		marginLeft: 6,
		marginRight: 16,
		display: "flex",
		width: "100%",
		// flex: 1,
	},
	image: {
		height: 28,
		width: 28,
		backgroundColor: "#ccc",
		paddingBottom: 16,
		borderRadius: 50,
		marginLeft: 8,
	},
	location: {
		marginLeft: 12,
		// marginRight: 96,
		flex: 1,
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 8,
		marginLeft: 6,
		marginRight: 16,
	},
	iconInput: {
		flexDirection: "row",
		width: 300,
		marginRight: 12,
		marginLeft: 8,
		backgroundColor: "#f1f1f1",
		padding: 12,
		paddingTop: 8,
		paddingBottom: 8,
		borderRadius: 10,
	},
	searchIcon: {
		marginRight: 10,
		marginTop: 5,
	},
	categoryCont: {
		backgroundColor: "#f1f1f1",
		marginBottom: 110,
	},
});

export default HomeScreen;
