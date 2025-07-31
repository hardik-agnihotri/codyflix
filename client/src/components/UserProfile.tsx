import React from "react";

type UserProfileProps ={
    username:string;
    profileColor?:string;
}

const UserProfile:React.FC<UserProfileProps> = ({username,profileColor}) => {
  return (
    <div className="flex flex-col items-center ml-8 cursor-pointer hover:opacity-50">
      <div className={`relative text-white h-[120px] w-[120px] ${profileColor ? profileColor:"bg-red-500"}  rounded`}>
        {/* Eyes */}
        <div className="absolute top-6 left-6 h-4 w-4 bg-white rounded-full"></div>
        <div className="absolute top-6 right-6 h-4 w-4 bg-white rounded-full"></div>

        {/* Smile */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-8 border-b-4 border-white rounded-b-3xl"></div>
      </div>
      <div className="text-center text-gray-400 font-mono mt-2">{username}</div>
    </div>
  );
};

export default UserProfile;
