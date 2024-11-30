import logo from "../../../../assets/logo.jpg";
import avatar from "../../../../assets/avatar.png";

export default function Navbar() {
  return (
    <>
      <div className="bg-white py-3 d-flex align-items-center justify-content-between px-5 w-100">
        <div>
          <img className="avatar" src={logo} alt="Logo" />
        </div>
        <div className="d-flex align-items-center">
          <i className="fa-regular fa-bell me-3 fs-3"></i>
          <span className="vertical-line me-3"></span>

          <img className="profile-img" src={avatar} alt="Profile" />

          <div className="d-flex flex-column">
            <span className="ms-2 text-profile">Test2</span>
            <p className="pt-1 text-secondary">Test1.tes2@gmail.com</p>
          </div>

          {/* Added margin between image and text */}
        </div>
      </div>
    </>
  );
}
