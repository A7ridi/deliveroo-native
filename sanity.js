import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
	projectId: "09ylnan9",
	dataset: "production",
	useCdn: true,
	apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
	return builder.image(source);
};

// sanity cors add http://localhost:19006

export default client;
