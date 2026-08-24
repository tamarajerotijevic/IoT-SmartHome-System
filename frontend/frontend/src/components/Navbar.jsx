import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem("user");
        navigate("/login");
    };

  return (
    <nav className="bg-[#EFD5C3] text-gray-800 border-b-4 border-[#d9a7a1] shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between gap-4 px-6 py-3">

        <div className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          SmartHome
        </div>

        <div className="flex flex-1 items-center justify-center gap-6 text-lg font-medium text-slate-700">
          <Link to="/" className="transition hover:text-[#8B3B62]">
            Dashboard
          </Link>
          <Link to="/events" className="transition hover:text-[#8B3B62]">
            Events
          </Link>
          <Link to="/devices" className="transition hover:text-[#8B3B62]">
            Devices
          </Link>
          <Link to="/access" className="transition hover:text-[#8B3B62]">
            Access
          </Link>
        </div>

        <button
          onClick={logout}
          className="rounded-2xl bg-[#E86A92] px-5 py-2 text-base font-semibold text-white transition hover:bg-[#d85a82]"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;