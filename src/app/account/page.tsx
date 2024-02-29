"use client";
import { useAuth } from "@/AuthContext/AuthContext";
import { Button } from "@/components/ui/button";
import { getClient } from "@/graphql/client";
import { DELETE_USER } from "@/graphql/mutations";
import { deleteCookie } from "cookies-next";
import { type ApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Page = () => {
  const client = getClient();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    // If auth.authData is not present, redirect to the login page
    if (!auth.authData) {
      router.push("/login");
    }
  }, [auth.authData]);

  if (!auth.authData) {
    // You can show a loading spinner or message here while redirection is happening
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-2">
        Loading...
      </div>
    );
  }

  const deleteAccount = async () => {
    const { data, errors } = await client.mutate({
      mutation: DELETE_USER,
      variables: {
        id: auth.authData?.id,
      },
    });
    if (data) {
      localStorage.removeItem("@AuthData");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.push("/login");
      toast({ title: "Account deleted succesfully" });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col gap-2">
      <h1>
        Account email: <b>{auth.authData?.email}</b>
      </h1>
      <Button variant={"destructive"} onClick={() => deleteAccount()}>
        Delete account
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem("@AuthData");
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          router.push("/login");
        }}
      >
        Log out
      </Button>
    </div>
  );
};
export default Page;
