import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid">
          <div className="row min-vh-100 d-flex justify-content-center align-items-center">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}
