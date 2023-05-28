import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import Navbar from "./Navbar";

const AddAdmin = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const authCon = useContext(AuthContext);
  const { authError, authSuccess } = authCon;
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
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="flex justify-center items-center h-[80vh] ">
        <div className="add_admin form_border">
          <form action="" onSubmit={registerUse} className="w-80">
            <div className="text-start text-xl font-semibold mb-4">
              Add a new Adminstrator
            </div>
            <div className="control">
              <label htmlFor="" className="text-start text-greeny">
                Login ID
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="inp border-gray-500/70"
                onChange={changing}
              />
            </div>

            <div className="control">
              <label htmlFor="" className="text-start text-greeny">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="inp border-gray-500/70"
                onChange={changing}
              />
            </div>
            <button className="bg-greeny text-white py-2 px-8">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
