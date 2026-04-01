import { TUser } from "@/types/user-types";
import { useEffect } from "react";
import Image from "next/image";
import { ModalDetail } from "../layout/modal-detail";
import { CloseModalIcon } from "../icons";

type TUserModal = {
  user: TUser | null;
  onClose: () => void;
};

export const UserModal = ({ user, onClose }: TUserModal) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" />

      {/* MODAL CONTENT*/}
      <div className="relative bg-white w-full max-w-md transform overflow-hidden rounded-2xl p-6 shadow-2xl transition-all animate-in zoom-in-95 fade-in duration-300">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <CloseModalIcon />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {user.image ? (
                <Image src={user.image} width={500} height={500} alt="Picture of the user" />
              ) : (
                user.firstName[0]
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName || "User"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ModalDetail label="Username" value={user.username} />
            <ModalDetail label="Phone No." value={user.phone} />
          </div>
          <div className="grid gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="text-sm font-semibold text-green-600">{user.email}</p>
            </div>
            <ModalDetail
              label="Address"
              value={`${user.address?.address}, ${user.address?.city}`}
            />
            <ModalDetail label="Company" value={user?.company?.name || "N/A"} />
          </div>
        </div>

        {/* FOOTER */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </div>
  );
};
