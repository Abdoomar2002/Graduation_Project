import Api from "../../services";

const actions = {
  getAllComment: () => {
    return (dispatch) => {
      return Api.app.Comment.getAllComment().then((response) => {
        dispatch({
          type: "GET_ALL",
          data: response,
        });
        return response;
      });
    };
  },
  getComment: (id) => {
    return (dispatch) => {
      return Api.app.Comment.getComment(id).then((response) => {
        dispatch({
          type: "GET_ALL",
          data: response,
        });
        return response;
      });
    };
  },
  createComment: (data) => {
    return (dispatch) => {
      return Api.app.Comment.addComment(data).then((response) => {
        dispatch({
          type: "CREATE",
          data: response,
        });
        return response;
      });
    };
  },
};

export default actions;
