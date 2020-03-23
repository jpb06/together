import { AxiosInstance } from "axios";
import { History, LocationState } from "history";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";

const setInterceptors = (
  instance: AxiosInstance,
  history: History<LocationState>
) => {
  instance.interceptors.request.use(
    function(config) {
      const token = localStorage.get(LocalStorageKeys.token);
      const expiration = localStorage.get(LocalStorageKeys.expiration);
      if (!token || !expiration) {
        localStorage.clear();
        history.push({
          pathname: "/"
        });
        return Promise.reject("not logged");
      } else {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    function(error) {
      // Do something with request error

      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        if (error.response.status === 401) {
          localStorage.clear();
          history.push({
            pathname: "/"
          });
        }

        return Promise.resolve(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        return Promise.resolve(undefined);
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject(error);
      }
    }
  );
};
export default setInterceptors;
