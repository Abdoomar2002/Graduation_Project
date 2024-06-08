import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const GovernateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DISPLAY_ALL_GOVERNORATES":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "DISPLAY_GOVERNORATE":
      if (action.error) return state;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default GovernateReducer;
