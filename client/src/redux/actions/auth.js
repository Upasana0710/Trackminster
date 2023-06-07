import { AUTH } from "../const/actionTypes";
import * as api from "../../api/api";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.login(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
