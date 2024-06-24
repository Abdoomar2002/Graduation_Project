import Api from "../../services";

const actions = {
  getOffer: (id) => {
    return (dispatch) => {
      return Api.app.Offer.getOffer(id).then((response) => {
        dispatch({
          type: "GET_OFFER",
          data: response,
        });
        return response;
      });
    };
  },
  acceptOffer: (id) => {
    return (dispatch) => {
      return Api.app.Offer.deliveryAcceptOffer(id).then((response) => {
        dispatch({
          type: "ACCEPT_OFFER",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
