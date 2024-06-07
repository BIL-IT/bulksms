import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useMeQuery, useScheduledJobsQuery } from "@/generated/graphql";
import { scheduledJobsCol } from "@/lib/scheduledJobsColumn";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ScheduledMessagesComponent() {
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const { data, loading, error } = useScheduledJobsQuery();

  if (meLoading) return;

  return (
    <main>
      <Head>
        <title>Scheduled Messages</title>
      </Head>
      <div className="flex justify-center py-14 min-h-full">
        <div className="xl:w-[1200px] flex justify-center">
          <div className="w-[1050px] flex flex-col gap-4">
            {data && (
              <DataTable
                data={data.getAllScheduledJobs}
                columns={scheduledJobsCol}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
