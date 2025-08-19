export default function ActionBtn({
  staff,
  navigate,
  setStaffToDelete,
  setDeleteStep,
  setStaffToTerminate,
  setActionType,
  setTerminateStep
}) {
  return (
    <div className="flex lg:flex flex-wrap w-full gap-4 justify-around">
      <button
        className="min-w-[4.5rem] px-4 py-2 border-2 bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] cursor-pointer"
        onClick={() => navigate(`/dashboard/display-data/${staff.id}`)}
      >
        Details
      </button>
      <button
        className="min-w-[4.5rem] px-4 py-2 border-2 bg-[#3D2C51] border-[#9C94E8] text-white rounded-full hover:bg-[#9C94E8] cursor-pointer"
        onClick={() => navigate(`/dashboard/edit-data/${staff.id}`)}
      >
        Edit
      </button>
      <button
        className="min-w-[4.5rem] px-4 py-2 border-2 bg-[#512C2C] border-[#FF5A51] text-white rounded-full hover:bg-[#FF5A51] cursor-pointer"
        onClick={() => {
          setStaffToDelete(staff);
          setDeleteStep(1);
        }}
      >
        Delete
      </button>
      <button
        className={`min-w-[4.5em] px-4 py-2 border-2 rounded-full cursor-pointer 
          ${staff.isActive 
            ? 'bg-[#512C2C] border-[#FF5A51] hover:bg-[#FF5A51]'
            : 'bg-[#32512C] border-[#76B743] hover:bg-[#76B743]'
          }`}
        onClick={() => {
          setStaffToTerminate(staff);
          setActionType(staff.isActive ? "terminate" : "unterminate");
          setTerminateStep(1);
        }}
      >
        {staff.isActive ? "Terminate" : "Activate"}
      </button>
    </div>
  );
}
