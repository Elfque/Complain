import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ComplainForm = () => {
  const authCon = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authCon;

  const [complainDetails, setComplainDetails] = useState({
    complainText: "",
    level: 0,
    category: "Lack of Electricity",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();

    setTimeout(() => {
      if (!isAuthenticated) navigate("/signin");
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const changing = (e) =>
    setComplainDetails({ ...complainDetails, [e.target.name]: e.target.value });

  const sendComplain = async (e) => {
    e.preventDefault();

    if (complainDetails.complainText.trim() === "") {
      alert("Complain cannot be empty");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/complains",
        complainDetails
      );

      if (res.data.msg === "Success") {
        setLoading(false);
        setComplainDetails({
          level: 0,
          complainText: "",
          category: "Lack Of Electricity",
        });
        navigate("/student");
      }
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="h-full flex items-start mt-20 justify-center gap-16">
        <div className="btns">
          <button className="make bg-greeny text-white py-2 text-sm w-40 block mb-6">
            <Link to={"/makeacomplain"}>Make a Complain</Link>
          </button>
          <button className="check_feedback bg-greeny/20 text-black py-2 text-sm w-40 block mb-6">
            <Link to={"/student"}>Check Feedback</Link>
          </button>
        </div>
        <form
          className="max-w-[500px] h-fit grid grid-cols-6 gap-3"
          onSubmit={sendComplain}
        >
          <div className="title font-semibold text-xl col-span-6">
            Hi! Thank you for helping.
          </div>
          <div className="sub_title text-greyey text-sm col-span-6">
            Is someone in your class unhappy or being bullied? thanks to this
            website you can reach out to people at your school who can help.
            it’s anonymous, so no one will ever know you told them.
          </div>
          <div className="control col-span-4">
            <label className=" text-sm text-greeny" htmlFor="">
              Category*
            </label>
            <select
              name="category"
              id=""
              onChange={changing}
              className="outline-none px-2 text-sm py-1 block border border-greyey/70 w-full mt-1"
            >
              <option value="Lack of electricity">Lack of Electricity</option>
              <option value="Violence">Violence</option>
              <option value="Lecturer Complain">Lecturer Complain</option>
              <option value="Theft">Theft</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="control col-span-2">
            <label className=" text-sm text-greeny" htmlFor="">
              Level
            </label>
            <input
              type="text"
              required
              className="outline-none px-2 text-sm py-1 block border border-greyey/70 w-full mt-1"
              name="level"
              onChange={changing}
              value={complainDetails.level}
            />
          </div>
          <div className="control col-span-6">
            <label className=" text-sm text-greeny" htmlFor="">
              More information*
            </label>
            <textarea
              name="complainText"
              id=""
              className="outline-none px-2 text-sm py-1 block border border-greyey/70 w-full h-32 resize-none mt-1"
              placeholder="Please provide as much detail as possible."
              onChange={changing}
              value={complainDetails.complainText}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-greeny text-white py-2 px-8 col-span-2"
          >
            {loading ? <Loader /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplainForm;
