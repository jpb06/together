import configureDevStore from "./configure.store.dev";
import configureProdStore from "./configure.store.prod";

let store: any;
if (process.env.NODE_ENV === "production") {
  store = configureProdStore;
} else {
  store = configureDevStore;
}

export default store;
