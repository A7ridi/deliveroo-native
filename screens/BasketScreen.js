import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	totalBasketValue,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
	const dispatch = useDispatch();
	const basketTotal = useSelector(totalBasketValue);

	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.secondHeader}>
					<View>
						<Text style={styles.basketTxt}>Basket</Text>
						<Text style={styles.title}>{restaurant.title}</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						style={styles.circleIcon}
					>
						<XCircleIcon width={50} height={50} color={"#00ccbb"} />
					</TouchableOpacity>
				</View>

				<View style={styles.deliver}>
					<Image
						source={{ uri: "https://links.papareact.com/wru" }}
						style={styles.image}
					/>
					<Text style={styles.deliverTxt}>Deliver in 50-75 mins</Text>
					<TouchableOpacity>
						<Text style={styles.changeTxt}>Change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.foodList}>
					{Object.entries(groupedItemsInBasket).map(([key, items]) => (
						<View key={key} style={styles.viewCont}>
							<Text style={styles.items}>{items?.length} x</Text>
							<Image
								source={{ uri: urlFor(items[0]?.image).url() }}
								style={styles.foodImage}
							/>
							<Text style={styles.foodName}>{items[0]?.name}</Text>

							<Text style={styles.price}>${items[0]?.price}</Text>

							<TouchableOpacity
								onPress={() => dispatch(removeFromBasket({ id: key }))}
							>
								<Text style={styles.removeBtn}>Remove</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>

				<View style={styles.orderCont}>
					<View style={styles.orderValue}>
						<Text style={styles.subtotal}>Subtotal</Text>
						<Text style={styles.subtotal}>${basketTotal}</Text>
					</View>

					<View style={styles.orderValue}>
						<Text style={styles.subtotal}>Delivery fee</Text>
						<Text style={styles.subtotal}>${5.99}</Text>
					</View>

					<View style={styles.orderValue}>
						<Text>Order Total</Text>
						<Text style={styles.orderTotal}>
							${(basketTotal + 5.99).toFixed(2)}
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate("PreparingOrderScreen")}
						style={styles.placeOrderBtn}
					>
						<Text style={styles.placeTxt}>Place Order</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;

const styles = StyleSheet.create({
	placeTxt: {
		textAlign: "center",
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	placeOrderBtn: {
		borderRadius: 12,
		backgroundColor: "#00ccbb",
		padding: 16,
		marginTop: 12,
	},
	orderTotal: { fontWeight: "bold" },
	subtotal: { color: "#9CA3AF" },
	orderValue: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 6,
		marginBottom: 6,
	},
	orderCont: { padding: 20, backgroundColor: "white" },
	removeBtn: { color: "#00ccbb", fontSize: 12 },
	price: { marginRight: 8, color: "#4B5563" },
	items: { color: "#00ccbb", marginRight: 8 },
	viewCont: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 20,
		paddingRight: 20,
	},
	foodImage: {
		height: 48,
		width: 48,
		borderRadius: 50,
		marginRight: 8,
	},
	foodName: {
		flex: 1,
	},
	changeTxt: {
		color: "#00ccbb",
	},
	deliverTxt: {
		flex: 1,
	},
	image: {
		backgroundColor: "#ccc",
		height: 28,
		width: 28,
		padding: 16,
		borderRadius: 50,

		marginRight: 12,
	},
	deliver: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: "#fff",
		marginTop: 20,
		marginBottom: 20,
	},
	secondHeader: {
		padding: 20,
		borderRadius: 20,
		borderBottomColor: "#00ccbb",
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	header: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	container: {
		flex: 1,
		backgroundColor: "rgb(210 0 255)",
	},
	basketTxt: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	title: {
		textAlign: "center",
		color: "#9CA3AF",
	},
	circleIcon: {
		borderRadius: 50,
		// backgroundColor: "#ccc",
		position: "absolute",
		top: 12,
		right: 15,
	},
});
