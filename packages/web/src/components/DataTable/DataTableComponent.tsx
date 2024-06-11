import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedUniqueValues,
  getFacetedRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import * as Lucide from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  searchField: string;
  setSearchField: (searchField: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  searchField,
  setSearchField,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full flex-grow-0 grid gap-2 relative">
      <div className="flex text-black gap-2 items-end ">
        <div className="">
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
          className="border-2 px-3 py-2 placeholder:font-semibold bg-transparent rounded outline-none focus:border-primary"
        />
        <DataTableToolbar table={table} />
      </div>

      <div className="rounded-md border text-black">
        <Table className="">
          <TableHeader className="bg-background ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black font-mono bg-secondary select-none font-semibold text-base"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-[400px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          className="text-customBlack"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="text-customBlack"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
      <div className="mt-3 text-black">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
