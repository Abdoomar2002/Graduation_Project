import HttpHelpers from "./helpers";

const UploadFilesEndPoints = {
  uploadImage: (formData) => {
    return HttpHelpers.authenticatedAxios
      .post(`Upload-image`, formData, {
        headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data", // Important: Set the correct content type
        },
      })
      .then((response) => response.data);
  },
};

export default UploadFilesEndPoints;
