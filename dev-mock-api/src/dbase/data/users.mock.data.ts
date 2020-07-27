import { PersistedUser } from "../../../../shared/types";

export const users: Array<PersistedUser> = [
  {
    id: "5d8b9a68f9aa620de70f6ff9",
    email: "jpb.06@outlook.fr",
    avatarName: "6SLWt.gif",
    firstName: "Charles-Edouard",
    lastName: "Superman",
    password: "123",
    teams: [
      {
        id: "5d8b9a604ddbc1362cc540c8",
        name: "Whoog",
      },
    ],
    teamInvites: [
      {
        id: "ff8b9a604ddbc1362cc540c9",
        date: "2020-03-03T04:59:00.000+00:00",
        team: { id: "5d8b9a604ddbc1362cc540c9", name: "Super cool team" },
        referrer: {
          id: "5d99bdfc41d6a138089092c7",
          email: "yolo@bro.com",
          avatarName: "6Tbz0.gif",
          firstName: "Christophe",
          lastName: "Ultraman",
        },
      },
    ],
    teamJoinRequests: [
      {
        id: "ee8b9a604ddbc1362cc540c9",
        date: "2020-03-02T04:59:00.000+00:00",
        team: { id: "5d8b9a604ddbc1362cc54023", name: "The great team" },
      },
    ],
  },
  {
    id: "5d99bdfc41d6a138089092b5",
    email: "s.t@a.fr",
    avatarName: "afrogeisha.jpg",
    firstName: "Sarah",
    lastName: "BigDaddy",
    password: "456",
    teams: [
      {
        id: "5d8b9a604ddbc1362cc540c8",
        name: "Whoog",
      },
    ],
    teamInvites: [],
    teamJoinRequests: [
      {
        id: "aa8b9a604ddbc1362cc540c9",
        date: "2020-02-25T08:59:00.000+00:00",
        team: { id: "5d8b9a604ddbc1362cc540c8", name: "Whoog" },
      },
    ],
  },
  {
    id: "5d99bdfc41d6a138089092c7",
    email: "yolo@bro.com",
    avatarName: "6Tbz0.gif",
    firstName: "Christophe",
    lastName: "Ultraman",
    password: "123",
    teams: [
      {
        id: "5d8b9a604ddbc1362cc540c9",
        name: "Super cool team",
      },
    ],
    teamInvites: [],
    teamJoinRequests: [],
  },
  {
    id: "5d99bdfc41d6a138089092d1",
    email: "ben@together.com",
    avatarName: "ben.jpg",
    firstName: "Ben",
    lastName: "McCool",
    password: "123",
    teams: [
      {
        id: "5d8b9a604ddbc1362cc540c9",
        name: "Super cool team",
      },
    ],
    teamInvites: [],
    teamJoinRequests: [],
  },
];
