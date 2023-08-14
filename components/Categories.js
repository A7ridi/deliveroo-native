import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		sanityClient
			.fetch(`*[_type=='category']`)
			.then((data) => setCategories(data));
	}, []);
	return (
		<ScrollView
			contentContainerStyle={{
				paddingHorizontal: 10,
				paddingTop: 10,
			}}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{categories?.map((category) => (
				<CategoryCard
					key={category._id}
					imrUrl={urlFor(category.image).width(200).url()}
					title={category.name}
				/>
			))}
		</ScrollView>
	);
};

export default Categories;

const styles = StyleSheet.create({
	category: {
		color: "black",
	},
});
