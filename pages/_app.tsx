import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import classes from "../styles/global.css"
import { HeaderFixedBar } from "../components/HeaderFixedBar";
import { HeaderNavBar } from "../components/HeaderMegamenuBar";

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
      <HeaderFixedBar /> 
      <HeaderNavBar />
      <Component {...pageProps} className={classes.body}/>
    </MantineProvider>
  );
}
