/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import avatarDefault from "../../../public/assets/avatar.png";
import { styles } from "../../styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import avatar from "../../../public/assets/avatar.png";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setname] = useState(user?.name || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [editProfile, { isSuccess: success, error: editError }] =
    useEditProfileMutation();

  const [profileImage, setProfileImage] = useState(
    user?.avatar?.url || avatar || avatarDefault
  );

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const base64 = fileReader.result as string;
        try {
          await updateAvatar(base64).unwrap();
          setProfileImage(base64);
        } catch (err) {
          console.error("Error updating avatar:", err);
        }
      }
    };
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || editError) {
      console.log(error);
    }
    if (success) {
      toast.success("Name updated successfully!");
    }
  }, [isSuccess, error, success, editError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      try {
        await editProfile({ name }).unwrap();
        // Optional: Show success notification
      } catch (error) {
        console.error("Profile update failed:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md dark:shadow-sm">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center relative">
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-md">
          <Image
            src={profileImage}
            alt="Profile"
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
          {/* Edit Icon */}
          <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
            <Pencil size={16} color="white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={imageHandler}
            />
          </label>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Click to change profile picture
        </p>
      </div>

      {/* User Information Form */}
      <form className="mt-6 space-y-4 font-Poppins" onSubmit={handleSubmit}>
        {/* Full Name (Editable) */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Address (Non-editable) */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            Email Address
          </label>
          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        <button type="submit" className={`${styles.button}`}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
