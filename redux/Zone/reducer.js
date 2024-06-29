import { date } from "yup";
import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const zoneReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "GET_ZONE":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "GET_ZONE_BY_GOVERNATE_ID":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export default zoneReducer;
