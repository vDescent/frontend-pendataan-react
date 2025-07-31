import { NavLink, Outlet } from "react-router-dom";
import { RiDashboardFill, RiFile2Fill, RiAddBoxLine} from "react-icons/ri";
import { BsPersonFillGear } from "react-icons/bs";
import { useState, useEffect, useRef} from "react";
import { logout } from "../services/AuthService"
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropDown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new(Date));
  const dropdownRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(()=>{
    const handleClickOutside = (event) =>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-screen flex flex-col bg-[#2e2b30] text-white">
      {/* Top Bar */}
      <header className="h-15 bg-[#434045] flex items-center justify-between px-6">
        {/* Left Side (Data Collection Title) */}
        <div className="text-lg font-extralight">DATA COLLECTION</div>

        {/* Right Side (Date + Icon) */}
        <div className="flex items-center text-base font-light text-gray-300">
          {currentTime.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
          <div className="relative" ref={dropdownRef}>
            <IoPersonCircleOutline className="w-9 h-9 rounded-full bg-[#9C94E8] ml-4 hover:cursor-pointer" onClick={()=>setShowDropDown((prev) => !prev)}/>
            {/* <div className="w-6 h-6 rounded-full bg-purple-400 ml-4"
            onClick={()=>setShowDropDown((prev) => !prev)}></div> */}

            {showDropdown && (
              <div className="absolute right-0 mt-5 bg-[#39363B] text-white rounded shadow-md w-xs z-50">
                <p className="px-4 py-2">Admin</p>
                {/* <p className="px-4 pb-2">Testing</p> */}
                <hr className="border-t border-gray-600" />

                <p>{}</p>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-400 hover:cursor-pointer"
                  onClick={() => {
                    setShowDropDown(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#5a3e8b] flex flex-col justify-between">
          <div className="p-6">
            {/* Role Info */}
            <div className="bg-[#311B4B] rounded-xl p-4 text-sm leading-tight">
              <div className="text-white text-lg font-normal mb-8">Role</div>
              <div className="text-white font-bold text-lg">Admin</div>
              <div className="text-gray-300 text-sm">Staff (Semarang)</div>
              <div className="text-gray-300 text-sm">BINUS University</div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 space-y-2 text-base">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-3xl transition ${
                    isActive ? 'bg-[#311B4B]' : 'hover:bg-[#311B4B]'
                  }`
                }
              >
                <RiDashboardFill className="mr-2 text-lg" />
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/upload"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? 'bg-[#311B4B]' : 'hover:bg-[#311B4B]'}`
                }
              >
                <RiFile2Fill className="mr-2 text-lg" />
                Upload Excel File
              </NavLink>
              <NavLink
                to="/dashboard/add-data"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? 'bg-[#311B4B]' : 'hover:bg-[#311B4B]'}`
                }
              >
                <RiAddBoxLine className="mr-2 text-lg"/>
                Add Staff Data
              </NavLink>
              <NavLink
                to="/dashboard/manage"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? 'bg-[#311B4B]' : 'hover:bg-[#311B4B]'}`
                }
              >
                <BsPersonFillGear className="mr-2 text-lg"/>
                Manage Staff Data
              </NavLink>
            </nav>

          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 bg-[#2e2b30] overflow-auto m-0 p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
  
}


