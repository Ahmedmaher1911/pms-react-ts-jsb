import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./CSS/TaskForm.module.css";
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECT_URL, TASKSURL, USERSURL } from "../../../../services/EndPoints";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface AddTasks {
  title: string,
  description: string,
  employeeId: string | number,
  projectId: string | number,
}

const FormAddAndEdit = () => {
  const [projects, setProjects] = useState();
  const [users, setUsers] = useState();
  const {register, handleSubmit, setValue,formState:{isSubmitting, errors}} = useForm();
  const params = useParams()
  const tasksId = params.taskId
  const isTasks = tasksId == "create-task"
  const navigate = useNavigate()

  const onSumbit = async(data:AddTasks)=>{
    try {
      await axiosInstance[isTasks? "post" : "put"]( isTasks? TASKSURL.POST_TASK 
        : TASKSURL.PUT_TASK(tasksId),data
      )
      toast.success("Add Tasks")
      navigate("/tasks")

    } catch (error) {
      console.log(error);
      
    }
  }
  const getprojects = async () => {
    const res = await axiosInstance.get(PROJECT_URL.GET_PROJECTS)
    console.log(res.data.data);
    
    setProjects(res.data.data)
  }
  const getUsers = async () => {
    const res = await axiosInstance.get(USERSURL.GET_USERS)
    
    setUsers(res.data.data)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isTasks) {
          const res = await axiosInstance.get(TASKSURL.GET_TASK(tasksId));
          const tasks = res.data;
  
          setValue("title", tasks?.title);
          setValue("description", tasks?.description);
          setValue("employeeId", tasks?.employee);
          setValue("projectId", tasks?.project?.title);
        }
  
        await getprojects();
        await getUsers();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [tasksId, setValue]); 
  
  return (
    <>
    <div className={`${styles["form"]} bg-white shadow p-3 mb-5 bg-body-tertiary rounded mx-5 mt-4`}>
        <form onSubmit={handleSubmit(onSumbit)}>
          <label>Title</label>
            <input
             {...register("title",{
              required:"Title Is Required"
            })}
             className={styles["inputName"]} type="text" placeholder='Name' />
             {errors.title  && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          <label>Description</label>
            <input
            {...register("description",{
              required:"Description Is Required"
            })}
             className={styles["inputDes"]} type="text" placeholder="Description" />
           
           {errors.description  && (
              <p className="text-danger">{errors.description.message}</p>
            )}
            <div className="d-flex justify-content-between">
              <label>User</label>
              <label>Project</label>
            </div>
            <div className="d-flex" style={{gap:"70px"}}>
            <select
            {...register("employeeId", {
              required: "userName Is Required",
              validate: (value) => value !== "",
            })}
            className="form-select py-2 "
            aria-label="Default select example"
          >
            <option selected value="" disabled>
              
            No Users Selected
            </option>
            {users?.map((user:any) => (
              <option key={user?.id} value={user?.id}>
                {user?.userName}
              </option>
            ))}
          </select> 
           
         <select
            {...register("projectId", {
              required: "Project Is Required",
              validate: (value) => value !== "",
            })}
            className="form-select py-2 "
            aria-label="Default select example"
          >
            <option selected value="" disabled>
              
            No Status Selected
            </option>
            {projects?.map((project:any) => (
              <option key={project?.id} value={project?.id}>
                {project?.title}
              </option>
            ))}
          </select> 
        
            
            </div>
            <div className="d-flex justify-content-between">
            {errors.employeeId  && (
              <p className="text-danger">{errors.employeeId.message}</p>
            )}
           <div className="text-end">
           {errors.projectId  && (
              <p className="text-danger">{errors.projectId.message}</p>
            )}
           </div>
            </div>
           
            <div className="d-flex justify-content-between my-3">
              <Link  to='/tasks' className="btn border border-dark px-4 py-2 rounded-pill">Cancel</Link>
              <button disabled={isSubmitting}
               className="btn-add">{isSubmitting? <i className="fa fa-spinner fa-spin"></i>
                : "Save"}</button>
            </div>
        </form>
    </div>
   
    </>
  )
}

export default FormAddAndEdit