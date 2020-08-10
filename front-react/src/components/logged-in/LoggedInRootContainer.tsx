import * as localStore from "local-storage";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Grid, LinearProgress } from "@material-ui/core";

import TogetherApi from "../../api/setup/together.api";
import { useRootSelector } from "../../hooks";
import LocalStorageKeys from "../../logic/local.storage.keys";
import { isAppBusyIn } from "../../redux/selectors";
import { ReduxActionContext as Context } from "../../types/redux";
import styles from "./LoggedInRootContainer.styles";
import TopMenu from "./menu/TopMenu";

interface LoggedInRootContainerProps {
  Component: React.ElementType;
}

const LoggedInRootContainer: React.FC<LoggedInRootContainerProps> = ({
  Component,
  ...rest
}) => {
  const classes = styles();
  const history = useHistory();

  const isLoading = useRootSelector(isAppBusyIn(Context.Global));
  const [isReady, setIsReady] = useState(false);

  // This will trigger everytime a navigation occurs
  useEffect(() => {
    TogetherApi.setup(history);

    const token = localStore.get(LocalStorageKeys.token);
    const expirationDate = localStore.get<string>(LocalStorageKeys.expiration);
    if (!token || !expirationDate || Date.parse(expirationDate) < Date.now()) {
      localStore.clear();
      history.push({
        pathname: "/",
      });
    }

    setIsReady(true);
  }, [history]);

  if (!isReady) return null;

  return (
    <>
      <TopMenu />
      {isLoading && <LinearProgress />}
      <section className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.fixedWidth}
          >
            <Component {...rest} />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default LoggedInRootContainer;
