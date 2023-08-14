import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	removeFromBasket,
	selectBasketItems,
	selectBasketItemsWithId,
} from "../features/basketSlice";
import BasketIcon from "./BasketIcon";

const DishRow = ({ id, name, description, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);
	const dispatch = useDispatch();
	const items = useSelector((state) => selectBasketItemsWithId(state, id));

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemFromBasket = () => {
		if (items?.length <= 0) return;
		dispatch(removeFromBasket({ id }));
	};
	return (
		<>
			{/* <BasketIcon /> */}

			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				style={[styles.container, !isPressed && styles.borderBox]}
			>
				<View style={styles.dishCont}>
					<View style={styles.nameDesc}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.description}>{description}</Text>
						<Text style={styles.price}>$ {price}</Text>
					</View>

					<View>
						<Image source={{ uri: urlFor(image).url() }} style={styles.image} />
					</View>
				</View>
			</TouchableOpacity>

			{isPressed && (
				<View style={[styles.plusMinusCont, styles.borderBox]}>
					<View style={styles.plusMinus}>
						<TouchableOpacity
							onPress={removeItemFromBasket}
							style={{ marginRight: 8 }}
							disabled={!items.length}
						>
							<MinusCircleIcon
								color={items?.length > 0 ? "#00ccbb" : "gray"}
								size={30}
							/>
						</TouchableOpacity>

						<Text style={{ marginRight: 8 }}>{items?.length}</Text>

						<TouchableOpacity onPress={addItemToBasket}>
							<PlusCircleIcon color={"#00ccbb"} size={30} />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;

const styles = StyleSheet.create({
	dishContainer: {
		//  position: "relative"
	},
	plusMinusCont: {
		backgroundColor: "white",
		paddingLeft: 16,
		paddingRight: 16,
	},
	borderBox: {
		// borderBottomColor: "#ccc",
		// borderBottomWidth: 1,
		marginBottom: 4,
	},
	plusMinus: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 12,
	},
	container: {
		backgroundColor: "white",
		padding: 16,
		position: "relative",
	},
	dishCont: {
		flexDirection: "row",
	},
	nameDesc: {
		flex: 1,
		paddingRight: 8,
	},
	name: {
		fontSize: 20,
		marginBottom: 4,
	},
	description: {
		color: "#9ca3af",
	},
	price: {
		marginTop: 8,
		color: "#9CA3AF",
	},
	image: {
		height: 80,
		width: 80,
		padding: 16,
		backgroundColor: "#D1D5DB",
		borderWidth: 1,
		borderColor: "#f3f3f4",
		borderRadius: 12,
	},
});
