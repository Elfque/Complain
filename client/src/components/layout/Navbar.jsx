import { useContext } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const authCon = useContext(AuthContext);
  const { logOutUser } = authCon;

  const navigate = useNavigate();

  const logOut = () => {
    logOutUser();

    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center py-2">
      <img src="/img/logo.png" alt="logo" className="h-12" />
      <button
        className="bg-greeny text-white py-2 px-8 rounded-[20px]"
        onClick={logOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
