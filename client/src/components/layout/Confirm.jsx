import { Link } from "react-router-dom";

const Confirm = () => {
  return (
    <div className="confirm text-center p-10">
      <div className="flex justify-center items-center bg-greeny w-20 h-20 rounded-full mx-auto mb-4">
        <svg
          width="60"
          height="43"
          viewBox="0 0 60 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.353 3L19.6863 39.6667L3.01963 23"
            stroke="white"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div className="text-2xl font-semibold">Successful</div>
      <div className="text-greeny text-sm my-8">
        You have successfully added a new administrator
      </div>
      <button className="bg-greeny text-white py-2 px-8">
        <Link to={"/admin"}>Complete</Link>
      </button>
    </div>
  );
};

export default Confirm;
