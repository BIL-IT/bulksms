import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/generated/graphql";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SingUpPageComponent() {
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [signUpMutation, { loading: signUpLoading, error: signUpError }] =
    useSignUpMutation();

  function formHandler(event: React.FormEvent) {
    event.preventDefault();
    const { confirmPassword, ...finalDetails } = userDetail;
    signUpMutation({
      variables: {
        signupDetails: finalDetails,
      },
    }).then(() => router.push("/"));
  }

  return (
    <div className="h-screen grid place-content-center">
      <Head>
        <title>Sign Up</title>
      </Head>
      <form
        onSubmit={formHandler}
        className="w-[500px] h-fit flex flex-col gap-5 p-10 shadow-gray-600 shadow rounded"
      >
        <h1 className="text-3xl mb-3 font-bold">Sign Up</h1>
        <label>
          <p>Email</p>
          <input
            value={userDetail.email}
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
            type="email"
            required
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
        </label>
        <label>
          <p>Username</p>
          <input
            minLength={5}
            value={userDetail.username}
            onChange={(e) =>
              setUserDetail({ ...userDetail, username: e.target.value })
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
        <label>
          <p>Confirm Password</p>
          <input
            value={userDetail.confirmPassword}
            onChange={(e) =>
              setUserDetail({ ...userDetail, confirmPassword: e.target.value })
            }
            type="password"
            required
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC] decoration-none"
          />
          {userDetail.confirmPassword &&
            userDetail.confirmPassword !== userDetail.password && (
              <p className="text-xs text-red-500">
                Password doesn&apos;t match
              </p>
            )}
        </label>
        <Button
          disabled={
            signUpLoading ||
            !userDetail.email ||
            !userDetail.username ||
            !userDetail.password ||
            userDetail.password !== userDetail.confirmPassword
          }
          type="submit"
          className="mt-4 py-7"
        >
          {signUpLoading ? <Loader2 /> : "Submit"}
        </Button>
        {signUpError && (
          <p className="text-red-500 text-center">{signUpError.message}</p>
        )}
        <span>
          Already have an account?{" "}
          <Link className="text-blue-800 hover:underline" href={"/login"}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
