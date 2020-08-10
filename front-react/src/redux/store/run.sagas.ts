import { SagaMiddleware } from "redux-saga";

import {
    watchAddDoneTicket, watchAddFeeling, watchAddSubject, watchAddUnforeseenTicket,
    watchAnswerTeamInvite, watchCreateTeam, watchCreateUser, watchGetDaily, watchGetTimeline,
    watchGetUserTeams, watchInviteUserToTeam, watchLogin, watchRemoveDetails, watchRemoveTicket,
    watchRequestToJoinTeam, watchSetDailyDuration, watchSnackbar
} from "../sagas";

export const runSagas = (sagaMiddleware: SagaMiddleware<object>) => {
  sagaMiddleware.run(watchAddDoneTicket);
  sagaMiddleware.run(watchAddFeeling);
  sagaMiddleware.run(watchAddSubject);
  sagaMiddleware.run(watchAddUnforeseenTicket);
  sagaMiddleware.run(watchAnswerTeamInvite);
  sagaMiddleware.run(watchCreateTeam);
  sagaMiddleware.run(watchCreateUser);
  sagaMiddleware.run(watchGetDaily);
  sagaMiddleware.run(watchGetTimeline);
  sagaMiddleware.run(watchGetUserTeams);
  sagaMiddleware.run(watchInviteUserToTeam);
  sagaMiddleware.run(watchLogin);
  sagaMiddleware.run(watchRemoveDetails);
  sagaMiddleware.run(watchRemoveTicket);
  sagaMiddleware.run(watchRequestToJoinTeam);
  sagaMiddleware.run(watchSetDailyDuration);
  sagaMiddleware.run(watchSnackbar);
};
