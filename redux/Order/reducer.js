const INITIAL_STATE = {
  orders: [],
  orderDetails: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DISPLAY_RELATED_ORDERS":
      if (action.error) return state;
      const sortedOrders = action.data.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      return {
        ...state,
        orders: sortedOrders,
      };
    case "DISPLAY_UNRELATED_ORDERS":
      if (action.error) return state;
      const sortedUnOrders = action.data.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      return {
        ...state,
        orders: sortedUnOrders,
      };
    case "GET_ALL_FOR_USER_OR_DELIVERY":
      if (action.error) return state;
      const data = action.data.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      return {
        ...state,
        orders: data,
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
