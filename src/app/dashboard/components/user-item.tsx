import { TUser } from "@/types/user-types";
import React, { memo } from "react";
type TUserItem = {
  user: TUser;
  onClick: (user: TUser) => void;
};
export const UserItem = memo(({ user, onClick }: TUserItem) => {
  return (
    <tr
      onClick={() => onClick(user)}
      className="group cursor-pointer border-b border-slate-100 hover:bg-blue-50/50 transition-colors"
      role="button"
    >
      <td className="px-4 py-4 text-sm font-medium text-slate-900">{user.firstName}</td>
      <td className="px-4 py-4 text-sm font-medium text-slate-900">{user.lastName}</td>
      <td className="px-4 py-4 text-sm font-medium text-slate-900">{user.age}</td>
      <td className="px-4 py-4 text-sm text-slate-600">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
      ${user.gender === "male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}`}
        >
          {user.gender}
        </span>
      </td>

      <td className="px-4 py-4 text-right text-sm font-medium">
        <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View Profile
        </span>
      </td>
    </tr>
  );
});

UserItem.displayName = "UserItem";
