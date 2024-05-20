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

  getSecondaryHeaders: () => {
    const list = [
      {
        title: "Incoming SMS",
        // href: "incoming-sms",
        href: "/",
      },
      {
        title: "Incoming SMS TCell",
        // href: "incoming-sms-tcell",
        href: "/",
      },
      {
        title: "Outgoing SMS",
        // href: "outgoing-sms",
        href: "/",
      },
      {
        title: "Outgoing SMS TCell",
        // href: "outgoing-sms-tcell",
        href: "/",
      },
      {
        title: "BIL Employee SMS",
        // href: "bil-employee-sms",
        href: "/",
      },
      {
        title: "Compose SMS",
        href: "compose-sms",
      },
    ];

    return list;
  },
};
