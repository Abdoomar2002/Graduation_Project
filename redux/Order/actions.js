import Api from "../../services";

const actions = {
  displayRelatedOrders: () => {
    return (dispatch) => {
      return Api.app.Order.displayRelatedOrders()
        .then((response) => {
          dispatch({
            type: "DISPLAY_RELATED_ORDERS",
            data: response,
          });
          return response;
        })
        .catch((error) => {
          dispatch({
            type: "DISPLAY_RELATED_ORDERS",
            error: true,
          });
        });
    };
  },
  getAllForUserOrDelivery: () => {
    return (dispatch) => {
      return Api.app.Order.getAllForUserOrDelivery()
        .then((response) => {
          dispatch({
            type: "GET_ALL_FOR_USER_OR_DELIVERY",
            data: response,
          });
          return response;
        })
        .catch((error) => {
          dispatch({
            type: "GET_ALL_FOR_USER_OR_DELIVERY",
            error: true,
          });
        });
    };
  },
  postOrder: (data) => {
    return (dispatch) => {
      return Api.app.Order.postOrder(data)
        .then((response) => {
          dispatch({
            type: "POST_ORDER",
            data: response,
          });

          return response;
        })
        .catch((error) => {
          dispatch({
            type: "POST_ORDER",
            error: true,
          });
        });
    };
  },
  getOrder: (id) => {
    return (dispatch) => {
      return Api.app.Order.getOrder(id)
        .then((response) => {
          dispatch({
            type: "GET_ORDER",
            data: response,
          });
          return response;
        })
        .catch((error) => {
          dispatch({
            type: "GET_ORDER",
            error: true,
          });
        });
    };
  },
  reOrder: (orderId) => {
    return (dispatch) => {
      return Api.app.Order.reOrder(orderId)
        .then((response) => {
          dispatch({
            type: "RE_ORDER",
            data: response,
          });
          return response;
        })
        .catch((error) => {
          dispatch({
            type: "RE_ORDER",
            error: true,
          });
        });
    };
  },
};

export default actions;
