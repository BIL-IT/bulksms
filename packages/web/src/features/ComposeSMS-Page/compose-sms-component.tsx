import { ScheduleComponent } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useGetAllSmsQuery,
  useMeQuery,
  useSendSmsMutation,
} from "@/generated/graphql";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ComposeSmsComponent() {
  const [detail, setDetail] = useState({
    numbers: "",
    message: "",
    schedule: false,
  });

  const [schedule, setSchedule] = useState<
    { time: string; days: string[] | undefined }[]
  >([
    {
      time: "",
      days: [],
    },
  ]);

  const router = useRouter();

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery();

  const [sendSmsMutation, { loading: sendSmsLoading, error }] =
    useSendSmsMutation();
  const { refetch: AllSMSRefetch } = useGetAllSmsQuery();

  if (meLoading) return;

  if (meData?.Me === undefined) router.push("/login");

  function handleRemove(removeIndex: number) {
    setSchedule((prev) => {
      return prev.filter((_, i) => i !== removeIndex);
    });
  }

  function formHandler(event: React.FormEvent) {
    event.preventDefault();
    sendSmsMutation({
      variables: {
        messageInput: {
          phone: detail.numbers.split(","),
          content: detail.message,
        },
      },
    })
      .then(() => AllSMSRefetch())
      .then(() => router.push("/"));
  }

  return (
    meData && (
      <section className="flex justify-center flex-1 text-foreground">
        <form
          onSubmit={formHandler}
          className="w-full max-w-[1000px] min-h-[500px] my-5 h-fit shadow-lg border flex flex-col gap-5 border-[#CCC] rounded-md p-10"
        >
          <label className="flex flex-col gap-2">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger disabled>
                    <h3 className="text-lg font-semibold">Number(s) to send</h3>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Separate multiple numbers by a comma.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="text"
              onChange={(e) =>
                setDetail({ ...detail, numbers: e.target.value })
              }
              className="border rounded bg-transparent outline-none py-3 px-5 w-full border-[#CCC]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Message</h3>
            <textarea
              onChange={(e) =>
                setDetail({ ...detail, message: e.target.value })
              }
              className="border rounded bg-transparent outline-none py-3 px-5 w-full border-[#CCC] resize-y min-h-[200px]"
            />
          </label>

          <label className="flex gap-2 items-center w-fit">
            <Checkbox
              onCheckedChange={(e) =>
                setDetail({ ...detail, schedule: e as boolean })
              }
            />
            <h3 className="text-lg font-semibold">Add Scheduler?</h3>
          </label>

          {detail.schedule && (
            <div>
              <div className="flex flex-col gap-2">
                {schedule.map((item, index) => (
                  <span
                    key={index}
                    className={`flex items-center gap-2 ${index !== 0 && "border-t pt-2"}`}
                  >
                    <ScheduleComponent
                      schedule={schedule}
                      setSchedule={setSchedule}
                      index={index}
                    />
                    <Button onClick={() => handleRemove(index)} type="button">
                      X
                    </Button>
                  </span>
                ))}
              </div>
              <Button
                type="button"
                onClick={() =>
                  setSchedule([...schedule, { time: "", days: [] }])
                }
                className="w-full mt-2"
              >
                Add
              </Button>
            </div>
          )}

          <Button
            disabled={sendSmsLoading || !detail.numbers || !detail.message}
            className="mt-3 py-7"
          >
            Submit
          </Button>
        </form>
      </section>
    )
  );
}
