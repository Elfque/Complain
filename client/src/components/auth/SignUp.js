import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import axios from "axios";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Loader from "../layout/Loader";
import Alert from "../layout/Alert";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    adminLevel: 3,
    password: "",
    password1: "",
  });
  const [loading, setLoading] = useState(false);

  const authCon = useContext(AuthContext);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;
  const { authError } = authCon;
  const navigate = useNavigate();

  const changing = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      console.log(res);
      if (res.data.msg === "Success") {
        setLoading(false);
        navigate("/");
      } else {
        if (res.data.msg === "Account already exists") {
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
        <form action="" className="form" onSubmit={registerUser}>
          <img src="/img/logo.png" alt="logo" className="w-3/5 mx-auto" />
          <div className="welcome">Welcome to Student Support</div>
          <Alert />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="inp border-greeny"
            onChange={changing}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="inp bg-greeny/10"
            onChange={changing}
          />
          <input
            type="password"
            placeholder="Password confirmation"
            name="password1"
            className="inp bg-greeny/10"
            onChange={changing}
          />

          <button className="sign_btn">
            {loading ? <Loader /> : "Sign In"}
          </button>

          <div className="dont">
            Already a member?{" "}
            <Link to={"/signin"} className="text-greeny">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
