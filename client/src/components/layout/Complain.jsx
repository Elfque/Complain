import { Link } from "react-router-dom";

const Complain = ({ complain }) => {
  const formatDate = (date) => {
    const datee = new Date(date);
    const formDate = new Intl.DateTimeFormat("en-GB").format(datee);
    return formDate;
  };

  return (
    <Link
      to={`/complain/${complain._id}`}
      className="grid grid-cols-10 gap-2 text-[12px] px-3 text-blackt py-2 hover:bg:greeny/20"
    >
      <div className="id w-full truncate text-greeny">{complain._id}</div>
      <div className="category col-span-2 w-full truncate">
        {complain.category}
      </div>
      <div className="compText col-span-5 w-full truncate">
        {complain.complainText}
      </div>
      <div className="date col-span-2 w-full truncate">
        {formatDate(complain.updatedAt)}
      </div>
    </Link>
  );
};

export default Complain;
