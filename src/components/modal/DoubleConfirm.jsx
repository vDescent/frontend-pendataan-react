export default function DoubleConfirmModal({
  showStep,
  data, // optional: bisa isi nama/NIM
  onCancel,
  onFirstConfirm,
  onSecondCancel,
  onSecondConfirm,
  actionType = "delete", 
}) {
    const firstButtonStyle = actionType === "unterminate" ? 
    "px-4 py-2 bg-[#32512C] text-white rounded-3xl border-3 border-[#76B743] hover:bg-[#76B743] cursor-pointer":
    "px-4 py-2 bg-[#512C2C] text-white rounded-3xl border-3 border-[#FF5A51] hover:bg-[#FF5A51] cursor-pointer";

    const actionWords = {
        delete: {
            title: "Delete Staff Data",
            firstButton: "Delete Data",
            secondTitle: "This action is permanent. Are you sure you want to delete this staff’s data?",
        },
        terminate: {
            title: "Terminate Staff",
            firstButton: "Terminate",
            secondTitle: "Are you sure you want to terminate this staff’s data?",
        },
        unterminate: {
            title: "Activate",
            firstButton: "Activate",
            secondTitle: "Are you sure you want to activate this staff’s data?",
        }
    }

    const text = actionWords[actionType] || actionWords.delete;

  return (
    <>
      {showStep === 1 && data && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#39363B] p-6 rounded-lg shadow-md w-full max-w-xl">
            <h4 className="text-lg font-semibold mb-4">
              {text.title}
            </h4>
            <div className="border-2 rounded-lg border-[#9C94E8] overflow-hidden">
                <div className="flex bg-[#333135] border-b-2 border-[#717171]">
                    <div className="w-1/3 p-3 flex justify-center items-center truncate overflow-hidden whitespace-nowrap">Name</div>
                    <div className="w-1/3 p-3 flex justify-center items-center truncate overflow-hidden whitespace-nowrap">NIM</div>
                    <div className="w-1/3 px-3 py-3 flex justify-center items-center truncate overflow-hidden whitespace-nowrap">BINUSIAN ID</div>
                </div>
                <div className="flex">
                    <div className="w-1/3 p-3 text-center truncate overflow-hidden whitespace-nowrap">{data.fullName}</div>
                    <div className="w-1/3 p-3 text-center truncate overflow-hidden whitespace-nowrap">{data.nim}</div>
                    <div className="w-1/3 p-3 text-center truncate overflow-hidden whitespace-nowrap">{data.binusianId}</div>
                </div>
            </div>
            <div className="flex justify-between my-5">
              <button onClick={onFirstConfirm} className={firstButtonStyle}>{text.firstButton}</button>
              <button onClick={onCancel} className="px-6 py-2 bg-[#555356] border-3 border-[#D8D8D8] rounded-3xl hover:bg-[#D8D8D8]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showStep === 2 && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#333135] p-6 rounded-xl shadow-md w-full max-w-md border-3 border-[#9C94E8]">
            <h2 className="text-lg font-thin mb-4 text-center">
                {text.secondTitle}
            </h2>
            <div className="flex justify-between gap-2">
              <button onClick={onSecondConfirm} className="px-8 py-2 bg-[#32512C] border-3 border-[#76B743] rounded-3xl text-white hover:bg-[#76B743] cursor-pointer">Yes</button>
              <button onClick={onSecondCancel} className="px-8 py-2 bg-[#512C2C] border-3 border-[#FF5A51] rounded-3xl text-white hover:bg-[#FF5A51] cursor-pointer">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
