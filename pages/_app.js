import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import '../public/fonts/fonts.css';
import apolloClient from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  //Making new apolloclient object and providing it to the client provider so that we can use "useQuery()" hook in children components
  const client = apolloClient();
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
