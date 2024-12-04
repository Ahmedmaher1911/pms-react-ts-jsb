import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProjectForm.module.css";
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECT_URL } from "../../../../services/EndPoints";
import { toast } from "react-toastify";
import { useEffect } from "react";
interface ProjectForm {
  title: String;
  description: String;
}

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProjectForm>();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (data: ProjectForm) => {
    try {
      const response = await axiosInstance[params.projectId ? "put" : "post"](
        params.projectId
          ? PROJECT_URL.PUT_PROJECT(params.projectId)
          : PROJECT_URL.POST_PROJECT,
        data
      );
      console.log(response);
      toast.success("Project Created Successfully");
      navigate("/projects");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getProject = async () => {
    try {
      const response = await axiosInstance.get(
        PROJECT_URL.GET_PROJECT(params.projectId)
      );
      setValue("title", response.data.title);
      setValue("description", response.data.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.projectId) {
      getProject();
    }
  }, []);
  return (
    <div
      className={`${styles["form-container"]} bg-white  mx-5 rounded-4 d-flex align-items-center justify-content-center`}
    >
      <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 ">
          <label
            htmlFor="exampleFormControlInput1"
            className={`${styles["form-lab"]} form-label`}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className={`${styles["form-lab"]} form-label`}
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={() => {
              navigate("projects");
            }}
            className="btn btn-primary btn-lg rounded-5 bg-transparent text-dark border-black"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`${styles["submit-btn"]} btn btn-lg rounded-5`}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
