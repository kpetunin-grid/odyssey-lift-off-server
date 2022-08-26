import { ApolloServer, InMemoryCache } from 'apollo-server';
import { TrackAPI } from './datasources/track-api.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';

const DEFAULT_PORT = 4000;

const startApolloServer = async (typeDefs, resolvers) => {
	const server = new ApolloServer({
		uri: 'https://server-catstronauts.herokuapp.com/',
		cache: new InMemoryCache(),
		typeDefs,
		resolvers,
		dataSources: () => {
			return {
				trackAPI: new TrackAPI(),
			};
		},
	});

	const { url, port } = await server.listen({ port: process.env.PORT || DEFAULT_PORT });
	console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
};

startApolloServer(typeDefs, resolvers);
