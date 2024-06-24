import HttpHelpers from "./helpers";

const UploadFilesEndPoints = {
  uploadImage: (formData) => {
    return HttpHelpers.authenticatedAxios
<<<<<<< HEAD
      .post(`Upload-image`, formData, {
=======
      .post(`lookups/UploadLookupImage/Upload-image`, formData, {
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
        headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data", // Important: Set the correct content type
        },
      })
      .then((response) => response.data);
  },
};

export default UploadFilesEndPoints;
