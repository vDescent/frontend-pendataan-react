import { NavLink, Outlet } from "react-router-dom";
import { RiDashboardFill, RiFile2Fill, RiAddBoxLine} from "react-icons/ri";
import { BsPersonFillGear } from "react-icons/bs";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#2e2b30] text-white">
      {/* Top Bar */}
      <header className="h-15 bg-[#434045] flex items-center justify-between px-6">
        {/* Left Side (Data Collection Title) */}
        <div className="text-lg font-extralight">DATA COLLECTION</div>

        {/* Right Side (Date + Icon) */}
        <div className="flex items-center text-base font-light text-gray-300">
          {new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
          <div className="w-6 h-6 rounded-full bg-purple-400 ml-4"></div>
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
        <main className="flex-1 bg-[#39363b] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
