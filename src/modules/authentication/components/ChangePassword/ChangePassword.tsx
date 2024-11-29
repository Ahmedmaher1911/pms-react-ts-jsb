import styles from "./CSS/ChangePassword.module.css"
import logo from '../../../../assets/Images/logo.png'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AUTH_URL, axiosInstance } from "../../../../services/EndPoints"
import { toast } from "react-toastify"

interface loginForm {
  oldPassword: string;
  newPassword: string;
confirmNewPassword:string
}
export default function ChangePassword() {
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isNewPassValid, setIsNewPassValid] = useState(false)
  const [isConfirmPassValid, setIsConfirmPassValid] = useState(false)
  const {register, formState:{errors}, handleSubmit} = useForm()

  const onSumbit  = async (data:loginForm) =>{

    try {
      await axiosInstance.put(AUTH_URL.CHANGE_PASSWORD, data);
      toast.success("Login is successfully");
      
    } catch (error:loginForm) {
      toast.error(error.response?.data?.message);
    }
  
  
  }
  return (
    <>
      <div className='container-fluid vh-100'>
 <div className='row justify-content-center align-items-center'>
    <div className=' col-md-10 col-lg-6 m-5'>
      <div className='text-center'>
        <img className="img-fluid" src={logo} alt="" />
      </div>
     <div className={`${styles["form"]}`}>
     <div className='py-3 px-4'>
     <div className='py-3 px-4'>
     <p className='text-white m-0 pt-3'>welcome to PMS</p>
     <h2 className="m-0">Change Password</h2>
    <div className="ps-1" style={{marginTop:"-12px"}}>
    <svg width="16" height="4" viewBox="0 0 16 4"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="4" fill="#EF9B28"/>
      </svg>
    </div>

     </div>
     <form onSubmit={handleSubmit(onSumbit)} className='d-flex flex-column py-3 px-4 '>
       <div className={`${styles["input-container"]}`}>
       <input {...register("oldPassword", {
        required:"Old Password Is Required"
       })} type={isPasswordValid? "text" : "password" } 
       placeholder='Enter your Old Password'/>
       <button type="button">
       <i 
       onClick={()=>setIsPasswordValid((prev) => !prev)} 
       onMouseDown={(e)=>e.preventDefault()}
       onMouseUp={(e)=> e.preventDefault()}
       className={isPasswordValid ? "fa fa-eye" : "fa fa-eye-slash"}></i>
       </button>
      
       </div>
       {errors.oldPassword && <span className="text-danger px-2  d-block">
        {errors.oldPassword.message}</span>
        }
       <div className={`${styles["input-container"]}`}>
       <input 
        {...register("newPassword", {
          required:"New Password Is Required"
         })}
        type={isNewPassValid?"text" : "password"} placeholder='Enter your New Password'/>

        <button type="button"  onClick={()=>setIsNewPassValid((prev) => !prev)} 
        onMouseDown={(e)=>e.preventDefault()}
        onMouseUp={(e)=> e.preventDefault()}>
        <i
       
        className={isNewPassValid ? "fa fa-eye":"fa fa-eye-slash"}></i>
        </button>
     
       </div> 
       {errors.newPassword && <span className="text-danger px-2  d-block">
        {errors.newPassword.message}</span>
        }
       <div className={`${styles["input-container"]}`}>
       <input
        {...register("confirmNewPassword", {
          required:"Confirm Password Is Required"
         })}
       type={isConfirmPassValid ? "text" : "password"}
        placeholder='Confirm New Password'/>
        <button type="button">
        <i
        onClick={()=>setIsConfirmPassValid((prev) => !prev)} 
        onMouseDown={(e)=>e.preventDefault()}
        onMouseUp={(e)=> e.preventDefault()}
        className={isConfirmPassValid ? "fa fa-eye":"fa fa-eye-slash"}></i>
        </button>
      
       </div>
       {errors.confirmNewPassword && <span className="text-danger px-2  d-block">
        {errors.confirmNewPassword.message}</span>
        } 
      <div className="text-center">
      <button className={`${styles["custom-btn"]} my-5 text-white`}>Save</button>

      </div>
      </form>
     </div>
     </div>
    </div>
  </div>
 </div>
    </>
  )
}
