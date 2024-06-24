import HttpHelpers from "./helpers";
const appApi = {
  Comment: {
    getAllComment: async () => {
      const response = await HttpHelpers.authenticatedAxios.get(
        "comment/delivery"
      );
      return response?.data;
    },
    getComment: async (id) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `comment/${id}`
      );
      return response?.data;
    },
  },
  ContactMail: {
    sendEmail: async (MailData) => {
      const response = await HttpHelpers.authenticatedAxios.post(
        "ContactMail/contact",
        MailData
      );
      return response?.data;
    },
  },
  User: {
    login: async (loginData) => {
      const response = await HttpHelpers.unAuthenticatedAxios.post(
        "UserAccount/login",
        loginData
      );
      return response?.data;
    },
    SignUp: async (signUpData) => {
      const response = await HttpHelpers.unAuthenticatedAxios
        .post("UserAccount/register", signUpData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((err) => console.log(err.message, " here i am"));
      return response?.data;
    },
    logout: async () => {
      const response = await HttpHelpers.authenticatedAxios.get(
        "UserAccount/logout"
      );
      return response?.data;
    },
    upload: async (data) => {
      const response = await HttpHelpers.authenticatedAxios.post(
        "User/uploadImage",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    },
    forgetPassword: async (email) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `UserAccount/forget?mail=${email}`
      );
      return response?.data;
    },
    displayProfile: async () => {
      const response = await HttpHelpers.authenticatedAxios.get("User/profile");
      return response?.data;
    },
    editProfile: async (id, profileData) => {
      const response = await HttpHelpers.authenticatedAxios.put(
        `User/${id}`,
        profileData
      );
      return response?.data;
    },
    deleteProfile: async (id) => {
      const response = await HttpHelpers.authenticatedAxios.delete(
        `User/${id}`
      );
      return response?.data;
    },
  },
  Governate: {
    displayAll: async () => {
      const response = await HttpHelpers.unAuthenticatedAxios.get(
        "Governorate"
      );
      return response?.data;
    },
    display: async (id) => {
      const response = await HttpHelpers.unAuthenticatedAxios.get(
        `Governorate/${id}`
      );
      return response?.data;
    },
  },
  Mail: {
    sendMail: async (data) => {
      const response = await HttpHelpers.authenticatedAxios.post(
        `Mailing/send`,
        data
      );
      return response?.data;
    },
  },
  Offer: {
    getOffer: async (orderId) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `/Offer/view/${orderId}`
      );
      return response?.data;
    },
    deliveryAcceptOffer: async (orderId) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `Offer/Delivery/Accept?orderid=${orderId}`
      );
      return response?.data;
    },
  },
  Order: {
    displayRelatedOrders: async () => {
      const response = await HttpHelpers.authenticatedAxios.get(
        "Order/related/orders"
      );
      return response?.data;
    },
    postOrder: async (data) => {
      const response = await HttpHelpers.authenticatedAxios.post("Order", data);
      return response?.data;
    },
    getAllForDelivery: async () => {
      const response = await HttpHelpers.authenticatedAxios.get("Order/Orders");
      return response?.data;
    },
    getOrder: async (id) => {
      const response = await HttpHelpers.authenticatedAxios.get(`Order/${id}`);
      return response?.data;
    },
    reOrder: async (orderId) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `Order/ReOrder/${orderId}`
      );
      return response?.data;
    },
  },
  Rating: {
    getAll: async () => {
      const response = await HttpHelpers.authenticatedAxios.get(
        "Rating/Ratings"
      );
      return response?.data;
    },
    getLast5: async (id) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `Rating/last5Ratings${id}`
      );
      return response?.data;
    },
    getRate: async (id) => {
      const response = await HttpHelpers.authenticatedAxios.get(`Rating/${id}`);
      return response?.data;
    },
    addRating: async (rate, orderId) => {
      const response = await HttpHelpers.authenticatedAxios.post(
        `Rating?value=${rate}&orderid=${orderId}`
      );
      return response?.data;
    },
    editRating: async (rate, orderId) => {
      const response = await HttpHelpers.authenticatedAxios.put(
        `Rating/${orderId}/${rate}`
      );
      return response?.data;
    },
    deleteRating: async (orderId) => {
      const response = await HttpHelpers.authenticatedAxios.delete(
        `Rating/${orderId}`
      );
      return response?.data;
    },
  },
  Tracking: {
    getAll: async () => {
      const response = await HttpHelpers.authenticatedAxios.get("/Traking");
      return response?.data;
    },
    UpdateStatus: async (orderId) => {
      const response = await HttpHelpers.authenticatedAxios.get(
        `Traking/${orderId}`
      );
      return response?.data;
    },
  },
  Zone: {
    displayAll: async () => {
      const response = await HttpHelpers.unAuthenticatedAxios.get("Zone");
      return response?.data;
    },
    display: async (id) => {
      const response = await HttpHelpers.unAuthenticatedAxios.get(`Zone/${id}`);
      return response?.data;
    },
  },
};

export default appApi;
