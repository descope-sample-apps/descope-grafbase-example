"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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
import {
  useSession,
  useUser,
  getSessionToken,
} from "@descope/nextjs-sdk/client";

const RUN_QUERY = gql`
  mutation AddItem($input: ItemInput!) {
    addItem(input: $input) {
      id
      value
    }
  }
`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  // const [data, setData] = useState();
  const { isAuthenticated } = useSession();

  const [runQuery, { data, loading, error }] = useMutation(RUN_QUERY, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, 2));
    },
  });

  // const fetchData = async () => {
  //   const sessionToken = getSessionToken();

  //   await fetch(process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${sessionToken}`,
  //     },
  //     body: JSON.stringify({ query }),
  //   }).then((res) => res.json().then(({ data }) => setData(data)));
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await runQuery({
        variables: {
          input: {
            /* your variables here */
          },
        },
      });
    } catch (err: any) {
      console.error(err);
      setResponse(err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="flex h-16 items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Descope + Grafbase Sample App
        </h1>
        <Link href={"/sign-in"}>
          <Button
            className="text-gray-900 dark:text-gray-100"
            variant="outline"
          >
            Login
          </Button>
        </Link>
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
                  className="h-64"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  className="w-full text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Running..." : "Run Query"}
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
                  {error ? error.message : response}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
