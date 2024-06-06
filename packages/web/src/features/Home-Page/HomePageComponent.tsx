import { DataTable } from "@/components/DataTable/DataTableComponent";
import { useGetAllSmsQuery, useMeQuery } from "@/generated/graphql";
import { columns } from "@/lib/columns";
import { messagess } from "@/lib/data";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Lucide from "lucide-react";
import { useState } from "react";
import { z } from "zod";

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

  const dateSchema = z.coerce.date();
  const [searchField, setSearchField] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
              <div className="w-full flex items-end justify-between">
                <div className="flex gap-2 items-end ">
                  <div>
                    <label className="border p-3 flex flex-col gap-1 rounded">
                      <span className="flex justify-between">
                        <h4 className="text-xs font-semibold">Start Date</h4>
                        <button
                          onClick={() => setFromDate("")}
                          className={`${fromDate ? "opacity-100" : "opacity-0"}`}
                        >
                          <Lucide.X className="w-5 h-5 mr-1" />
                        </button>
                      </span>
                      <input
                        type="date"
                        value={fromDate.toString()}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="outline-none bg-transparent min-w-[150px]"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="border p-3 flex flex-col gap-1 rounded">
                      <span className="flex justify-between">
                        <h4 className="text-xs font-semibold">End Date</h4>
                        <button
                          onClick={() => setToDate("")}
                          className={`${toDate ? "opacity-100" : "opacity-0"}`}
                        >
                          <Lucide.X className="w-5 h-5 mr-1" />
                        </button>
                      </span>
                      <input
                        type="date"
                        value={toDate.toString()}
                        onChange={(e) => setToDate(e.target.value)}
                        className="outline-none bg-transparent min-w-[150px]"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setSearchField(e.target.value)}
                    value={searchField}
                    placeholder="Search for phone number or message"
                    className="border p-3 placeholder:font-semibold bg-transparent rounded outline-none focus:border-gray-700"
                  />
                </div>
                <button
                  onClick={() => refetchData()}
                  className="shadow-sm active:bg-card-foreground active:text-card shadow-primary p-3 rounded [&>*]:focus-within:animate-spin-once"
                >
                  <Lucide.RefreshCcw className="text-sm" />{" "}
                </button>
              </div>
              <DataTable
                columns={columns}
                data={data.GetAllSMS.filter(
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
                  })}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
