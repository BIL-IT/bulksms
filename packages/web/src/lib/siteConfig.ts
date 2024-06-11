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
        title: "TashiCell Outgoing",
        href: "/tcell-outgoing",
        Icon: Lucide.Type,
      },
      {
        title: "B-Mobile Outgoing",
        href: "/bmobile-outgoing",
        Icon: Lucide.Bold,
      },
      {
        title: "Compose SMS",
        href: "/compose-sms",
        Icon: Lucide.MailPlus,
      },
      {
        title: "Schedule Message",
        href: "/scheduled-messages",
        Icon: Lucide.CalendarCheck,
      },
    ];
    return list;
  },

  getNewSecondaryHeaders: () => {
    const list = [
      {
        title: "Change Password",
        href: "/change-password",
        Icon: Lucide.Cog,
      },
      {
        title: "Add User",
        href: "/add-user",
        Icon: Lucide.UserPlus,
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
