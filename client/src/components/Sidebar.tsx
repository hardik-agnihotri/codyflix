import React from "react";
import SidebarIcon from "./SidebarIcon";
import { FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar-list flex flex-col pt-6 w-[58px] h-[100vh] bg-black/50">
        <SidebarIcon address={"/profile"} icon={<FaUser />} />
        <SidebarIcon address={"/browse"} icon={<FaHome />} />
        <SidebarIcon address={"/search"} icon={<FaSearch />} />
        <SidebarIcon address={"/logout"} icon={<ImExit />} />
      </div>
    </div>
  );
};

export default Sidebar;
