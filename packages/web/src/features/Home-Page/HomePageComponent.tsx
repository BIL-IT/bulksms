import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useGetAllSmsQuery, useMeQuery } from "@/generated/graphql";
import { columns } from "@/lib/columns";
import { messagess } from "@/lib/data";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Lucide from "lucide-react";

export default function HomePageComponent() {
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const {
    data,
    loading,
    error,
    refetch: refetchData,
  } = useGetAllSmsQuery({
    pollInterval: 10000,
  });

  if (meLoading) return;

  if (!meData?.Me) router.push("/login");

  return (
    meData &&
    data && (
      <section className="bg-background">
        <Head>
          <title>Home</title>
        </Head>
        <div className="flex justify-center py-14 min-h-full">
          <div className="xl:w-[1200px] flex justify-center">
            <div className="w-[1050px] flex flex-col items-end gap-4">
              <button
                onClick={() => refetchData()}
                className="shadow p-3 rounded [&>*]:focus-within:animate-spin-once"
              >
                <Lucide.RefreshCcw className="text-sm" />{" "}
              </button>
              <DataTable columns={columns} data={data.GetAllSMS} />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
