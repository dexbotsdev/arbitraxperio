import "@mantine/core/styles.css";
import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import * as classes from "./global.css"
import { HeaderFixedBar } from "../components/HeaderFixedBar";
import { HeaderNavBar } from "../components/HeaderMegamenuBar";
import { AdBar } from "../components/AdBar";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
       <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Notifications position="top-center" zIndex={1000}/>
      <HeaderFixedBar /> 
      <HeaderNavBar />  
      <Container  fluid mt={'4rem'} p={0}>
        <Component {...pageProps} className={classes.body}/>
      </Container>
    </MantineProvider>
  );
}
