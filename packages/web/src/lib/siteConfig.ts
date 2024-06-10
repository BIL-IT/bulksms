import * as Lucide from "lucide-react";

export const siteConfig = {
  getHeaders: () => {
    const list = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Change Password",
        href: "/change-password",
      },
      {
        title: "Add User",
        href: "/add-user",
      },
      {
        title: "BIL Employee Details",
        href: "/employee-details",
      },
      {
        title: "Reports",
        href: "/reports",
      },
    ];

    return list;
  },

  getNewHeaders: () => {
    const list = [
      {
        title: "Home",
        href: "/",
        Icon: Lucide.Home,
      },
      {
        title: "Compose SMS",
        href: "/compose-sms",
        Icon: Lucide.MailPlus,
      },
      {
        title: "Schedule Message",
        href: "/schedule-messages",
        Icon: Lucide.CalendarCheck,
      },
    ];
    return list;
  },

  getSecondaryHeaders: () => {
    const list = [
      {
        title: "Outgoing SMS",
        // href: "outgoing-sms",
        href: "/",
      },
      {
        title: "Outgoing SMS B-Mobile",
        // href: "outgoing-sms",
        href: "/bmobile-outgoing",
      },
      {
        title: "Outgoing SMS TashiCell",
        // href: "outgoing-sms-tcell",
        href: "/tcell-outgoing",
      },
      {
        title: "Compose SMS",
        href: "/compose-sms",
      },
      {
        title: "Scheduled Messages",
        href: "/scheduled-messages",
      },
    ];

    return list;
  },
};
