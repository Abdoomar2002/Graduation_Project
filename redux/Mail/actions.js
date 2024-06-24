import Api from "../../services";

const actions = {
  addSubscriptionSetting: (data) => {
    return (dispatch) => {
      return Api.app.Mail.sendMail(data).then((response) => {
        dispatch({
          type: "SEND",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
