import * as helpers from "./helpers";
<<<<<<< HEAD

import appApi from "./appApi";

const Api = {
  ...helpers,
  app: appApi,
=======
import UploadFilesEndPoints from "./uploadFiles.api";

const Api = {
  ...helpers,
  lookUps: LookupsApiEndpoints,
  uploadFiles: UploadFilesEndPoints,
  reports: ReportsApiEndpoints,
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
};

export default Api;
