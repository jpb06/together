import { TimeLineEntryKind } from "../../stack-shared-code/types";
import { dailyMockData } from "./daily.mock.data";

export const timelineDailyMockData = {
  type: TimeLineEntryKind.Daily,
  shortTitle: "Daily - 01/01/2000",
  date: new Date().toISOString(),
  entry: dailyMockData,
};
