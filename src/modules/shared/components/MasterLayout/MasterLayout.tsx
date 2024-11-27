import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <div className="master-container">
      <div className="navbar">
        <h1>Nav Bar</h1>
      </div>
      <div className="content d-flex">
        <div className="sidebar bg-info">
          <h1>side bar</h1>
        </div>
        <div className="content-change bg-danger w-100">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
