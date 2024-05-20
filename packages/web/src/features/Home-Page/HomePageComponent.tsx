import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useGetAllSmsQuery, useMeQuery } from "@/generated/graphql";
import { columns } from "@/lib/columns";
import { messagess } from "@/lib/data";
import Head from "next/head";
import { useRouter } from "next/router";

export default function HomePageComponent() {
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const { data, loading, error } = useGetAllSmsQuery();

  data?.GetAllSMS;

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
          <div className="xl:w-[1200px] ">
            <DataTable columns={columns} data={data.GetAllSMS} />
          </div>
        </div>
      </section>
    )
  );
}
