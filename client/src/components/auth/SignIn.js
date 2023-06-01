import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import axios from "axios";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Loader from "../layout/Loader";
import Alert from "../layout/Alert";

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({ matric: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const authCon = useContext(AuthContext);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;
  const { authError, authSuccess, loadUser, isAuthenticated } = authCon;

  const changing = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  useEffect(() => {
    loadUser();

    setTimeout(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const registerUse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth",
        userDetails,
        config
      );

      if (res.data.msg === "Success") {
        setLoading(false);
        authSuccess(res);
        navigate("/");
      } else {
        setLoading(false);
        if (
          res.data.msg === "Invalid Email Address" ||
          res.data.msg === "Invalid password"
        ) {
          addAlert(res.data.msg);
        }
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
          <Alert />
          <input
            type="text"
            placeholder="Login ID"
            name="matric"
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
          <button type="submit" className="sign_btn">
            {loading ? <Loader /> : "Login"}
          </button>

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
