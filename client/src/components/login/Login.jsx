import "./login.scss";
import { useContext, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const loginButtonClicked = () => {
    setIsLoginClicked(!isLoginClicked);
  };
  const registerButtonClicked = () => {
    setIsRegisterClicked(!isRegisterClicked);
  };
  const emailInput = useRef();
  const passwordInput = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      },
      dispatch
    );
  };
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Social Media</h3>

            <span className="loginDesc">
              Connect with friends and the world around you on Lamasocial.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                ref={emailInput}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                ref={passwordInput}
                required
              />
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
                onClick={loginButtonClicked}
              >
                {isFetching && isLoginClicked ? "Loading..." : "Log In"}
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <Link
                to="/register"
                className="loginRegisterButton"
                onClick={registerButtonClicked}
              >
                {isFetching && isRegisterClicked
                  ? "Loading..."
                  : "Create a new Account"}
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
