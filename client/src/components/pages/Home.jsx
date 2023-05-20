import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <div>
      <div>This is the Home Page</div>
    </div>
  );
};

export default Home;
