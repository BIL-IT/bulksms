import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import {
  useGenerateReportMutation,
  useLogoutMutation,
  useMeQuery,
} from "@/generated/graphql";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import logo from "@/assets/logo.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "./errorLabel";

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

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
    watch,
  } = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    mode: "all",
  });

  watch();

  const [logoutMutation] = useLogoutMutation();

  const dir = router.asPath.split("/")[1];

  const [
    GenerateReport,
    { data: ReportData, loading: ReportLoading, error: ReportError },
  ] = useGenerateReportMutation();

  function handleDownload() {
    const data = new Blob([ReportData?.generateReport as string], {
      type: "text/csv",
    });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute(
      "download",
      `BIL-SMS-REPORT-${new Date().toISOString()}.csv`
    );
    tempLink.click();
  }

  // useEffect(() => {
  //   console.log(date);
  //   console.log(getValues("startDate"));
  // }, [date]);

  if (!meData?.Me) return;

  const onSubmit = async (data: z.infer<typeof reportSchema>) => {
    console.log(data);
    GenerateReport({
      variables: {
        reportDetailsInput: {
          endDate: data.endDate,
          startDate: data.startDate,
          status: [""],
        },
      },
    });
    console.log(data);
  };

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
        <div className="flex flex-col gap-2">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Generate Report</Button>
          </DialogTrigger>
          <DialogContent className="w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-primary mb-3 text-2xl font-semibold">
                Generate Report
              </DialogTitle>
              <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex [&>span]:flex-1 items-start">
                  <span>
                    <h3 className="font-semibold mb-1">Start Date</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full max-w-[280px] justify-start text-left font-normal",
                            !getValues("startDate") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {getValues("startDate") ? (
                            format(getValues("startDate"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          required={false}
                          selected={getValues("startDate")}
                          onSelect={(e) => {
                            setValue("startDate", e!);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.startDate && (
                      <ErrorLabel>{errors.startDate.message}</ErrorLabel>
                    )}
                  </span>
                  <span>
                    <h3 className="font-semibold mb-1">End Date</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !getValues("startDate") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {getValues("endDate") ? (
                            format(getValues("endDate"), "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={getValues("endDate")}
                          onSelect={(e) => setValue("endDate", e!)}
                          initialFocus
                        />
                      </PopoverContent>
                      {errors.endDate && (
                        <ErrorLabel>{errors.endDate.message}</ErrorLabel>
                      )}
                    </Popover>
                  </span>
                </div>
                <div className="grid grid-cols-2"></div>
                <div className="flex flex-col gap-3 items-center">
                  <Button
                    disabled={ReportLoading}
                    type="submit"
                    className="mt-5"
                  >
                    {ReportLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        <LoaderIcon className="animate-spin" />
                        <p>Generating...</p>
                      </span>
                    ) : (
                      <>Generate</>
                    )}
                  </Button>
                  {ReportData?.generateReport && (
                    <Button variant={"link"} onClick={handleDownload}>
                      Download
                    </Button>
                  )}
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
