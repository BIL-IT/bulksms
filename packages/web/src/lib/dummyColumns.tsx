import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronUp as ArrowUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Message = {
  id: string;
  time: string;
  phone: string;
  type: string;
  branchCode: string;
  partyCode: string;
  content: string;
  status: string;
};

const dummy_cols: ColumnDef<Message>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: (props) => <Skeleton className="w-[50px] h-[30px] bg-gray-400" />,
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell(props) {
      return <Skeleton className="w-[100px] h-[30px] bg-gray-400" />;
    },
    enableHiding: false,
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
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell: () => <Skeleton className="w-[100px] h-[30px] bg-gray-400" />,
  },
  {
    accessorKey: "content",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message
          {/* {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null} */}
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell(props) {
      return <Skeleton className="w-full h-[50px] bg-gray-400" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {/* {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null} */}
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    cell(props) {
      return <Skeleton className="w-[100px] h-[30px] bg-gray-400" />;
    },
  },
  // {
  //   accessorKey: "pdf",
  //   header(props) {
  //     return;
  //   },
  //   cell(props) {
  //     return (
  //       <Button
  //         onClick={() => console.log(props.row.getVisibleCells()[0].getValue())}
  //       >
  //         Print PDF
  //       </Button>
  //     );
  //   },
  // },
];

export default dummy_cols;
