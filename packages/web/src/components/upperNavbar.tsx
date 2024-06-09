import { siteConfig } from "@/lib/siteConfig";
import { Button } from "./ui/button";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import { Moon, Sun } from "lucide-react";

export default function UpperNavbarComponent({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const [logoutMutation] = useLogoutMutation();

  return (
    <nav className="w-full flex justify-between px-3 py-2 items-center">
      <div className="flex gap-3 items-center text-lg">
        <Button
          onClick={() => logoutMutation().then(() => router.push("/login"))}
          className=""
        >
          Logout
        </Button>
        {siteConfig.getHeaders().map((item, index) => (
          <Link href={item.href} key={index} className="text-foreground ">
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 items-center cursor-pointer">
        <h3>
          Welcome ( {meData?.Me.username} ) Logged in at{" "}
          {new Date(meData?.Me.lastLoggedIn!).toString().split("GMT")[0]}
        </h3>
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Moon /> : <Sun />}
        </div>
      </div>
    </nav>
  );
}
