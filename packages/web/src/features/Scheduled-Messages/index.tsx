import { DataTable } from "@/components/DataTable/DataTableComponent";
import { DialogHeader } from "@/components/ui/dialog";
import {
  useAddJobMutation,
  useMeQuery,
  useScheduledJobsQuery,
} from "@/generated/graphql";
import { scheduledJobsCol } from "@/lib/scheduledJobsColumn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function ScheduledMessagesComponent() {
  const [searchField, setSearchField] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dateSchema = z.coerce.date();

  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery({
  });

  const { data, loading, error, refetch } = useScheduledJobsQuery();

  const [addJobMutation] = useAddJobMutation();

  const { toast } = useToast();

  const newFieldSchema = z.object({
    phoneNumber: z.string().min(1),
    messages: z.string().min(1),
  });

  const { register, handleSubmit, watch, getValues, reset } = useForm<
    z.infer<typeof newFieldSchema>
  >({
    resolver: zodResolver(newFieldSchema),
    defaultValues: {},
  });

  watch();

  if (meLoading) return;

  if (!meData?.Me) router.push("/login");

  function onSubmit(data: z.infer<typeof newFieldSchema>) {
    addJobMutation({
      variables: {
        cronJobNewFieldInput: {
          number: data.phoneNumber,
          message: data.messages,
        },
      },
    })
      .then(() => {
        refetch();
        toast({
          title: "Message Scheduler",
          description: "Successfully Added",
        });
        reset();
      })
      .catch(() => {
        toast({
          title: "Message Scheduler Error",
          description: "Please try again later",
          variant: "destructive",
        });
      });
  }

  return (
    meData?.Me && (
      <main className="bg-background flex-1">
        <Head>
          <title>Scheduled Messages</title>
        </Head>
        <div className="flex justify-center py-7 min-h-full">
          <div className="xl:max-w-[1100px] 2xl:max-w-[1500px] w-full flex justify-center">
            <div className="xl:max-w-[1000px] 2xl:max-w-[1300px] flex flex-col items-start gap-4">
              <Dialog key={1}>
                <DialogTrigger
                  className="bg-green-600 px-3 py-2 rounded text-white "
                  key={1}
                  type="button"
                >
                  Add Field
                </DialogTrigger>
                <DialogContent className="w-[700px]">
                  <DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <DialogTitle>Add a New Record?</DialogTitle>
                      <div className="my-2 grid gap-1">
                        <DialogDescription>Phone Number(s)</DialogDescription>
                        <input
                          type="text"
                          {...register("phoneNumber")}
                          className="w-full p-1.5 outline-none focus:border-black rounded border"
                        />
                      </div>
                      <div className="my-2 grid gap-1">
                        <DialogDescription>Message</DialogDescription>
                        <textarea
                          {...register("messages")}
                          className="w-full min-h-[150px] p-1.5 outline-none focus:border-black rounded border"
                        />
                      </div>
                      <DialogTrigger
                        onClick={() => {}}
                        type="submit"
                        disabled={
                          !getValues("messages") || !getValues("phoneNumber")
                        }
                        className="text-center bg-primary w-full text-white py-2 rounded"
                      >
                        Save
                      </DialogTrigger>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              {data && (
                <DataTable
                  fromDate={fromDate}
                  searchField={searchField}
                  setFromDate={setFromDate}
                  setSearchField={setSearchField}
                  setToDate={setToDate}
                  toDate={toDate}
                  data={data.getAllScheduledJobs
                    .filter(
                      (prev) =>
                        prev.to.includes(searchField) ||
                        prev.message
                          .toLowerCase()
                          .includes(searchField.toLowerCase())
                    )
                    .filter((prev) => {
                      if (!fromDate) return true;
                      else {
                        return (
                          dateSchema.parse(prev.createdAt).getTime() >
                          dateSchema.parse(fromDate).getTime()
                        );
                      }
                    })
                    .filter((prev) => {
                      if (!toDate) return true;
                      else {
                        return (
                          dateSchema.parse(prev.createdAt).getTime() <
                          dateSchema.parse(toDate).getTime()
                        );
                      }
                    })}
                  columns={scheduledJobsCol}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    )
  );
}
