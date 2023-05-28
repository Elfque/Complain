import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";

const AddAdmin = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const authCon = useContext(AuthContext);
  const { authError, authSuccess, loadUser, isAuthenticated } = authCon;
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
        "http://localhost:4000/api/auth",
        userDetails,
        config
      );

      if (res.data.msg === "Success") {
        authSuccess(res);
        navigate("/confirm");
      }
    } catch (error) {
      authError(error);
    }
  };

  return (
    <div className="add_admin form_border">
      <div>Add a new Adminstrator</div>
      <form action="" onSubmit={registerUse}>
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
      </form>
    </div>
  );
};

export default AddAdmin;
