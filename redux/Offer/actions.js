import Api from "../../services";

const actions = {
  acceptOffer: (offer) => {
    return (dispatch) => {
      return Api.app.Offer.acceptOffer(offer).then((response) => {
        dispatch({
          type: "ACCEPT_OFFER",
          data: response,
        });
        return response;
      });
    };
  },
  declineOffer: (offer) => {
    return (dispatch) => {
      return Api.app.Offer.declineOffer(offer).then((response) => {
        dispatch({
          type: "DECLINE_OFFER",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
