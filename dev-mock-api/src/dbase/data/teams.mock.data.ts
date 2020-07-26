import { Team } from "../../../../shared/types/interfaces/team.interfaces";

export const teams: Array<Team> = [
  {
    id: "5d8b9a604ddbc1362cc540c8",
    name: "Whoog",
    members: [
      {
        id: "5d8b9a68f9aa620de70f6ff9",
        email: "jpb.06@outlook.fr",
        avatarName: "6SLWt.gif",
        firstName: "Charles-Edouard",
        lastName: "Superman",
        status: "creator",
        joinDate: "2018-12-31T23:00:00.000+00:00",
      },
      {
        id: "5d99bdfc41d6a138089092b5",
        email: "s.t@a.fr",
        avatarName: "afrogeisha.jpg",
        firstName: "Sarah",
        lastName: "BigDaddy",
        status: "member",
        joinDate: "2019-02-01T00:00:00.000+00:00",
      },
    ],
    invitedUsers: [],
    joinRequests: [
      {
        id: "aa8b9a604ddbc1362cc540c9",
        date: "2020-02-25T08:59:00.000+00:00",
        user: {
          id: "5d99bdfc41d6a138089092c7",
          email: "yolo@bro.com",
          avatarName: "6Tbz0.gif",
          firstName: "Christophe",
          lastName: "Ultraman",
        },
      },
    ],
  },
  {
    id: "5d8b9a604ddbc1362cc540c9",
    name: "Super cool team",
    members: [
      {
        id: "5d99bdfc41d6a138089092c7",
        email: "yolo@bro.com",
        avatarName: "6Tbz0.gif",
        firstName: "Christophe",
        lastName: "Ultraman",
        status: "creator",
        joinDate: "2018-12-31T23:00:00.000+00:00",
      },
    ],
    invitedUsers: [
      {
        id: "ff8b9a604ddbc1362cc540c9",
        date: "2020-03-03T04:59:00.000+00:00",
        referrer: {
          id: "5d99bdfc41d6a138089092c7",
          email: "yolo@bro.com",
          avatarName: "6Tbz0.gif",
          firstName: "Christophe",
          lastName: "Ultraman",
        },
        invitee: {
          id: "5d8b9a68f9aa620de70f6ff9",
          email: "jpb.06@outlook.fr",
          avatarName: "6SLWt.gif",
          firstName: "Charles-Edouard",
          lastName: "Superman",
        },
      },
    ],
    joinRequests: [],
  },
  {
    id: "5d8b9a604ddbc1362cc54023",
    name: "The great team",
    members: [
      {
        id: "5d99bdfc41d6a138089092d1",
        email: "ben@together.com",
        avatarName: "ben.jpg",
        firstName: "Ben",
        lastName: "McCool",
        status: "creator",
        joinDate: "2018-12-31T23:00:00.000+00:00",
      },
    ],
    invitedUsers: [],
    joinRequests: [
      {
        id: "ee8b9a604ddbc1362cc540c9",
        date: "2020-03-02T04:59:00.000+00:00",
        user: {
          id: "5d8b9a68f9aa620de70f6ff9",
          email: "jpb.06@outlook.fr",
          avatarName: "6SLWt.gif",
          firstName: "Charles-Edouard",
          lastName: "Superman",
        },
      },
    ],
  },
];
