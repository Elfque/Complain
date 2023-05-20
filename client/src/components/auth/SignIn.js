import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import axios from "axios";

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const authCon = useContext(AuthContext);
  const { authError } = authCon;
  const changing = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const registerUse = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user",
        userDetails,
        config
      );
      if (res.data.msg === "Success") {
        navigate("/signin");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="form_border">
        <form action="" className="form" onSubmit={registerUse}>
          <img src="/img/logo.png" alt="logo" className="w-3/5 mx-auto" />
          <div className="welcome">Welcome to Student Support</div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="inp border-greeny"
            onChange={changing}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="inp bg-greeny/10"
            onChange={changing}
          />
          <div className="forgot text-[12px] text-end">Forgot Password?</div>
          <button className="sign_btn">Login</button>
          <div className="dont">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-greeny">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
