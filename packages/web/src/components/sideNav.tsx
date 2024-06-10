import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

export default function SideNav() {
  const router = useRouter();

  const dir = router.asPath.split("/")[1];

  return (
    <main className="bg-card-foreground flex flex-col justify-between text-card py-7 px-3 flex-grow-0 h-screen sticky top-0 w-[225px]">
      <div className=" flex flex-col gap-5 ">
        <span className="flex items-center gap-2">
          <h2 className="font-bold">BIL</h2>
          <h4 className="text-sm font-semibold"> - SMS SERVER</h4>
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-muted-foreground mb-1">GENERAL</h2>
          {siteConfig.getNewHeaders().map((Header, index) => (
            <span
              key={index}
              className={`flex items-center rounded p-2 gap-2 ${"/" + dir === Header.href ? "bg-accent-foreground" : "text-muted-foreground"}`}
            >
              <Header.Icon />

              <Link href={Header.href} className="w-full">
                {Header.title}
              </Link>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-muted-foreground mb-1">SETTINGS</h2>
          {siteConfig.getNewHeaders().map((Header, index) => (
            <span
              key={index}
              className={`flex items-center rounded p-2 gap-2 ${"/" + dir === Header.href ? "bg-accent-foreground" : "text-muted-foreground"}`}
            >
              <Header.Icon />

              <Link href={Header.href} className="w-full">
                {Header.title}
              </Link>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant={"destructive"}>Generate Report</Button>
        <Button variant="secondary">Logout</Button>
      </div>
    </main>
  );
}
