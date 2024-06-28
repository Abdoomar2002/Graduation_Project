import * as helpers from "./helpers";

import appApi from "./appApi";

const Api = {
  ...helpers,
  app: appApi,
};

export default Api;
