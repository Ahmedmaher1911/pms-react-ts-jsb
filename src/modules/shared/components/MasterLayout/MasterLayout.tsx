import { Outlet } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";

export default function MasterLayout() {
  return (
    <div className="master-container d-flex">
      <div>
        <SideBar />
      </div>
      <div className="w-100">
        {" "}
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
