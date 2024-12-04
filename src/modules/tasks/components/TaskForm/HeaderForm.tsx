import styles from "./CSS/TaskForm.module.css";
import { Link } from "react-router-dom";
const HeaderForm = () => {
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <div className={styles["title"]}>
            <svg
             className="me-2"
              width="7"
              height="11"
              viewBox="0 0 7 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.57356 9.19976L1.93355 5.18783L6.57356 1.1759C6.71974 1.04504 6.80063 0.869765 6.7988 0.687836C6.79697 0.505907 6.71257 0.331876 6.56378 0.203228C6.415 0.07458 6.21372 0.00160712 6.00331 2.61999e-05C5.7929 -0.00155472 5.59019 0.0683829 5.43884 0.194776L0.233873 4.69518C0.158919 4.75972 0.0995915 4.83653 0.0593579 4.92111C0.0191238 5.0057 -0.00120952 5.09637 -0.000454688 5.18783C-0.000986843 5.27926 0.019449 5.36987 0.0596697 5.45443C0.0998909 5.53899 0.159099 5.61582 0.233873 5.68047L5.43884 10.1809C5.59019 10.3073 5.7929 10.3772 6.00331 10.3756C6.21372 10.3741 6.41499 10.3011 6.56378 10.1724C6.71257 10.0438 6.79697 9.86975 6.7988 9.68782C6.80063 9.50589 6.71974 9.33062 6.57356 9.19976Z"
                fill="#0E382F"
              />
            </svg>

            <Link to="/tasks" className={`${styles["link"]}`}>
              View All Tasks
            </Link>
            <p className={`${styles["header"]} mt-2`}>Add a New Task</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderForm;