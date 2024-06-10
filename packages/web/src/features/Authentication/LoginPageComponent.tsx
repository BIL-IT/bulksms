import { Button } from "@/components/ui/button";
import { useLoginMutation, useMeQuery } from "@/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Head from "next/head";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/errorLabel";
import * as Lucide from "lucide-react";

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, {
    message: "Email or Username cannot be empty",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty",
  }),
});

export default function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
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

  function formHandler(data: z.infer<typeof loginSchema>) {
    loginMutation({
      variables: {
        loginDetails: data,
      },
    }).then(() => router.push("/").then(() => meRefetch()));
  }

  return (
    <div className="h-screen grid place-content-center flex-1">
      <Head>
        <title>Login</title>
      </Head>
      <form
        onSubmit={handleSubmit((data) => formHandler(data))}
        className="w-[500px] h-fit flex flex-col gap-5 p-10 shadow-gray-600 shadow rounded"
      >
        <h1 className="text-3xl mb-3 font-bold">Login</h1>
        <label>
          <p>Username or Email</p>
          <input
            {...register("emailOrUsername")}
            type="text"
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
          {errors.emailOrUsername && (
            <ErrorLabel>{errors.emailOrUsername.message}</ErrorLabel>
          )}
        </label>
        <div>
          <p>Password</p>
          <span className="border rounded outline-none flex py-3 items-center px-5 w-full gap-2 mt-3 border-[#CCC]">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="outline-none flex-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Lucide.EyeOff /> : <Lucide.Eye />}
            </button>
          </span>
          {errors.password && (
            <ErrorLabel>{errors.password.message}</ErrorLabel>
          )}
        </div>
        <Button disabled={loginLoading} type="submit" className="mt-4 py-7">
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
