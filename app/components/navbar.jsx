const Navbar = () => {
  return (
    <div className="bg-transparent font-poppins">
      <nav className="flex items-center justify-between px-8 py-5">
        
        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
          <div className="p-3 rounded-full dark:bg-amber-500 bg-black animate-pulse"></div>
          <h1 className="dark:text-amber-500 text-2xl underline underline-offset-4 dark:decoration-white">
            Weatherly
          </h1>
        </div>

        {/* Empty div to balance spacing */}
        <div className="w-32"></div>

      </nav>
    </div>
  );
};

export default Navbar;