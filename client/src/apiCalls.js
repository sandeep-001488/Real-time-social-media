// import axios from "axios";
// import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthActions";

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch(LoginStart());
//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/login", userCredential);
//     dispatch(LoginSuccess(res.data));
//   } catch (error) {
//     console.error("API Error:", error);
//     dispatch(LoginFailure(error));
//   }
// };

import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("https://real-time-social-media-4.onrender.com/api/auth/login", userCredential);
    console.log(res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
