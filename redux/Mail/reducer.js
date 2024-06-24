import StorageService from "../../utils/storageService";
const INITIAL_STATE = {
  data: [],
};

const MailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEND":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export default MailReducer;
