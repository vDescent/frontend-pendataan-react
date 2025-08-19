import { GoAlertFill } from "react-icons/go";

export default function NoDataFound({ message = "No Data Found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <GoAlertFill className="text-yellow-400 mb-4" size={80} />
      <p className="text-xl font-semibold">{message}</p>
    </div>
  );
}
