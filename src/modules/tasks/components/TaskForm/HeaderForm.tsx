import IconHeader from "./IconHeader.jsx"
import styles from "./CSS/TaskForm.module.css";
import { Link } from "react-router-dom";
const HeaderForm = () => {
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <div className={styles["title"]}>
            <IconHeader/>
            <Link to="/tasks" className={`${styles["link"]}`}>
              View All Tasks
            </Link>
          </div>
            <p className={`${styles["header"]} mt-2`}>Add a New Task</p>
        </div>
      </div>
    </>
  );
};

export default HeaderForm;
