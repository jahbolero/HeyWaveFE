import Script from "next/script";
import { ChakraProvider } from "@chakra-ui/react";
import { MakiProvider, useInitApp } from "@xw3/maki";
import theme from "@/theme";
import { TEST_CHAT_DATA } from "@/constants/testData";
import { AppLoader } from "@/components/AppLoader";

const API_URL = process?.env?.NEXT_PUBLIC_API_URL
const IS_PROD = process.env.NEXT_PUBLIC_ENV == 'production'

export default function App({ Component, pageProps, router }) {
  const { app, loading, onReady, gram } = useInitApp(API_URL)

  if (loading || !app) {
    return <AppLoader />
  }

  return (
    <MakiProvider
      app={app}
      chatData={IS_PROD ? null : TEST_CHAT_DATA}      
      gram={gram}
      router={router} 
      apiUrl={API_URL}>
      <Script src="https://telegram.org/js/telegram-web-app.js" id="telegram" onReady={onReady} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MakiProvider>
  )
}
