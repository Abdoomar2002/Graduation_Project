import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const trackingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL":
      if (action.error) return state;
      const data =
        action.data != null
          ? action.data.filter((elem) => elem.status != 3)
          : null;
      return {
        ...state,
        data,
      };

    case "EDIT_STATUS":
      if (action.error) return state;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default trackingReducer;
