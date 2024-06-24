import Api from "../../services";

const actions = {
  getAll: () => {
    return (dispatch) => {
      return Api.app.Order.getAll()
        .then((response) => {
          dispatch({
            type: "GET_ALL",
            data: response,
          });
          return response;
        })
        .catch((error) => {
          dispatch({
            type: "GET_ALL",
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
