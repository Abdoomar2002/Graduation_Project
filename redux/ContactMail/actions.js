import Api from "../../services";

const actions = {
  sendEmail: (data) => {
    return (dispatch) => {
      return Api.app.ContactMail.sendEmail(data).then((response) => {
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
