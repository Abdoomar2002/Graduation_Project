import Api from "../../services";

const actions = {
  getAll: () => {
    return (dispatch) => {
      return Api.app.Rating.getAll().then((response) => {
        dispatch({
          type: "GET_ALL",
          data: response,
        });
        return response;
      });
    };
  },
  getLast5: (id) => {
    return (dispatch) => {
      return Api.app.Rating.getLast5(id).then((response) => {
        dispatch({
          type: "GET_LAST_5",
          data: response,
        });
        return response;
      });
    };
  },
  getRate: (id) => {
    return (dispatch) => {
      return Api.app.Rating.getRate(id).then((response) => {
        dispatch({
          type: "GET_RATE",
          data: response,
        });
        return response;
      });
    };
  },
  addRate: (rate, id) => {
    return (dispatch) => {
      return Api.app.Rating.addRating(rate, id).then((response) => {
        dispatch({
          type: "ADD_RATE",
          data: response,
        });
        return response;
      });
    };
  },
  editRate: (rate, id) => {
    return (dispatch) => {
      return Api.app.Rating.editRating(rate, id).then((response) => {
        dispatch({
          type: "EDIT_RATE",
          data: response,
        });
        return response;
      });
    };
  },
  deleteRate: (id) => {
    return (dispatch) => {
      return Api.app.Rating.deleteRating(id).then((response) => {
        dispatch({
          type: "DELETE_RATE",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
