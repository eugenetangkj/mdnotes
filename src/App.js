import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Home from "./components/Home";
import { useState } from "react";


export default function App() { 
  //State to track dark mode
  //Initially it is not dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode(prevIsDarkMode => ! prevIsDarkMode);
  }

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={ <Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> } />
            <Route exact path="/register" element={ <Register isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> } />
            <Route exact path="/reset" element={ <Reset isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> } />
            <Route exact path="/home" element={ <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> } />
          </Routes>
        </Router>
    </div>
  )
}
