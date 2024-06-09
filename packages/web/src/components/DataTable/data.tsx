import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle as CheckCircledIcon,
  CircleIcon,
  CrosshairIcon as CrossCircledIcon,
  CircleDashed as QuestionMarkCircledIcon,
  WatchIcon as StopwatchIcon,
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
    value: "Final Test",
    label: "Final Test",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "RegEx Test 6",
    label: "RegEx Test 6",
    icon: CircleIcon,
  },
  {
    value: "RegEx Test 5",
    label: "RegEx Test 5",
    icon: StopwatchIcon,
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
