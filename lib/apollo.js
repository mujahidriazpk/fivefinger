import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://144.217.79.28/~fivefingerdiscou/graphql',
  cache: new InMemoryCache(),
});

export default client;
