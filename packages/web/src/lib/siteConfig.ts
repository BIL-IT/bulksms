import * as Lucide from "lucide-react";

export const siteConfig = {
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

  getFinalHeaders: () => {
    const list = [
      {
        title: "GENERAL",
        subHeader: [
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
        ],
      },
      {
        title: "SETTINGS",
        subHeader: [
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
        ],
      },
      {
        title: "DEMO",
        subHeader: [
          {
            title: "Messages",
            href: "/demo",
            Icon: Lucide.Monitor,
          },
        ],
      },
    ];

    return list;
  },

  getDepartmentList: () => {
    const list = [
      "Department",
      "Management",
      "CSPD",
      "Claims",
      "IT",
      "Company Secretary",
      "Underwriting",
      "Wangdue Branch",
      "p/Ling Branch",
      "Paro Branch",
      "Bumthang Extension Office",
      "Procurement",
      "Audit",
      "Finance and Investment",
      "ADM/HRD",
      "Re-insurance",
      "S/J extension",
      "Finance and Accounts",
      "Information Technology",
      "wangdue",
      "Paro",
      "p/ling",
      "Gelephu",
      "Finance &amp; Investment",
      "Finance &amp; Accounts",
      "Monger",
      "S/J",
    ];

    return list;
  },
};
