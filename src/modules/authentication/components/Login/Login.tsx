import styles from "./Login.module.css";
import imgLogo from "./../../../../assets/images/PMSLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AUTH_URL, axiosInstanceURL } from "../../../../services/EndPoints";
import { useState } from "react";
import {
  EMAIL_VALIDATION,
  PASWORD_VALIDATION,
} from "../../../../services/Validation/Validation";

// Interface for login form data
interface LoginForm {
  email: string;
  password: string;
}

// Props interface for the Login component
interface LoginProps {
  saveLoginData: () => void;
}

// Login Component
const Login: React.FC<LoginProps> = ({ saveLoginData }) => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosInstanceURL.post(AUTH_URL.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.containerImg}>
      <div>
        <img src={imgLogo} alt="PMS Logo" />
      </div>
      <div className={`${styles.fromContainer} col-lg-6 col-md-8 mt-3`}>
        <p>Welcome to PMS</p>
        <h1>
          <u>L</u>ogin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className={`${styles["input-group"]} mt-5 mb-3`}>
            <input
              type="text"
              className={`${styles.inbut} form-control`}
              placeholder="Email"
              {...register("email", EMAIL_VALIDATION)}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div className={`${styles["input-group"]} mb-3`}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className={`${styles.inbut} form-control`}
              placeholder="Password"
              {...register("password", PASWORD_VALIDATION)}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className={styles.visbiltyIcon}
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>

          {/* Links */}
          <div className="links d-flex justify-content-between">
            <Link to="/register" className="text-decoration-none text-white">
              Register Now?
            </Link>
            <Link
              to="/forget-password"
              className="text-decoration-none text-white"
            >
              Forget Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles["login-btn"]} btn btn-lg`}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
