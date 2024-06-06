import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SecondaryNavbar() {
  const router = useRouter();

  const dir = router.asPath.split("/")[1];

  return (
    <nav className="flex justify-between  text-xl text-center">
      {siteConfig.getSecondaryHeaders().map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`border border-foreground py-3 w-full hover:bg-secondary-foreground hover:text-background transition-colors ease-linear ${"/" + dir === item.href && "bg-foreground text-background"}`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
