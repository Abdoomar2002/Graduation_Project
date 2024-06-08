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
      console.log(id.payload, "hello");
      return Api.app.Governate.display(1).then((response) => {
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
