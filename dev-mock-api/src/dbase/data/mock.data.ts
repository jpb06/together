import { PersistedUser } from "../../types/persisted.user.type";
import { PersistedTeam } from "../../types/persisted.team.type";
import Daily from "../../types/daily.type";
import { SubjectType } from "../../types/subject.type";
import { FeelingType } from "../../types/feeling.type";

/* **********************************************************************************************
 * Users
 * ********************************************************************************************** */

const users: Array<PersistedUser> = [
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

/* **********************************************************************************************
 * Teams
 * ********************************************************************************************** */

const teams: Array<PersistedTeam> = [
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

/* **********************************************************************************************
 * Dailies
 * ********************************************************************************************** */

const dailies: Array<Daily> = [
  {
    id: "5e1062e442f4b52580b14a0c",
    teamId: "5d8b9a604ddbc1362cc540c8",
    day: 4,
    month: 0,
    year: 2020,
    durationIndicator: "",
    unforeseenTickets: [],
    doneTickets: [],
    subjects: [],
    feelings: [],
  },
  {
    id: "5dfd262818ee042de8a91231",
    teamId: "5d8b9a604ddbc1362cc540c8",
    day: 20,
    month: 11,
    year: 2019,
    durationIndicator: "20+",
    unforeseenTickets: [
      {
        id: "5e8e2995f942618b9574ffce",
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        name: "WEB-521",
      },
    ],
    doneTickets: [
      {
        id: "5e8e29a54bcfbd9d45bbf818",
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        assignee: {
          id: "5d99bdfc41d6a138089092b5",
          lastName: "BigDaddy",
          firstName: "Sarah",
          avatarName: "afrogeisha.jpg",
          email: "s.t@a.fr",
        },
        name: "WEB-21",
      },
      {
        id: "5e8e29adb04a40623277dc94",
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        assignee: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        name: "WHOOG-13",
      },
      {
        id: "5e8e29b67ba2adea09760382",
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        assignee: {
          id: "5d99bdfc41d6a138089092b5",
          lastName: "BigDaddy",
          firstName: "Sarah",
          avatarName: "afrogeisha.jpg",
          email: "s.t@a.fr",
        },
        name: "WRS-45",
      },
    ],
    subjects: [
      {
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        id: "5dfd264a18ee042de8a91232",
        type: SubjectType.Restraint,
        description: "yolo lolo jejejej",
      },
    ],
    feelings: [
      {
        creator: {
          id: "5d8b9a68f9aa620de70f6ff9",
          lastName: "Superman",
          firstName: "Charles-Edouard",
          avatarName: "6SLWt.gif",
          email: "jpb.06@outlook.fr",
        },
        id: "5dfd265018ee042de8a91233",
        type: FeelingType.ThumbDown,
        comment: "kappa",
      },
    ],
  },
];

export { users, teams, dailies };
