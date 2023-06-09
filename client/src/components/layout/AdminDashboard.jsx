import Navbar from "./Navbar";
import Complain from "./Complain";
import { useContext, useEffect } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";

const AdminDashboard = () => {
  const authCon = useContext(AuthContext);
  const { loadUser, getAdminComplains, complains } = authCon;

  useEffect(() => {
    loadUser();

    setTimeout(() => {
      getAdminComplains();
    }, 2000);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="complains max-w-[600px] mx-auto">
        <h2 className="font-bold text-2xl">Hi! Admin</h2>
        <div className="text-greeny text-sm mb-4">
          Reports requiring your attention
        </div>
        <div className="grid grid-cols-10 gap-2 bg-whiter text-sm text-greeny px-3 py-1">
          <div className="id">id</div>
          <div className="id col-span-2">Category</div>
          <div className="id col-span-5">Complain</div>
          <div className="id col-span-2">Date</div>
        </div>
        {complains &&
          complains.map((comp) => <Complain complain={comp} key={comp._id} />)}
      </div>
    </div>
  );
};

export default AdminDashboard;
