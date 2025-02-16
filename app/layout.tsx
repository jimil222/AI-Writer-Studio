import type { Metadata } from "next";
import "./globals.css";
import {Inter,Poppins,Outfit} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const outfit = Outfit({subsets:["latin"]})
export const metadata: Metadata = {
  title: "AI Writer Studio",
  description: "By Jimil Soni",
  icons:{
    icon:'/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );  
}
