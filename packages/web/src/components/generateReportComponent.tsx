import { useGenerateReportMutation } from "@/generated/graphql";
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
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { statuses } from "./DataTable/data";

const reportSchema = z.object({
  startDate: z.date().min(new Date(0), {
    message: "Date is required",
  }),
  endDate: z.date().min(new Date(0), {
    message: "Date is required",
  }),
  status: z.string().array().min(1, {
    message: "Select atleast one status",
  }),
});

export default function GenerateReportComponent() {
  const [
    GenerateReport,
    { data: ReportData, loading: ReportLoading, error: ReportError },
  ] = useGenerateReportMutation();

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

  const onSubmit = async (data: z.infer<typeof reportSchema>) => {
    console.log(data);
    GenerateReport({
      variables: {
        reportDetailsInput: {
          endDate: data.endDate,
          startDate: data.startDate,
          status: data.status,
        },
      },
    });
  };

  return (
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
            <div className="my-5">
              <h2 className="font-semibold mb-1">Statuses</h2>
              <ToggleGroup
                type="multiple"
                value={getValues("status")}
                onValueChange={(e) => setValue("status", e)}
              >
                {/* <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    
                </ToggleGroupItem> */}
                <div className="flex flex-wrap gap-3">
                  {statuses.map((status, index) => (
                    <ToggleGroupItem
                      key={index}
                      value={status.value}
                      aria-label="Toggle bold"
                      className="flex items-center gap-2"
                    >
                      <status.icon />
                      <h3>{status.label}</h3>
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
              {errors.status && (
                <ErrorLabel>{errors.status.message}</ErrorLabel>
              )}
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button disabled={ReportLoading} type="submit" className="mt-5">
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
  );
}
