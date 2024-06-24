import StorageService from "../../utils/storageService";
import localStorageProvider from "../../utils/localStorageProvider";
const INITIAL_STATE = {
  isAuth: localStorageProvider.get("isAuth") === "true" ? true : false,
  userData: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log(action.data.token, "hello world");
      StorageService.set("Token", action.data.token);
      // StorageService.set("userId", action.data.Data.UserId);
      StorageService.set("isAuth", "true");
      //StorageService.set("userData", action.data);
      if (action.error) return state;
      return {
        ...state,
        isAuth: true,
        userData: action.data,
      };
    case "SIGNUP":
      if (action.error) return state;
      return {
        ...state,
        isAuth: true,
        userData: action.data,
      };
    case "LOGOUT":
      StorageService.remove("Token", null);
      StorageService.remove("userId", null);
      StorageService.remove("isAuth", false);
      StorageService.remove("userData", {});
      if (action.error) return state;
      return {
        ...state,
        isAuth: false,
        userData: null,
      };
    case "FORGET":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "GET_PROFILE":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "EDIT_PROFILE":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "DELETE_PROFILE":
      if (action.error) return state;
      StorageService.remove("Token", null);
      StorageService.remove("userId", null);
      StorageService.remove("isAuth", false);
      StorageService.remove("userData", {});
      return {
        ...state,
        data: action.data,
      };
    case "UPLOAD": {
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
