import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./CSS/TaskForm.module.css";
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECT_URL, TASKSURL, USERSURL } from "../../../../services/EndPoints";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from 'react-select'
import { Controller } from "react-hook-form";


interface AddTasks {
  title: string,
  description: string,
  employeeId: string | number,
  projectId: string | number,
}
interface Projects {
  id: number,
  title: string,
  description : string,
  projectId: string | number,
}   
interface users {
  id: number, 
  userName: string,
   email: string
}  

const FormAddAndEdit = () => {
  const [projects, setProjects] = useState();
  const [users, setUsers] = useState();
  const {control,register, handleSubmit, setValue,formState:{isSubmitting, errors}} = useForm();
  const params = useParams()
  const tasksId = params.taskId
  const isTasks = tasksId == undefined
  const navigate = useNavigate()

  const onSubmit = async (data: AddTasks) => {
    try {
      const modifiedData = {
        ...data,
        employeeId: data.employeeId ? Number(data.employeeId.value) : null, 
  projectId: data.projectId ? Number(data.projectId.value) : null, 
      };
  
      await axiosInstance[isTasks ? "post" : "put"](
        isTasks ? TASKSURL.POST_TASK : TASKSURL.PUT_TASK(tasksId),
        modifiedData
      );
      toast.success(isTasks ? "Add Task" : "Edit Task");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };
  
  const getprojects = async () => {
    const res = await axiosInstance.get(PROJECT_URL.GET_PROJECTS, {
      params: { pageSize: 2000 }

    })
    
    setProjects(res.data.data)
  }
  const getUsers = async () => {
    const res = await axiosInstance.get(USERSURL.GET_USERS, {
      params: { pageSize: 2000 }
    })
    
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
          setValue("employeeId", {
            value: tasks?.employee?.id, 
            label: tasks?.employee?.userName,
          });
          setValue("projectId", {
            value: tasks?.project?.id, 
            label: tasks?.project?.title,
          });


        }
  
        await getprojects();
        await getUsers();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [tasksId,setValue]); 
  
  return (
    <>
    <div className={`${styles["form"]} bg-white shadow p-3 mb-5 bg-body-tertiary rounded mx-5 mt-4`}>
        <form onSubmit={handleSubmit(onSubmit)}>
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

           <div className="select">
          
           <Controller
  name="employeeId"
  control={control}
  rules={{ required: "User selection is required" }}
  render={({ field, fieldState: { error } }) => (
    <div>
            <label>Users</label>

            <Select
  {...field}
  options={users?.map((user: users) => ({
    value: user.id,
    label: user.userName,
  }))}
/>
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  )}
/>
           </div>
 
<Controller
  name="projectId"
  control={control}
  rules={{ required: "Project selection is required" }}
  render={({ field, fieldState: { error } }) => (
    <div>
      <label>Project</label>
      <Select
  {...field}
  options={projects?.map((project: Projects) => ({
    value: project.id,
    label: project.title,
  }))}
/>
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  )}
/>
           
      
        
            
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