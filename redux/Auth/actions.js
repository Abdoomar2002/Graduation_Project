import Api from "../../services";

const actions = {
  login: (data) => {
    return (dispatch) => {
      return Api.app.User.login(data).then((response) => {
        dispatch({
          type: "LOGIN",
          data: response,
        });
        return response;
      });
    };
  },
  uploadImage: (data) => {
    return (dispatch) => {
      return Api.app.User.upload(data).then((response) => {
        dispatch({
          type: "UPLOAD",
          data: response,
        });
        return response;
      });
    };
  },
  signUp: (data) => {
    return (dispatch) => {
      //console.log(data);
      return Api.app.User.SignUp(data).then((response) => {
        dispatch({
          type: "SIGNUP",
          data: response,
        });
        return response;
      });
    };
  },
  logout: () => {
    return (dispatch) => {
      return Api.app.User.logout().then((response) => {
        dispatch({
          type: "LOGOUT",
          data: response,
        });
        return response;
      });
    };
  },
  forgetPassword: (email) => {
    return (dispatch) => {
      return Api.app.User.forgetPassword(email).then((response) => {
        dispatch({
          type: "FORGET_PASSWORD",
          data: response,
        });
        return response;
      });
    };
  },
  displayProfile: () => {
    return (dispatch) => {
      return Api.app.User.displayProfile().then((response) => {
        dispatch({
          type: "GET_PROFILE",
          data: response,
        });
        return response;
      });
    };
  },
  editProfile: (id, profileData) => {
    return (dispatch) => {
      return Api.app.User.editProfile(id, profileData).then((response) => {
        dispatch({
          type: "EDIT_PROFILE",
          data: response,
        });
        return response;
      });
    };
  },
  deleteProfile: (id) => {
    return (dispatch) => {
      return Api.app.User.deleteProfile(id).then((response) => {
        dispatch({
          type: "DELETE_PROFILE",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
