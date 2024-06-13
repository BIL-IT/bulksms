// 0f390699-5221-46fd-9493-979e4d4109ef
// 41273

import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import {
  useGenerateReportMutation,
  useLogoutMutation,
  useMeQuery,
} from "@/generated/graphql";
import Image from "next/image";
import logo from "@/assets/logo.png";

import { z } from "zod";
import GenerateReportComponent from "./generateReportComponent";

const reportSchema = z.object({
  startDate: z.date().min(new Date(0), {
    message: "Date is required",
  }),
  endDate: z.date().min(new Date(0), {
    message: "Date is required",
  }),
  status: z.string().optional(),
});

export default function SideNav() {
  // const [date, setDate] = useState<Date>();
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const [logoutMutation] = useLogoutMutation();

  const dir = router.asPath.split("/")[1];

  const [
    GenerateReport,
    { data: ReportData, loading: ReportLoading, error: ReportError },
  ] = useGenerateReportMutation();

  // useEffect(() => {
  //   console.log(date);
  //   console.log(getValues("startDate"));
  // }, [date]);

  if (!meData?.Me) return;

  return (
    <main className="sideNav bg-card-foreground flex flex-col justify-between gap-10 text-card py-7 px-3 flex-grow-0 overflow-y-auto h-screen sticky top-0 w-[225px]">
      <div className=" flex flex-col gap-5 ">
        <span
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <Image src={logo} alt="devlinks" width={60} height={40} />
          <h4 className="text-sm font-semibold"> - SMS SERVER</h4>
        </span>
        <div className="flex flex-col gap-2 font-semibold">
          <h2 className="font-bold text-card mb-1">GENERAL</h2>
          {siteConfig.getNewHeaders().map((Header, index) => (
            <span
              key={index}
              className={`flex items-center rounded p-2 gap-2 ${"/" + dir === Header.href ? "bg-card text-black" : "text-muted-foreground"}`}
            >
              <Header.Icon />

              <Link href={Header.href} className="w-full">
                {Header.title}
              </Link>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-card mb-1">SETTINGS</h2>
          {siteConfig.getNewSecondaryHeaders().map((Header, index) => (
            <span
              key={index}
              className={`flex items-center rounded p-2 gap-2 ${"/" + dir === Header.href ? "bg-card text-black" : "text-muted-foreground"}`}
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
        <GenerateReportComponent />
        <Button
          onClick={() => {
            logoutMutation().then(() => router.reload());
          }}
          variant="secondary"
          className="font-semibold"
        >
          Logout
        </Button>
      </div>
    </main>
  );
}
