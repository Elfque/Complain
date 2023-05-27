const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2">
      <img src="/img/logo.png" alt="logo" className="h-12" />
      <button className="bg-greeny text-white py-2 px-8 rounded-[20px]">
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
