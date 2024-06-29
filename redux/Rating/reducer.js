import { date } from "yup";
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
        data: action.data,
      };
    case "GET_RATE":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "ADD_RATE":
      if (action.error) return state;
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case "UPDATE_RATE":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "DELETE_RATE":
      if (action.error) return state;
      return {
        ...state,
        date: action.data,
      };

    default:
      return state;
  }
};

export default rateReducer;
