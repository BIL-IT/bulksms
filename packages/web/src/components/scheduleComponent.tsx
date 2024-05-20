import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

const daysOfWeek = ["M", "T", "W", "Th", "F", "Sa", "Su"];

export default function ScheduleComponent({
  index,
  schedule,
  setSchedule,
}: {
  index: number;
  schedule: { days: string[] | undefined; time: string }[];
  //   schedule: React.SetStateAction<
  //   {
  //     time: string;
  //     days: string[] | undefined;
  //   }[]
  // >
  // setSchedule: React.Dispatch<
  //   React.SetStateAction<
  //     {
  //       time: string;
  //       days: string[] | undefined;
  //     }[]
  //   >
  // >;
  setSchedule: (
    schedule: { days: string[] | undefined; time: string }[]
  ) => void;
}) {
  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <div className="flex flex-1 justify-between openAnim">
      <input
        type="time"
        className="border bg-transparent py-3 px-5 outline-none rounded-md focus:border-black"
        value={schedule[index].time}
        // onChange={(e) => setLocalTime(e.target.value)}
        onChange={(e) => {
          let obj = [...schedule];
          obj[index].time = e.target.value;
          setSchedule(obj);
        }}
      />
      <ToggleGroup
        type="multiple"
        value={schedule[index].days}
        onValueChange={(e) => {
          const obj = [...schedule];
          obj[index].days = e;
          setSchedule(obj);
        }}
      >
        {daysOfWeek.map((day) => (
          <ToggleGroupItem key={day} value={day}>
            {day}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
