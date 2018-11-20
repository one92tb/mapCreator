import axios from "axios";

const createUserSuccess = user => ({
  type: "POSTED_USER_SUCCESS",
  user
});

const createdUserError = error => ({
  type: "POSTED_USER_ERROR",
  error
});

export const createUser = user => dispatch => {
  dispatch({ type: "POSTING_USER" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .post("/users", user)
    .then(res => {
      console.log(res.data);
      dispatch(createUserSuccess(res.data));
    })
    .catch(error => {
      dispatch(createdUserError(error));
    });
};
