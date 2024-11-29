import styles from "./Login.module.css";
import imgLogo from "./../../../../assets/images/PMSLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AUTH_URL, axiosInstanceUrl } from "../../../../services/EndPoints";
import { useState } from "react";

interface loginForm {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginForm>();

  const onSubmit = async (data: loginForm) => {
    try {
      const response = await axiosInstanceUrl.post(AUTH_URL.LOGIN, data);
      console.log(response);
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles["containerImg"]}`}>
      <div>
        <img src={imgLogo} alt="" />
      </div>
      <div className={`${styles["fromContainer"]} col-lg-6 col-md-8 mt-3`}>
        <p className="">welcome to PMS</p>
        <h1>
          {" "}
          <u>L</u>ogin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles["input-group"]} mt-5 mb-3`}>
            <input
              type="text"
              className={`${styles["inbut"]} form-control`}
              placeholder="Email"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className={`${styles["input-group"]} mb-3`}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className={`${styles["inbut"]} form-control`}
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <i
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              
              className={`${styles["visbiltyIcon"]} `}
              
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </i>
            {errors.password && (
              <span className="text-danger ">{errors.password.message}</span>
            )}
          </div>
          <div className="links d-flex justify-content-between">
            <Link to="/register" className="text-decoration-none text-white">
              Register Now ?
            </Link>
            <Link
              to="/forget-password"
              className="text-decoration-none text-white"
            >
              Forget Password ?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles["login-btn"]} btn  btn-lg`}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
