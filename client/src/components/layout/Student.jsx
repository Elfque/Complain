import Navbar from "./Navbar";
import Complain from "./Complain";
import { useContext, useEffect } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const Student = () => {
  const authCon = useContext(AuthContext);
  const { loadUser, getComplains, complains } = authCon;

  useEffect(() => {
    loadUser();

    setTimeout(() => {
      getComplains();
    }, 2000);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="complains max-w-[600px] mx-auto">
        <h2 className="font-bold text-2xl">Welcome Back</h2>
        <div className="text-greeny text-sm mb-4">
          Here are the complains you have made so far
        </div>
        <div className="grid grid-cols-12 gap-2 bg-whiter text-sm text-greeny px-3 py-1">
          <div className="id">id</div>
          <div className="id col-span-2">Category</div>
          <div className="id col-span-5">Complain</div>
          <div className="id col-span-2">Status</div>
          <div className="id col-span-2">Date</div>
        </div>
        <div className="main_com">
          {complains &&
            complains.map((comp) => (
              <Complain complain={comp} key={comp._id} />
            ))}
        </div>
        <button className="make bg-greeny text-white py-2 text-sm w-40 block mt-4">
          <Link to={"/makeacomplain"}>Make a Complain</Link>
        </button>
      </div>
    </div>
  );
};

export default Student;
