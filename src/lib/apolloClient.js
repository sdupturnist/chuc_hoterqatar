import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: wordpressGraphQlApiUrl, // Replace with your GraphQL endpoint
  cache: new InMemoryCache()
});

export default client;
