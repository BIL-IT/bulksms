import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronUp as ArrowUp,
  CircleEllipsis,
  ShieldEllipsis,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  useDeleteJobMutation,
  useScheduledJobsQuery,
  useUpdateJobMutation,
} from "@/generated/graphql";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduledJobs = {
  createdAt: string;
  to: string;
  message: string;
};

export const scheduledJobsCol: ColumnDef<ScheduledJobs>[] = [
  {
    accessorKey: "id",
    header: "Index",
    cell: (props) => {
      return props.row.index + 1;
    },
  },
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
    cell: function CellComponent(props) {
      const updateFieldSchema = z.object({
        phoneNumber: z.string().min(1),
        messages: z.string().min(1),
      });
      const [deleteJobMutation, { data, loading, error }] =
        useDeleteJobMutation();

      const [updateJobMutation] = useUpdateJobMutation();

      const { register, handleSubmit, watch, getValues } = useForm<
        z.infer<typeof updateFieldSchema>
      >({
        resolver: zodResolver(updateFieldSchema),
        defaultValues: {
          messages: props.row.getVisibleCells()[3].getValue() as string,
          phoneNumber: props.row.getVisibleCells()[2].getValue() as string,
        },
      });

      watch();

      const { refetch } = useScheduledJobsQuery();

      const { toast } = useToast();

      async function onSubmit(data: z.infer<typeof updateFieldSchema>) {
        try {
          console.log(props.row.getVisibleCells()[0].getValue() as string);
          await updateJobMutation({
            variables: {
              cronJobNewFielUpdateInput: {
                id: props.row.getVisibleCells()[0].getValue() as string,
                message: data.messages,
                to: data.phoneNumber,
              },
            },
          }).then(async () => {
            await refetch();
            // toast({}, {});
            toast({
              title: "Message Scheduler",
              description: "Successfully Updated",
              variant: "default",
            });
          });
        } catch (error) {
          console.log(error);
          toast({
            title: "Message Scheduler Error",
            description: "Please try again later",
            variant: "destructive",
          });
        }
      }

      return (
        <div className="flex gap-2">
          <Dialog key={1}>
            <DialogTrigger
              className="border px-5 rounded border-black"
              key={1}
              type="button"
            >
              Edit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
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
          <Button
            onClick={() =>
              deleteJobMutation({
                variables: {
                  id: props.row.getVisibleCells()[0].getValue() as string,
                },
              }).then(async () => {
                await refetch();
              })
            }
            disabled={loading}
            variant={"destructive"}
          >
            X
          </Button>
        </div>
      );
    },
  },
];
