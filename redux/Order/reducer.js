const INITIAL_STATE = {
  orders: [],
  orderDetails: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DISPLAY_RELATED_ORDERS":
      if (action.error) return state;
      return {
        ...state,
        orders: action.data,
      };
    case "GET_ALL_FOR_USER_OR_DELIVERY":
      if (action.error) return state;
      return {
        ...state,
        orders: action.data,
      };
    case "GET_ORDER":
      if (action.error) return state;
      return {
        ...state,
        orderDetails: action.data,
      };
    case "RE_ORDER":
      if (action.error) return state;
      return {
        ...state,
        orderDetails: action.data,
      };
    default:
      return state;
  }
};

export default orderReducer;
