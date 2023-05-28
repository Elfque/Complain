import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/pages/Dashboard";
import AuthState from "./Context/AuthContext/AuthState";
import ComplainForm from "./components/layout/ComplainForm";
import Messages from "./components/layout/Messages";
import AdminDashboard from "./components/layout/AdminDashboard";
import AddAdmin from "./components/layout/AddAdmin";

function App() {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/makeacomplain" element={<ComplainForm />} />
            <Route exact path="/complain/:id" element={<Messages />} />
            <Route exact path="/admin" element={<AdminDashboard />} />
            <Route exact path="/addadmin" element={<AddAdmin />} />
          </Routes>
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
