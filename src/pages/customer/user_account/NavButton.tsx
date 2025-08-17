import React from "react";
import { NavLink } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          className ?? ""
        } px-4 py-2 mb-3 rounded font-semibold transition-colors duration-200 ${
          isActive
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavButton;
