import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import AuthState from "./Context/AuthContext/AuthState";

function App() {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
