/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Source_Sans_3, Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/provider/Provider";
import Script from "next/script";
import Head from "next/head";
// import { AdBannerF } from "./(withCommonLayout)/aboutus/page";

// Source Sans 3 Font
const sourceSansPro = Source_Sans_3({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

// Lato Font
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Trobits - Cryptocurrency News and Information",
  description: "Get the latest cryptocurrency news, market analysis, and educational content. Learn about blockchain technology, trading tips, and stay updated with the crypto world.",
  keywords: "cryptocurrency, blockchain, crypto news, bitcoin, ethereum, trading, digital assets",
  openGraph: {
    title: "Trobits - Cryptocurrency News and Information",
    description: "Get the latest cryptocurrency news, market analysis, and educational content.",
    type: "website",
    siteName: "Trobits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trobits - Cryptocurrency News and Information",
    description: "Get the latest cryptocurrency news, market analysis, and educational content.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trobits-frontend-public-5mki35zkd-bishops-projects-f06945f9.vercel.app")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Web3 Ads Script */}
        <script
          type="text/javascript"
          src="https://app.web3ads.net/main.js"
          async
        ></script>
      </Head>

      <body className={`${sourceSansPro.variable} ${lato.variable} antialiased`}>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-101CZRBSL4" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-101CZRBSL4');
            `,
          }}
        />

        {/* Ad Banners */}
        {/* <AdBanner /> */}

        {/* App Providers */}
        <Providers>{children}</Providers>
        {/* <AdBannerF/> */}
      </body>
    </html>
  );
}
// ✅ AdBanner Component (Includes All Ads)
function AdBanner() {
  return (
    <>
      {/* Top Ad banner  */}
     {/* Another New Ad Banner */}
     {/* Top Ad banner with space */}
      <div style={{ height: "80px", width: "100%", display: "block" }}></div>
      <ins
        className="67b008e690c926b6d6b98939"
        style={{ display: "inline-block", width: "1px", height: "1px",marginBottom:"20px" }}
      ></ins>
      <Script
        id="top-ad-banner-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(e,n,c,t,o,r,d){
              !function e(n,c,t,o,r,m,d,s,a){
                s=c.getElementsByTagName(t)[0],
                (a=c.createElement(t)).async=!0,
                a.src="https://"+r[m]+"/js/"+o+".js?v="+d,
                a.onerror=function(){a.remove(),(m+=1)>=r.length||e(n,c,t,o,r,m)},
                s.parentNode.insertBefore(a,s)
              }(window,document,"script","67b008e690c926b6d6b98939",["cdn.bmcdn6.com"], 0, new Date().getTime())
            }();
          `,
        }}
      />
    </>
  );
}
