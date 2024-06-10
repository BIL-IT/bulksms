import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle as CheckCircledIcon,
  CircleIcon,
  CrosshairIcon as CrossCircledIcon,
  CircleDashed as QuestionMarkCircledIcon,
  WatchIcon as StopwatchIcon,
  MailCheck,
  Ban,
  TicketX,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    label: "Delivered",
    value: "1",
    icon: MailCheck,
  },
  {
    label: "Failed",
    value: "18",
    icon: Ban,
  },
  {
    label: "Invalid Format",
    value: "17",
    icon: TicketX,
  },
  // {
  //   value: "done",
  //   label: "Done",
  //   icon: CheckCircledIcon,
  // },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  //   icon: CrossCircledIcon,
  // },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
