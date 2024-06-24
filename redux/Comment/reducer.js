const INITIAL_STATE = {
  data: [],
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENT":
      if (action.error) return state;
      return {
        ...state,
        data: action.data,
      };
    case "GET_ALL":
      if (action.error) return state;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default commentReducer;
