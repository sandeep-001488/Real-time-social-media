import { useRef } from "react";
import "./register.scss";
import axios from 'axios'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function Register() {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordAgainInput = useRef();
  const navigate=useNavigate()
  const handleClick =async (e) => {
    e.preventDefault();
 
     // Validate password length
     if (passwordInput.current.value.length < 4) {
       passwordInput.current.setCustomValidity("Password length should be at least 4");
       return
     }
 
     // Validate password match
     if (passwordAgainInput.current.value !== passwordInput.current.value) {
       passwordAgainInput.current.setCustomValidity("Passwords don't match");
       return
     }
  
      const user={
        username:usernameInput.current.value,
        email:emailInput.current.value,
        password:passwordInput.current.value,
      }
      try {
        await axios.post("auth/register",user)
        navigate("/login")        
      } catch (error) {
        console.log(error);
      }
   
    // Clear input fields after successful submission
    usernameInput.current.value = "";
    emailInput.current.value = "";
    passwordInput.current.value = "";
    passwordAgainInput.current.value = "";
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social Media</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input placeholder="Username" className="registerInput" ref={usernameInput} required />
            <input placeholder="Email" type="email" className="registerInput" ref={emailInput} required />
            <input placeholder="Password" type="password" className="registerInput" min="4" ref={passwordInput} required />
            <input
              placeholder="Password Again"
              type="password"
              className="registerInput"
              ref={passwordAgainInput}
              required
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
             <Link to="/login" className="registerLoginButton">Log into Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
