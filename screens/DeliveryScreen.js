import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.touchableArea}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<XMarkIcon color={"white"} size={30} />
					</TouchableOpacity>
					<Text style={styles.orderHelp}>Order Help</Text>
				</View>

				<View style={styles.card}>
					<View style={styles.estCard}>
						<View>
							<Text style={styles.estTxt}>Estimated Arrival</Text>
							<Text style={styles.time}>35-45 Minutes</Text>
						</View>

						<Image
							source={{ uri: "https://links.papareact.com/fls" }}
							style={styles.image}
						/>
					</View>

					<Progress.Bar size={30} color="#00ccbb" indeterminate={true} />

					<Text style={styles.restaurant}>
						Your order at {restaurant.title} is being prepared
					</Text>
				</View>
			</SafeAreaView>

			<MapView
				initialRegion={{
					latitude: restaurant.lat,
					longitude: restaurant.long,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				mapType="mutedStandard"
				style={styles.map}
			>
				<Marker
					coordinate={{
						latitude: restaurant.lat,
						longitude: restaurant.long,
					}}
					title={restaurant.title}
					description={restaurant.short_description}
					identifier={"origin"}
					pinColor="00ccbb"
				/>
			</MapView>

			<SafeAreaView>
				<View style={styles.riderCont}>
					<Image
						source={{ uri: "https://links.papareact.com/wru" }}
						style={styles.riderImg}
					/>
					<View style={styles.riderCard}>
						<Text style={styles.name}>{"Afridi Ahmed"}</Text>
						<Text style={styles.rider}>Your Rider</Text>
					</View>

					<Text style={styles.call}>Call</Text>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default DeliveryScreen;

const styles = StyleSheet.create({
	riderCard: { flex: 1 },
	call: { color: "#00ccbb", fontSize: 18, marginRight: 20, fontWeight: "bold" },
	rider: { color: "#ccc" },
	name: { fontSize: 18 },
	riderImg: {
		height: 12 * 4,
		width: 12 * 4,
		backgroundColor: "#ccc",
		padding: 16,
		borderRadius: 50,
		marginLeft: 20,
		marginRight: 12,
	},
	riderCont: {
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		height: 80,
		marginTop: -35,
	},
	map: { flex: 1, marginTop: -40, zIndex: 0 },
	restaurant: { marginTop: 12, color: "#6B7280" },
	image: { height: 80, width: 80 },
	estCard: { flexDirection: "row", justifyContent: "space-between" },
	container: { backgroundColor: "#00ccbb", flex: 1 },
	safeArea: { zIndex: 50 },
	touchableArea: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	orderHelp: { color: "white", fontSize: 18 },
	card: {
		backgroundColor: "white",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 8,
		padding: 24,
		zIndex: 50,
	},
	estTxt: { fontSize: 18, color: "gray" },
	time: { fontSize: 30, fontWeight: "bold" },
});
