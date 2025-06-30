import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { BsFilePost } from "react-icons/bs";

const navItems = [
  { path: "/home", label: "Home", icon: <FiHome /> },
  { path: "/post", label: "My-Posts", icon: <BsFilePost /> },
  { path: "/profile", label: "Profile", icon: <FiUser /> },
  { path: "/login", label: "Logout", icon: <FiLogOut /> },
];

const NavBar = ({ onItemClick }) => {
  return (
    <nav className="flex flex-col h-full p-2">
      {navItems.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={path}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 my-1 rounded-md transition-all 
            text-purple-800 hover:bg-purple-100
            ${isActive ? "bg-purple-200 font-semibold" : ""}`
          }
        >
          <span className="text-xl">{icon}</span>
          <span className="hidden md:inline truncate">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
