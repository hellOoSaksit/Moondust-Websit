// Import necessary modules
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";

// Define the App component
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap the entire component tree with SessionProvider
      <Layout>
        <Component {...pageProps}/>
      </Layout>
  );
}
