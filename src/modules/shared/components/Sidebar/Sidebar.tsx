import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function SideBar() {
  const [isCollapse, setIsCollapse] = useState(true);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse} className="rounded-R">
          <span
            className="toggle-icon  d-flex align-items-center justify-content-center"
            onClick={toggleCollapse}
          >
            <i
              className={`fa-solid text-white ${
                isCollapse ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </span>
          <Menu className="vh-100 mt-5">
            <MenuItem
              icon={<div className="fa fa-home mx-3 menu-item"></div>}
              component={<Link to="/Dashboard" />}
            >
              Home{" "}
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
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1V4H1L1 1H6ZM1 0C0.447715 0 0 0.447715 0 1V4C0 4.55228 0.447715 5 1 5H6C6.55228 5 7 4.55228 7 4V1C7 0.447715 6.55228 0 6 0H1Z"
                    fill="white"
                  />
                  <path
                    d="M15 12V15H10V12H15ZM10 11C9.44772 11 9 11.4477 9 12V15C9 15.5523 9.44772 16 10 16H15C15.5523 16 16 15.5523 16 15V12C16 11.4477 15.5523 11 15 11H10Z"
                    fill="white"
                  />
                  <path
                    d="M6 8V15H1L1 8H6ZM1 7C0.447715 7 0 7.44772 0 8V15C0 15.5523 0.447715 16 1 16H6C6.55228 16 7 15.5523 7 15V8C7 7.44772 6.55228 7 6 7H1Z"
                    fill="white"
                  />
                  <path
                    d="M15 1V8H10V1H15ZM10 0C9.44772 0 9 0.447715 9 1V8C9 8.55229 9.44772 9 10 9H15C15.5523 9 16 8.55229 16 8V1C16 0.447715 15.5523 0 15 0H10Z"
                    fill="white"
                  />
                </svg>
              }
              component={<Link to="/projects" />}
            >
              Projects{" "}
            </MenuItem>
            <MenuItem
              icon={
                <div className="fa-solid fa-list-check mx-3 menu-item"></div>
              }
              component={<Link to="/tasks" />}
            >
              Tasks{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
