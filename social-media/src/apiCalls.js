import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (error) {
    console.error("API Error:", error);
    dispatch(LoginFailure(error));
  }
};
