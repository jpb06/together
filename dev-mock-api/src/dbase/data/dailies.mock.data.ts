import { SubjectType } from "../../types/subject.type";
import { FeelingType } from "../../types/feeling.type";
import Daily from "../../types/daily.type";

export const dailies: Array<Daily> = [
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
