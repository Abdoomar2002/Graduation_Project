import Api from "../../services";

const actions = {
  getAll: () => {
    return async (dispatch) => {
      const response = await Api.app.Zone.displayAll();
      dispatch({
        type: "GET_ALL",
        data: response,
      });
      return response;
    };
  },
  getZoneByZoneId: (data) => {
    return async (dispatch) => {
      const response = await Api.app.Zone.display(data);
      dispatch({
        type: "GET_ZONE",
        data: response,
      });
      return response;
    };
  },
};

export default actions;
