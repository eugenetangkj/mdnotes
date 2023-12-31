import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../firebase";
import "../css/Register.css"


function Register(props) {
    //States to keep track of user input in input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //State to track user's registration progress
    const [user, loading] = useAuthState(auth);


    //Set up navigation variable to navigate between routes
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            //Still registering
            return;
        }
        if (user) {
            //User is authenticated or that user has successfully registered, thus we navigate to home page
            navigate("/home");

        }
    }, [user, loading]);


    //Register function
    const register = () => {
      registerWithEmailAndPassword(email, password);
    };

    //Register function when user presses enter key
    function enterRegister(event) {
      if (event.key === "Enter") {
          registerWithEmailAndPassword(email, password);
      }
  }
  
  
  return (
    <div className={`register ${props.isDarkMode ? "dark" : ''}`}>
      <div className="toggler-register">
        <p className="toggler-register-light">Light</p>
        <div className="toggler-register-slider" onClick={props.toggleDarkMode}>
            <div className="toggler-register-slider-circle"></div>
        </div>
        <p className="toggler-register-dark">Dark</p>
      </div>
      <div className="register-container">
        
        <h2>Welcome!</h2>

        <input type="text" className="register-textBox" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => enterRegister(event)} placeholder="Email Address" />

        <input type="password" className="register-textBox" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => enterRegister(event)} placeholder="Password" />

        <button className="register-button" onClick={register}>
            Register
        </button>

        <button className="register-button register-google" onClick={signInWithGoogle} >
            Register with Google
        </button>

        <div className="register-subtext">
          Already have an account? <Link to="/">Login</Link> now.
        </div>

      </div>
    </div>
  );
}
export default Register;