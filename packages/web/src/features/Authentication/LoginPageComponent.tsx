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
import logo from "@/assets/logo.png";
import Image from "next/image";

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
    <div className="min-h-screen md:bg-[#F6F6F6] grid gap-5 place-content-center py-5 flex-1">
      <Head>
        <title>Login - BIL SMS-SERVER</title>
      </Head>
      <div className="flex justify-center gap-5 items-center">
        <Image src={logo} alt="devlinks" width={100} />
        <h3 className="font-bold text-3xl text-primary">SMS-SERVER</h3>
      </div>
      <form
        onSubmit={handleSubmit((data) => formHandler(data))}
        className="w-[500px] h-fit flex flex-col gap-5 p-10 bg-white rounded"
      >
        <div>
          <h1 className="text-3xl text-primary font-bold">Login</h1>
          <h3 className="mt-2 text-sm font-semibold">
            Add your details below to get back into the app
          </h3>
        </div>
        <div className="grid gap-6">
          <div className="">
            <label
              className="text-sm font-semibold text-primary"
              htmlFor="email"
            >
              Email address or Username
            </label>
            <div className="flex gap-3 items-center border px-4 py-3 rounded-lg mt-1">
              <Lucide.LucideMail
                className="text-primary"
                width={16}
                height={16}
              />
              <input
                id="email"
                className="outline-none flex-1 text-sm"
                placeholder="e.g. user@email.com"
                {...register("emailOrUsername")}
              />
            </div>
            {errors.emailOrUsername && (
              <ErrorLabel>{errors.emailOrUsername.message}</ErrorLabel>
            )}
          </div>
          <div className="">
            <label
              className="text-sm font-semibold text-primary"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex gap-3 items-center border px-4 py-3 rounded-lg mt-1">
              <Lucide.LockIcon
                className="text-primary"
                width={16}
                height={16}
              />
              <input
                id="password"
                className="outline-none flex-1 text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                // onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                {showPassword ? (
                  <Lucide.EyeOff
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Lucide.Eye className="text-primary" width={16} height={16} />
                )}
              </button>
            </div>
            {errors.password && (
              <ErrorLabel>{errors.password.message}</ErrorLabel>
            )}
          </div>
        </div>
        {loginError?.message.toLowerCase().includes("fetch") && (
          <div className="border flex flex-col gap-3 border-red-500 text-red-500 rounded p-3 text-center">
            <h3>Unable to fetch?</h3>
            <p className="text-sm">
              Click the button below to add an exception to your browser and
              come back!
            </p>
            <Link
              href={`https://${window.location.hostname}:2001`}
              target="_blank"
              className=""
            >
              <Button type="button" variant="destructive" className="w-full">
                Click here
              </Button>
            </Link>
          </div>
        )}
        <Button disabled={loginLoading} type="submit" className="mt-4 py-5">
          {loginLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
        {loginError && (
          <p className="text-red-500 text-center">{loginError.message}</p>
        )}
        {/* <span>
          Don&apos;t have an account?{" "}
          <Link className="text-blue-800 hover:underline" href={"/signup"}>
            Sign Up
          </Link>
        </span> */}
      </form>
    </div>
  );
}
