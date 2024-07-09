import * as Lucide from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { siteConfig } from "@/lib/siteConfig";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/errorLabel";
import { useMeQuery, useSignUpMutation } from "@/generated/graphql";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Head from "next/head";
import { AllowedRole } from "@/generated/graphql";

const userSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  department: z.string().min(1, {
    message: "Department is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  confirmPassword: z.string().min(1, {
    message: "Field is required",
  }),
  role: z.enum(["ADMIN", "USER"]),
});

// enum AllowedRole {
//   ADMIN = "ADMIN",
//   USER = "USER",
// }

export default function AddUserComponent() {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");

  const router = useRouter();

  const { data, error, loading } = useMeQuery({
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      role: "USER",
    },
  });
  const [addUserMutation, { loading: addUserLoading }] = useSignUpMutation();

  watch(["password", "confirmPassword", "role"]);

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    const { confirmPassword, role, ...otherDetails } = data;

    addUserMutation({
      variables: {
        signupDetails: {
          role: role as AllowedRole,
          ...otherDetails,
        },
      },
    })
      .then(() => {
        toast({
          title: "Add User",
          description: "User Successfully Added",
          className: "bg-green-500 text-white",
        });
        reset();
      })
      .catch(() => {
        toast({
          title: "Add User",
          description: "Unable to add user, please try again later",
          variant: "destructive",
        });
      });
  };

  if (loading) return null;

  if (!router.isReady) return null;

  if ((data?.Me.role as unknown) !== AllowedRole.Admin) router.push("/");

  if (!data?.Me) router.push("/login");

  // const [addUser]

  return (
    (data?.Me.role! as unknown) === AllowedRole.Admin && (
      <div className="flex justify-center items-center min-h-screen py-10 flex-1 ">
        <Head>
          <title>Add User</title>
        </Head>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-auto p-6 border-2 shadow-lg bg-white rounded-md"
        >
          <h1 className="text-zinc-900 text-center	">Add New User</h1>
          <div className="mt-5 flex flex-col gap-4 [&>div>label]:mb-2">
            {/* Oldpassword */}
            <div className="flex flex-col">
              <label
                htmlFor="New User"
                className="text-sm font-semibold text-primary"
              >
                User Name
              </label>
              <div className="relative flex items-center">
                <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
                  <Lucide.User
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                  <input
                    className="outline-none flex-1"
                    placeholder="Username"
                    {...register("username")}
                  ></input>
                </div>
              </div>
              {errors.username && (
                <ErrorLabel>{errors.username.message}</ErrorLabel>
              )}
            </div>
            {/* New password */}
            <div className="flex flex-col">
              <label
                htmlFor="Email"
                className="text-sm font-semibold text-primary"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
                  <Lucide.LucideMail
                    className="text-primary"
                    width={16}
                    height={16}
                  />
                  <input
                    className="outline-none flex-1"
                    {...register("email")}
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="New User"
                className="text-sm font-semibold text-primary"
              >
                Role
              </label>
              <Select
                value={getValues("role")}
                onValueChange={(e) => setValue("role", e as AllowedRole)}
              >
                <SelectTrigger className="w-full border-2 outline-none">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent className="outline-none">
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="New User"
                className="text-sm font-semibold text-primary"
              >
                Department
              </label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between border-2"
                  >
                    {getValues("department")
                      ? siteConfig
                          .getDepartmentList()
                          .find(
                            (department) =>
                              department === getValues("department")
                          )
                      : "Select a Department..."}
                    <Lucide.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search department..." />
                    <CommandList>
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {siteConfig
                          .getDepartmentList()
                          .map((department, index) => (
                            <CommandItem
                              key={index}
                              value={department}
                              {...register("department")}
                              onSelect={(currentValue) => {
                                setValue(
                                  "department",
                                  currentValue === getValues("department")
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Lucide.Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  getValues("department") === department
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {department}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.department && (
                <ErrorLabel>{errors.department.message}</ErrorLabel>
              )}
            </div>

            {/* password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-primary"
              >
                Password
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
                    {...register("password")}
                  ></input>
                </div>
              </div>
              {errors.password && (
                <ErrorLabel>{errors.password.message}</ErrorLabel>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirm_password"
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
                    className="outline-none"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  ></input>
                </div>
              </div>
              {errors.confirmPassword && (
                <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
              )}
              {!!getValues("confirmPassword") &&
                getValues("password") !== getValues("confirmPassword") && (
                  <ErrorLabel>Password doesn&apos;t match</ErrorLabel>
                )}
            </div>

            <Button
              disabled={
                getValues("password") !== getValues("confirmPassword") ||
                addUserLoading
              }
              type="submit"
              className="mt-4 py-5 flex justify-center disabled:cursor-not-allowed"
            >
              {addUserLoading ? (
                <Lucide.Loader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  );
}
