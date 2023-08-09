import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Home from "./components/Home";


export default function App() {  
  return (
    <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route exact path="/register" element={ <Register /> } />
            <Route exact path="/reset" element={ <Reset /> } />
            <Route exact path="/home" element={ <Home /> } />
          </Routes>
        </Router>
    </div>
  )
}
