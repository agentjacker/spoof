import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";
import Head from "next/head";

import { initWeb3InboxClient } from "@web3inbox/react";
import W3MProvider from "../components/W3MProvider";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

initWeb3InboxClient({
  projectId,
  allApps: process.env.NODE_ENV === "development" ? true : false,
  domain: "opensea.io",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GM Dapp</title>
        <link rel="shortcut icon" href="/gm.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <W3MProvider>
          <Box
            width="100vw"
            style={{ width: "100vw", height: "100vh" }}
            className="bg-primary"
          >
            <Grid
              templateAreas={`"header" "main" "footer"`}
              style={{ height: "100%", width: "100%" }}
              gridTemplateRows={"50px 3f 20px"}
              gridTemplateColumns={"1fr"}
              paddingY="2em"
            >
              <GridItem area={"header"} padding={4}>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  gap="5"
                  fontSize={"1.25em"}
                />
              </GridItem>
              <Flex justifyContent="center">
                <GridItem area={"main"} justifyContent="center">
                  <Component {...pageProps} />
                </GridItem>
              </Flex>
              <Footer />
            </Grid>
          </Box>
        </W3MProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
