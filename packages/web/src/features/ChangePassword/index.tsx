import * as Lucide from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation, useMeQuery } from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/errorLabel";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Head from "next/head";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, {
    message: "Field is required",
  }),
  newPassword: z.string().min(1, {
    message: "Field is required",
  }),
  confirmPassword: z.string().min(1, {
    message: "Field is required",
  }),
});

export default function ChangePasswordComponent() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    mode: "all",
  });

  watch();

  const { data, error, loading } = useMeQuery({
    pollInterval: 10000,
  });

  const [
    changePasswordMutation,
    { loading: changePasswordLoading, error: changePasswordError },
  ] = useChangePasswordMutation({});

  const onSubmit = (data: z.infer<typeof passwordSchema>) => {
    changePasswordMutation({
      variables: {
        changePasswordInput: {
          newPassword: data.newPassword,
          oldPassword: data.oldPassword,
        },
      },
    })
      .then(() => {
        toast({
          title: "Change Password",
          description: "Successfully changed password",
          className: "bg-green-500 text-white",
        });
        reset();
      })
      .catch(() => {
        toast({
          title: "Change Password",
          description: "Unable to change password, please try again later",
          variant: "destructive",
        });
      });
  };

  if (loading) return null;

  if (router.isReady && !data?.Me) router.push("/login");

  return (
    data?.Me && (
      <div className="flex justify-center items-center h-screen flex-1 ">
        <Head>
          <title>Change Password</title>
        </Head>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-auto p-6 border-2 shadow-lg bg-white rounded-md pl-8"
        >
          <h1 className="text-zinc-900 text-center	">Set New password</h1>
          <div className="mt-10 flex flex-col gap-4 [&>div>label]:mb-2">
            {/* Oldpassword */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-primary"
              >
                Old Password
              </label>
              <div className="relative flex items-center">
                <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
                  <Lucide.Lock
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                  <input
                    className="outline-none flex-1"
                    type="password"
                    placeholder="password"
                    {...register("oldPassword")}
                  ></input>
                </div>
              </div>
              {errors.oldPassword && (
                <ErrorLabel>{errors.oldPassword.message}</ErrorLabel>
              )}
            </div>
            {/* New password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-primary"
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
                  <Lucide.Lock
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                  <input
                    className="outline-none flex-1"
                    type="password"
                    placeholder="password"
                    {...register("newPassword")}
                  ></input>
                </div>
              </div>
              {errors.newPassword && (
                <ErrorLabel>{errors.newPassword.message}</ErrorLabel>
              )}
            </div>
            {/* Confirmpassword */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-primary"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
                  <Lucide.Lock
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                  <input
                    className="outline-none flex-1"
                    type="password"
                    placeholder="password"
                    {...register("confirmPassword")}
                  ></input>
                </div>
              </div>
              {errors.confirmPassword && (
                <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
              )}
              {!!getValues("confirmPassword") &&
                getValues("newPassword") !== getValues("confirmPassword") && (
                  <ErrorLabel>Password doesn&apos;t match</ErrorLabel>
                )}
            </div>

            <Button
              disabled={
                getValues("newPassword") !== getValues("confirmPassword") ||
                changePasswordLoading
              }
              type="submit"
              className="mt-4 py-5 flex justify-center disabled:cursor-not-allowed"
            >
              {changePasswordLoading ? (
                <Lucide.Loader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            {changePasswordError && (
              <ErrorLabel className="text-center">
                {changePasswordError.message}
              </ErrorLabel>
            )}
          </div>
        </form>
      </div>
    )
  );
}
