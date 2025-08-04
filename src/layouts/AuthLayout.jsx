import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* KIRI: Panel dengan background gradient */}
      <div
        className="hidden lg:flex lg:w-1/2 justify-center items-center p-6 xl:p-12"
        style={{
          background: "linear-gradient(to bottom, #9771C5 0%, #573C77 50%, #311B4B 100%)",
        }}
      >
        <p className="font-thin text-3xl sm:text-4xl md:text-5xl text-[#CCC4D6] text-center leading-snug">
          DATA COLLECTION
        </p>
      </div>

      {/* fallback mobile jika ingin menampilkan sesuatu */}
      {/* <div className="block lg:hidden text-white text-center mt-4">Logo Here</div> */}

      {/* KANAN: Tempat Outlet */}
      <div className="flex flex-1 justify-center items-center bg-[#39363B] p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
