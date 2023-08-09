import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import appLogo from "../images/logo.png";
import '../css/Login.css'

function Login(props) {
    //States for tracking input fields where React forms are state-driven
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //State to track user's auth information
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();


    //Side effect that runs when user wants to log in
    useEffect(() => {
        if (loading) {
            //Auth is still in progress...
            return;
        }
        if (user) {
            //User has logged in
            navigate("/home");
        }
    }, [user, loading]);

    //Login function when user presses enter key
    function enterLogin(event) {
        if (event.key === "Enter") {
            logInWithEmailAndPassword(email, password);
        }
    }

    return (
        <div className={`login ${props.isDarkMode ? "dark": ""}`}>
            <div className="toggler-login">
                <p className="toggler-login-light">Light</p>
                <div className="toggler-login-slider" onClick={props.toggleDarkMode}>
                    <div className="toggler-login-slider-circle"></div>
                </div>
                <p className="toggler-login-dark">Dark</p>
            </div>
            <div className={`login-container ${props.isDarkMode ? "dark": ""}`}>
                <img src={appLogo} alt="MdNotes Logo" id="app-logo"></img>

                <input type="text" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={0}
                    onKeyDown={(event) => enterLogin(event) } placeholder="E-mail Address" />
                
                <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={0}
                    onKeyDown={(event) => enterLogin(event) } placeholder="Password" />
                
                <button className="login-btn" onClick={() => logInWithEmailAndPassword(email, password)} > 
                    Login
                </button>

                <button className="login-btn login-google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                
                <div className="login-subtext">
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div className="login-subtext">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login;