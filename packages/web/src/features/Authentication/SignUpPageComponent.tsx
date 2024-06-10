import ErrorLabel from "@/components/errorLabel";
import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(1, {
    message: "Username cannot be empty",
  }),
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password cannot be empty",
  }),
  confirmPassword: z.string().min(1, {
    message: "Field cannot be empty",
  }),
});

export default function SignUpPageComponent() {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  watch(["password", "confirmPassword"]);

  const [signUpMutation, { loading: signUpLoading, error: signUpError }] =
    useSignUpMutation();

  function formHandler(data: z.infer<typeof signUpSchema>) {
    const { confirmPassword, ...finalDetails } = data;
    signUpMutation({
      variables: {
        signupDetails: finalDetails,
      },
    }).then(() => router.push("/"));
  }

  return (
    <div className="min-h-screen grid place-content-center flex-1">
      <Head>
        <title>Sign Up</title>
      </Head>
      <form
        onSubmit={handleSubmit(formHandler)}
        className="w-[500px] my-10 h-fit flex flex-col gap-5 p-10 shadow-gray-600 shadow rounded"
      >
        <h1 className="text-3xl mb-3 font-bold">Sign Up</h1>
        <label>
          <p>Email</p>
          <input
            {...register("email")}
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
          {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
        </label>
        <label>
          <p>Username</p>
          <input
            {...register("username")}
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
          {errors.username && (
            <ErrorLabel>{errors.username.message}</ErrorLabel>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            {...register("password")}
            type="password"
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC]"
          />
          {errors.password && (
            <ErrorLabel>{errors.password.message}</ErrorLabel>
          )}
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            {...register("confirmPassword")}
            type="password"
            className="border rounded outline-none py-3 px-5 w-full mt-3 border-[#CCC] decoration-none"
          />
          {errors.confirmPassword && (
            <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
          )}
          {!!getValues("confirmPassword") &&
            getValues("password") !== getValues("confirmPassword") && (
              <ErrorLabel>Password doesn&apos;t match</ErrorLabel>
            )}
        </label>
        <Button
          disabled={
            signUpLoading ||
            getValues("password") !== getValues("confirmPassword")
          }
          type="submit"
          className="mt-4 py-7"
        >
          {signUpLoading ? <Loader2 className="animate-spin" /> : "Submit"}
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
