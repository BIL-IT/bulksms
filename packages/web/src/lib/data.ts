type Message = {
  id: string;
  time: string;
  phone: string;
  content: string;
  status: string;
  type: string;
  branchCode: string;
  partyCode: string;
};

export const dummy_messages: Message[] = [
  {
    id: "1",
    time: "3:23 PM",
    phone: "(922) 9124442",
    content:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Success",
  },
  {
    id: "2",
    time: "8:04 AM",
    phone: "(157) 3503517",
    content:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Success",
  },
  {
    id: "3",
    time: "5:00 PM",
    phone: "(232) 7922039",
    content:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",

    branchCode: "",
    partyCode: "",
    type: "",
    status: "Pending",
  },
  {
    id: "4",
    time: "3:59 AM",
    phone: "(583) 1264028",
    content:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Pending",
  },
  {
    id: "5",
    time: "3:32 PM",
    phone: "(546) 4601536",
    content:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Success",
  },
  {
    id: "6",
    time: "9:09 AM",
    phone: "(916) 2695385",
    content:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Success",
  },
  {
    id: "7",
    time: "12:05 PM",
    phone: "(679) 1805911",
    content:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Success",
  },
  {
    id: "8",
    time: "5:31 PM",
    phone: "(605) 7514152",
    content:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    branchCode: "",
    partyCode: "",
    type: "",
    status: "Pending",
  },
  {
    id: "9",
    time: "3:18 PM",
    phone: "(465) 8701713",
    content:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",

    status: "Pending",
    branchCode: "",
    partyCode: "",
    type: "",
  },
  {
    id: "10",
    time: "10:21 PM",
    phone: "(176) 2927524",
    content:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",

    status: "Pending",
    branchCode: "",
    partyCode: "",
    type: "",
  },
];
