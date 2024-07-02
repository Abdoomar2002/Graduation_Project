import Api from "../../services";

const actions = {
  getAll: () => {
    return (dispatch) => {
      return Api.app.Tracking.getAll().then((response) => {
        const tdata = response.filter((elem) => elem.status != 3);
        dispatch({
          type: "GET_ALL",
          data: tdata,
        });
        return response;
      });
    };
  },
  UpdateStatus: () => {
    return (dispatch) => {
      return Api.app.Tracking.UpdateStatus().then((response) => {
        dispatch({
          type: "EDIT_STATUS",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
