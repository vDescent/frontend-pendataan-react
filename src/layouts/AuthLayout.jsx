import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div
        className="hidden lg:flex flex-1 justify-center items-center p-8"
        style={{
          background: "linear-gradient(to bottom, #9771C5 0%, #573C77 50%, #311B4B 100%)",
        }}
      >
        <p className="font-thin text-3xl sm:text-4xl md:text-5xl text-[#CCC4D6] text-center">
          DATA COLLECTION
        </p>
      </div>

      <div className="flex flex-1 bg-[#39363B] justify-center items-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
