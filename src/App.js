import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"


export default function App() {  
  return (
    <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route exact path="/register" element={ <Register /> } />
          </Routes>
        </Router>
    </div>
  )
}
