import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiFile2Fill, RiAddBoxLine } from "react-icons/ri";
import { BsPersonFillGear } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropDown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const hamburgerRef = useRef(null);

  // waktu
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5077/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) =>{
        // console.log("ME response:", data);
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // dropdown logout(profile) 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // tutup sidebar pakai esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowDropDown(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2e2b30] text-white">
      <header className="h-16 bg-[#434045] flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          {/* Hamburger md */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            className="lg:hidden p-2 rounded hover:bg-white/10 mr-2"
            ref={hamburgerRef}>
            <RxHamburgerMenu className="w-6 h-6" />
          </button>

          <div className="text-lg font-extralight truncate">
            <span className="sm:hidden">DATA</span>
            <span className="hidden sm:inline">DATA COLLECTION</span>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="flex items-center text-sm md:text-base font-light text-gray-300">
          <span className="hidden md:inline mr-4">
            {currentTime.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>

          <div className="relative" ref={dropdownRef}>
            <IoPersonCircleOutline
              className="w-9 h-9 rounded-full bg-[#9C94E8] ml-2 cursor-pointer"
              onClick={() => setShowDropDown((prev) => !prev)}
            />

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-[#39363B] text-white rounded shadow-md w-48 z-50">
              <div className="px-4 py-2 border-b border-gray-600">
                <p className="font-semibold">{user?.name || "Loading..."}</p>
                <p className="text-sm text-gray-400">{user?.email || ""}</p>
              </div>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-red-400"
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

      {/* area content*/}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 bg-[#5a3e8b] w-64 transform transition-transform duration-300 z-50
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0`}
        >
          <div className="p-6 h-full flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Close btn */}
              <div className="flex items-center justify-between md:hidden mb-4">
                <div className="text-white font-bold">Menu</div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded hover:bg-white/10">
                  ✕
                </button>
              </div>

              {/* Role Info */}
              <div className="bg-[#311B4B] rounded-xl p-4 text-sm leading-tight">
                <div className="text-white text-lg font-normal mb-4">Role</div>
                <div className="text-white font-bold text-lg">Admin</div>
                <div className="text-gray-300 text-sm">Staff (Semarang)</div>
                <div className="text-gray-300 text-sm">BINUS University</div>
              </div>

              {/* Nav to page */}
              <nav className="mt-8 space-y-2 text-base">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? "bg-[#311B4B]" : "hover:bg-[#311B4B]"}`
                  }
                >
                  <RiDashboardFill className="mr-2 text-lg" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/dashboard/upload"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? "bg-[#311B4B]" : "hover:bg-[#311B4B]"}`
                  }
                >
                  <RiFile2Fill className="mr-2 text-lg" />
                  Upload Excel File
                </NavLink>

                <NavLink
                  to="/dashboard/add-data"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? "bg-[#311B4B]" : "hover:bg-[#311B4B]"}`
                  }
                >
                  <RiAddBoxLine className="mr-2 text-lg" />
                  Add Staff Data
                </NavLink>

                <NavLink
                  to="/dashboard/manage"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-3xl transition ${isActive ? "bg-[#311B4B]" : "hover:bg-[#311B4B]"}`
                  }
                >
                  <BsPersonFillGear className="mr-2 text-lg" />
                  Manage Staff Data
                </NavLink>
              </nav>
            </div>

          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

        {/* Content */}
        <main className="flex-1 bg-[#2e2b30] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
