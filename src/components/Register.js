import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../firebase";
import "../css/Register.css"


function Register() {
    //States to keep track of user input in input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    //State to track user's registration progress
    const [user, loading] = useAuthState(auth);
    const register = () => {
        if (!name) {
            //Remind user that name is required
            alert("Please enter name");
        }
        registerWithEmailAndPassword(name, email, password);
    };

    //Set up navigation variable to navigate between routes
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            //Still registering
            return;
        }
        if (user) {
            //User has successfully registered, thus we navigate to home page
            navigate("/home");

        }
    }, [user, loading]);
  
  
  return (
    <div className="register">
      <div className="register-container">
        
        <h2>Welcome!</h2>


        <input type="text" className="register-textBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

        <input type="text" className="register-textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />

        <input type="password" className="register-textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

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