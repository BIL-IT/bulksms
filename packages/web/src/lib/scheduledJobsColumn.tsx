import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronUp as ArrowUp,
  CircleEllipsis,
  ShieldEllipsis,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduledJobs = {
  createdAt: string;
  to: string;
  message: string;
};

export const scheduledJobsCol: ColumnDef<ScheduledJobs>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell(props) {
      return new Date(props.getValue() as string).toString().split("GMT")[0];
    },
  },
  {
    accessorKey: "to",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "message",
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
      return (
        <div className="flex-1 w-[250px]">{props.getValue() as string}</div>
      );
    },
  },

  {
    accessorKey: "pdf",
    header: "Scheduled At",
    cell(props) {
      return <p>8:45am Everyday</p>;
    },
  },
  {
    accessorKey: "Menu",
    header: "",
    cell(props) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-red-400">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
