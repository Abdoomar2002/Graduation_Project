import Api from "../../services";

const actions = {
  displayAllGovernorates: () => {
    return (dispatch) => {
      return Api.app.Governate.displayAll().then((response) => {
        dispatch({
          type: "DISPLAY_ALL_GOVERNORATES",
          data: response,
        });
        return response;
      });
    };
  },
  displayGovernorate: (id) => {
    return (dispatch) => {
      return Api.app.Governate.display(id).then((response) => {
        dispatch({
          type: "DISPLAY_GOVERNORATE",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
