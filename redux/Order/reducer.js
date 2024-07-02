const INITIAL_STATE = {
  orders: [],
  orderDetails: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL":
      if (action.error) return state;
      return {
        ...state,
        orders: action.data,
      };
    case "GET_ALL_DELIVERIES":
      if (action.error) return state;
      return {
        ...state,
        orders: action.data,
      };
    case "POST_ORDER":
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
