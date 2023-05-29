import { useContext } from "react";
import AlertContext from "../../Context/AlertContext/AlertContext";

const Alert = () => {
  const alertCon = useContext(AlertContext);
  const { alert } = alertCon;

  if (alert.length === 0) {
    return;
  }

  return (
    <div>
      {alert.map((ale) => (
        <div key={ale.id} className="bg-red-700 text-whity p-2 text-sm">
          {ale.text}
        </div>
      ))}
    </div>
  );
};

export default Alert;
