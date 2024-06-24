import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const OfferReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_OFFER":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "ACCEPT_OFFER":
      if (action.error) return state;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default OfferReducer;
