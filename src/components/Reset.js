import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import "../css/Reset.css"

function Reset() {
    //States to keep track of user input fields
    const [email, setEmail] = useState("");

    //Keep track of status of email recovery
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) {
            //Email is still being sent
            return;
        }
        if (user) {
            //User managed to sign in
            navigate("/home");
        }
    }, [user, loading]);

    //Set up navigation variable to navigate between routes
    const navigate = useNavigate();

    return (
        <div className="reset">
            <div className="reset-container">
                <h2>Recover Password</h2>


                <input type="text" className="reset-textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
            
                <button className="reset-button" onClick={() => sendPasswordReset(email)}>
                    Send password reset email
                </button>

                <div className="reset-subtext">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Reset;