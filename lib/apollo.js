import { ApolloClient, InMemoryCache } from '@apollo/client';

// Changed file to return multiple objects
const apolloClient = () => {
  return new ApolloClient({
    uri: 'http://144.217.79.28/~fivefingerdiscou/graphql',
    cache: new InMemoryCache(),
  });
};

export default apolloClient;
