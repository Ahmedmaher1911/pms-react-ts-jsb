import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectsIcon from "../../../../assets/Components/Projects-icon/ProjectsIcon.jsx";

export default function SideBar() {
  const [isCollapse, setIsCollapse] = useState<boolean>(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  const toggleCollapse = () => {
    const newCollapseState = !isCollapse;
    setIsCollapse(newCollapseState);
    localStorage.setItem("sidebar-collapsed", newCollapseState.toString()); // store as a string
  };

  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse} className="rounded-R">
          <button
            className="toggle-icon d-flex align-items-center justify-content-center"
            onClick={toggleCollapse}
            aria-label={isCollapse ? "Expand sidebar" : "Collapse sidebar"} // Accessible label for screen readers
          >
            <i
              className={`fa-solid text-white ${
                isCollapse ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
          <Menu className="vh-100 mt-5">
            <MenuItem
              icon={<div className="fa fa-home mx-3 menu-item"></div>}
              component={<Link to="/Dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={
                <div className="fa-solid fa-user-group mx-3 menu-item"></div>
              }
              component={<Link to="/usres" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<ProjectsIcon />}
              component={<Link to="/projects" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={
                <div className="fa-solid fa-list-check mx-3 menu-item"></div>
              }
              component={<Link to="/tasks" />}
            >
              Tasks
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
