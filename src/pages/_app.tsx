import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet, smartWallet } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import ClientLayout from './ClientLayout'; // Ensure this path is correct
import PrelineScript from '@/components/PrelineScript';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Joyride from 'react-joyride';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {


    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Web3trivia " />
                <link rel="manifest" href="/site.webmanifest" />

                <link rel="icon" href="/logo.png" sizes="any" />
                <title>Web3Trivia</title>
                <meta name="description" content="Play, Learn and Earn Crypto" />
                <meta name="description" content="Play trivia games, learn about various topics, and earn cryptocurrency rewards with Web3Trivia on Binance Testnet." />
                <meta name="keywords" content="Web3, trivia, earn crypto, play to earn, blockchain, Binance Testnet, cryptocurrency rewards" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Web3Trivia - Play, Learn, and Earn Crypto" />
                <meta property="og:description" content="Join Web3Trivia, play trivia games, and earn crypto rewards in a fun and engaging way." />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://www.web3trivia.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Web3Trivia - Play and Earn Crypto" />
                <meta name="twitter:description" content="Play trivia games, learn, and earn crypto rewards!" />
                <meta name="twitter:image" content="/logo.png" />
            </Head>

            <ThirdwebProvider
                clientId={process.env.NEXT_PUBLIC_clientID}
                activeChain={BinanceTestnet}
                supportedWallets={[
                    smartWallet(embeddedWallet({
                        auth: {
                            options: ["email", "google", "facebook", "apple"],
                        },
                        recommended: true,
                    }), {
                        factoryAddress: '0xd35e67355f3830AE51BB5eD5A72bb5b188d50eE0',
                        gasless: true,
                    })
                ]}
                authConfig={{
                    domain: process.env.DOMAIN || "",
                    authUrl: "/api/auth"
                }}
            >
                <ThemeProvider attribute="class" defaultTheme="system">
                    <QueryClientProvider client={queryClient}>
                        <ClientLayout>
                            {isClient && (
                                <Component {...pageProps} />
                            )}

                            <Analytics />
                            <SpeedInsights />
                        </ClientLayout>
                    </QueryClientProvider>
                </ThemeProvider>
            </ThirdwebProvider>

            <PrelineScript />
            <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
        </>
    );
}

export default MyApp;
