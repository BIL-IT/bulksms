import { useKannelReportQuery } from "@/generated/graphql";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StatusComponent() {
  const { data, loading, error } = useKannelReportQuery({
    pollInterval: 3000,
  });

  return (
    <div className="border grid gap-1 border-black py-1.5 px-3 z-50 absolute top-0 right-0 mt-5 mr-10">
      <div className="flex items-center gap-2">
        <div
          className={`w-[10px] h-[10px] rounded-full ${data?.getReport.bearerBoxReport ? "bg-green-500" : "bg-red-500"}`}
        />
        <Link
          prefetch={false}
          href="http://172.16.16.108:13000/status"
          className="text-xs w-fit h-fit"
          target="_blank"
        >
          Kannel Status
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-[10px] h-[10px] rounded-full ${data?.getReport.sMSBoxReport ? "bg-green-500" : "bg-red-500"}`}
        />
        <h3 className="text-xs w-fit h-fit">SMS Box Status</h3>
      </div>
    </div>
  );
}
