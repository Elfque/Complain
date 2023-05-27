import { Link } from "react-router-dom";

const Complain = ({ complain }) => {
  return (
    <Link
      to={`/complain/${complain._id}`}
      className="grid grid-cols-12 gap-2 text-[12px] px-3 text-blackt my-2"
    >
      <div className="id w-full truncate text-greeny">{complain._id}</div>
      <div className="category col-span-2 w-full truncate">
        {complain.category}
      </div>
      <div className="compText col-span-5 w-full truncate">
        {complain.complainText}
      </div>
      <div className="status col-span-2 w-full truncate">{complain.status}</div>
      {/* <div className="date col-span-2 w-full truncate"></div> */}
    </Link>
  );
};

export default Complain;
