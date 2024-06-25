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
  TicketSlash,
  TicketMinus,
  CircleDashed,
  HistoryIcon,
  ReceiptTextIcon,
  HandCoinsIcon,
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
    value: "Delivered",
    icon: MailCheck,
  },
  {
    label: "Failed",
    value: "Failed",
    icon: Ban,
  },
  {
    label: "Invalid Format",
    value: "Invalid Format",
    icon: TicketX,
  },
  {
    label: "Non-Delivered to Phone",
    value: "Non-Delivered to Phone",
    icon: TicketSlash,
  },
  {
    label: "Non-Delivered to SMSC",
    value: "Non-Delivered to SMSC",
    icon: TicketMinus,
  },
  {
    label: "Queued on SMSC",
    value: "Queued on SMSC",
    icon: CircleDashed,
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

export const types = [
  {
    label: "All",
    value: "All",
    icon: ReceiptTextIcon,
  },
  {
    label: "Loan",
    value: "Loan",
    icon: HandCoinsIcon,
  },
  {
    label: "Renewal",
    value: "Renewal",
    icon: HistoryIcon,
  },
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
