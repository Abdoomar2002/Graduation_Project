import * as helpers from "./helpers";
import UploadFilesEndPoints from "./uploadFiles.api";

const Api = {
  ...helpers,
  lookUps: LookupsApiEndpoints,
  uploadFiles: UploadFilesEndPoints,
  reports: ReportsApiEndpoints,
};

export default Api;
