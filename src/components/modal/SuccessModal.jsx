export default function SimpleModal({
  show,
  message,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#333135] p-6 rounded-xl shadow-md w-full max-w-md border-3 border-[#9C94E8]">
        <h2 className="text-lg font-thin mb-4 text-center">
          {message}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-[#32512C] border-3 border-[#76B743] rounded-3xl text-white hover:bg-[#76B743] cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
