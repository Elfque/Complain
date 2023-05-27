import { useContext, useEffect } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const authCon = useContext(AuthContext);
  const { isAuthenticated, loadUser, user } = authCon;
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();

    setTimeout(() => {
      if (!isAuthenticated) {
        navigate("/signin");
      }

      if (user) {
        if (user.adminLevel > 2) navigate("/makeacomplain");
        else navigate("/admin");
        return;
      }
    }, 2000);
  }, []);

  // return (
  //   <div>
  //     {user && user.adminLevel > 2 ? <ComplainForm /> : <AdminDashboard />}
  //   </div>
  // );
};

export default Dashboard;
