// Import necessary modules
import "@/styles/globals.css";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { useRouter} from 'next/router';
import { useState ,useEffect } from 'react';
// Define the App component



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
