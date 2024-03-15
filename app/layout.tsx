"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@descope/nextjs-sdk";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const client = new ApolloClient({
  uri: "http://127.0.0.1:4000/",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider
        projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
      >
        <ApolloProvider client={client}>
          <body className={fontSans.className}>{children}</body>
        </ApolloProvider>
      </AuthProvider>
    </html>
  );
}
