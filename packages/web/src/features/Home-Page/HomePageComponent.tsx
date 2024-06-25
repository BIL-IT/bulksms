import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useGetAllSmsQuery, useMeQuery } from "@/generated/graphql";
import { columns } from "@/lib/columns";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Lucide from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { DataTableToolbar } from "@/components/DataTable/data-table-toolbar";
import { dummy_messages } from "@/lib/data";
import dummy_cols from "@/lib/dummyColumns";

export default function HomePageComponent() {
  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery({
    pollInterval: 10000,
  });

  const {
    data,
    loading,
    error,
    refetch: refetchData,
  } = useGetAllSmsQuery({
    pollInterval: 10000,
  });

  const dateSchema = z.coerce.date();
  const [searchField, setSearchField] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  if (meLoading) return;

  if (!meData?.Me) router.push("/login");

  return (
    meData && (
      <section className="bg-background flex-1">
        <Head>
          <title>BIL SMS-SERVER</title>
        </Head>
        <div className="flex justify-center py-7 min-h-full">
          <div className="xl:max-w-[1100px] 2xl:max-w-[1500px] w-full flex justify-center">
            <div className="xl:max-w-[1000px] 2xl:max-w-[1300px] flex flex-col gap-4">
              {/* <div className="w-full flex items-end justify-between">
                <button
                  onClick={() => refetchData()}
                  className="shadow-sm active:bg-card-foreground active:text-card shadow-primary p-3 rounded [&>*]:focus-within:animate-spin-once"
                >
                  <Lucide.RefreshCcw className="text-sm" />{" "}
                </button>
              </div> */}
              <DataTable
                fromDate={fromDate}
                searchField={searchField}
                setFromDate={setFromDate}
                setSearchField={setSearchField}
                setToDate={setToDate}
                toDate={toDate}
                columns={data?.GetAllSMS ? columns : dummy_cols}
                data={
                  data?.GetAllSMS
                    ? data.GetAllSMS.filter(
                        (prev) =>
                          prev.phone.includes(searchField) ||
                          prev.content
                            .toLowerCase()
                            .includes(searchField.toLowerCase())
                      )
                        .filter((prev) => {
                          if (!fromDate) return true;
                          else {
                            return (
                              dateSchema.parse(prev.time).getTime() >
                              dateSchema.parse(fromDate).getTime()
                            );
                          }
                        })
                        .filter((prev) => {
                          if (!toDate) return true;
                          else {
                            return (
                              dateSchema.parse(prev.time).getTime() <
                              dateSchema.parse(toDate).getTime()
                            );
                          }
                        })
                    : dummy_messages
                }
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
