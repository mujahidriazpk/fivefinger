import { GET_ALL_CATEGORIES, GET_SERVICES_BY_LOCATION } from "../graphql/query";
import apolloClient from "../lib/apollo";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export default async function sitemap() {
	const client = apolloClient();
	const sMap = []

	const { data: locations } = await client.query({
		query: GET_ALL_CATEGORIES
	});

	const allLocations = locations.categories.nodes

	for (const location of allLocations) {
		sMap.push({
			lastModified: new Date(),
			priority: 1,
			url: `${serverUrl}/${location.slug}`,
		})

		const { data: servicesData } = await client.query({
			query: GET_SERVICES_BY_LOCATION,
			variables: {
				location: location.slug,
			},
		});

		servicesData.services.nodes.forEach(service => {
			sMap.push({
				lastModified: new Date(),
				priority: 1,
				url: `${serverUrl}/${location.slug}/${service.slug}`,
			})
		});
	}
	return sMap
}
