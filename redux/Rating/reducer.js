import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const rateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "GET_LAST_5":
      if (action.error) return state;
      return {
        ...state,
      };
    case "GET_RATE":
      if (action.error) return state;
      return {
        ...state,
      };
    case "ADD_RATE":
      if (action.error) return state;
      return {
        ...state,
      };
    case "UPDATE_RATE":
      if (action.error) return state;
      return {
        ...state,
      };
    case "DELETE_RATE":
      if (action.error) return state;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rateReducer;
