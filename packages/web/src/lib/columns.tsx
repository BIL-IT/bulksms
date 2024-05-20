import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Message = {
  id: string;
  time: string;
  phone: string;
  content: string;
  status: string;
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null}
        </div>
      );
    },
    cell(props) {
      return new Date(props.getValue() as string).toString().split("GMT")[0];
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Content
          {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null}
        </div>
      );
    },
    cell(props) {
      return (
        <div className="flex-1 w-[500px]">{props.getValue() as string}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "pdf",
    header(props) {
      return;
    },
    cell(props) {
      return (
        <Button
          onClick={() => console.log(props.row.getVisibleCells()[0].getValue())}
        >
          Print PDF
        </Button>
      );
    },
  },
];
