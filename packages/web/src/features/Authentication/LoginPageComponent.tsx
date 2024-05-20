import { Button } from "@/components/ui/button";
import { useLoginMutation, useMeQuery } from "@/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function LoginPageComponent() {
  const [userDetail, setUserDetail] = useState({
    emailOrUsername: "",
    password: "",
  });

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useLoginMutation();

  const router = useRouter();

  if (meData?.Me) {
    router.push("/");
  }

  function formHandler(event: React.FormEvent) {
    event.preventDefault();
    loginMutation({
      variables: {
        loginDetails: userDetail,
      },
    }).then(() => router.push("/").then(() => meRefetch()));
  }

  return (
    <div className="h-screen grid place-content-center">
      <Head>
        <title>Login</title>
      </Head>
      <form
        onSubmit={formHandler}
        className="w-[500px] h-fit flex flex-col gap-5 p-10 shadow-gray-600 shadow rounded"
      >
        <h1 className="text-3xl mb-3 font-bold">Login</h1>
        <label>
          <p>Username or Email</p>
          <input
            value={userDetail.emailOrUsername}
            onChange={(e) =>
              setUserDetail({ ...userDetail, emailOrUsername: e.target.value })
            }
            type="text"
            required
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={userDetail.password}
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
            type="password"
            required
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
        </label>
        <Button
          disabled={
            loginLoading || !userDetail.emailOrUsername || !userDetail.password
          }
          type="submit"
          className="mt-4 py-7"
        >
          {loginLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
        {loginError && (
          <p className="text-red-500 text-center">{loginError.message}</p>
        )}
        <span>
          Don&apos;t have an account?{" "}
          <Link className="text-blue-800 hover:underline" href={"/signup"}>
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
}
