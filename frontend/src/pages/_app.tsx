import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Noto_Sans_JP } from "next/font/google";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import awsconfig from "@/config/amplify";

I18n.putVocabularies(translations);
I18n.setLanguage("ja");
Amplify.configure(awsconfig);

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className={`${noto.className}`}>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
