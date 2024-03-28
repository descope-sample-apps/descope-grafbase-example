"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSessionToken } from "@descope/nextjs-sdk/client";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  // const [data, setData] = useState();
  const { isAuthenticated } = useSession();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const sessionToken = getSessionToken();
    console.log(sessionToken);

    await fetch(process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        setResponse(error.message);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="flex h-16 items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-800 shadow-md">
        <Image
          alt="Descope"
          className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
          height="40"
          src="/descope-logo.png"
          width="40"
        />
        {!isAuthenticated && (
          <Link href={"/sign-in"}>
            <Button
              className="text-gray-900 dark:text-gray-100"
              variant="outline"
            >
              Login
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <Link href={"/sign-out"}>
            <Button
              className="text-gray-900 dark:text-gray-100"
              variant="outline"
            >
              Sign Out
            </Button>
          </Link>
        )}
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Enter Query</CardTitle>
              <CardDescription>
                Enter your GraphQL query or mutation below and see the response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Label htmlFor="query">GraphQL Query or Mutation</Label>
                <Textarea
                  id="query"
                  className="h-64"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  className="w-full text-white"
                  type="submit"
                  disabled={!isAuthenticated}
                >
                  Run Query
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <pre className="text-sm text-gray-900 dark:text-gray-100">
                  {response}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
