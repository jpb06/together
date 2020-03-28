import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TogetherApi from "../../api/setup/together.api";
import styles from "./LoggedInRootContainer.styles";
import { LinearProgress, Grid } from "@material-ui/core";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import TopMenu from "./menu/TopMenu";
import { useReduxSelector } from "../../hooks/redux.hooks";

interface LoggedInRootContainerProps {
  Component: React.ElementType;
}

const LoggedInRootContainer: React.FC<LoggedInRootContainerProps> = ({
  Component,
  ...rest
}) => {
  const isLoading = useReduxSelector(state => state.apiCallsInProgress > 0);
  const history = useHistory();
  const classes = styles();

  const [isReady, setIsReady] = useState(false);

  // This will trigger everytime a navigation occurs
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('/static/images/patterns/hex.jpg')";
    document.body.style.backgroundRepeat = "repeat";

    TogetherApi.setup(history);

    const token = localStorage.get(LocalStorageKeys.token);
    let expirationDate = localStorage.get<string>(LocalStorageKeys.expiration);
    if (!token || !expirationDate || Date.parse(expirationDate) < Date.now()) {
      localStorage.clear();
      history.push({
        pathname: "/"
      });
    }

    setIsReady(true);
  }, [history]);

  return (
    <div>
      <TopMenu />
      {isLoading && <LinearProgress />}
      <section className={classes.root}>
        {isReady && (
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
        )}
      </section>
    </div>
  );
};

export default LoggedInRootContainer;
