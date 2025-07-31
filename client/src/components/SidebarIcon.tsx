import React, { type JSX } from "react";
import { Link } from "react-router-dom";

type SideBarType ={
  address:string;
  icon: JSX.Element;
}

const SidebarIcon:React.FC<SideBarType> = ({address,icon}) => {
  return (
    <div className="p-3 text-3xl no-underline text-gray-700 flex mb-2 items-center cursor-pointer hover:text-white transition-all">
      <Link to={address}>
        {icon}
      </Link>
    </div>
  );
};

export default SidebarIcon;
