import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import appLogo from "./images/logo.png";
import "./Login.css";

function Login() {
    //States for tracking input fields where React forms are state-driven
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //State to track user's auth information
    const [user, loading, error] = useAuthState(auth);
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


    return (
        <div className="login">
            <div className="login-container">
                <img src={appLogo} alt="MdNotes Logo" id="app-logo"></img>

                <input
                type="text"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
                />
                <input
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                <button
                className="login__btn"
                onClick={() => logInWithEmailAndPassword(email, password)}
                >
                Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
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