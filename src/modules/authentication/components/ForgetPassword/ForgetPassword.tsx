import { useForm } from "react-hook-form";
import authLogo from '../../../../assets/images/logo-pms.png'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AUTH_URL, axiosInstanceURL } from "../../../../services/EndPoints";

export default function ForgetPassword() {
  const Navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosInstanceURL.post(AUTH_URL.FORGET_PASSWORD, data)
      console.log(res);
      Navigate('/reset-password', {state: {email: data.email}})
    } catch (error: any) {
      toast.error(error.response.data.message)      
    }    
  }

  return (
    <div className='col-lg-4 col-md-8 col-sm-12'>
      <div className="col-12 auth-logo text-center pb-2">
        <img className='w-50' src={authLogo} alt="" />
      </div>
      <div className="col-12 auth-bg p-5">
        <p>welcome to PMS</p>
        <h4>Forget Password</h4>
        <span></span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row inputs mt-4 g-4'>
            <div className='col-12 input'>
              <label htmlFor='email'>E-mail</label>
              <br/>
              <input type="email" id='email' placeholder='Enter your E-mail'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email format'
                }
              })}/>
            </div>
            {errors?.email && <p className='text-danger mt-2'>{errors?.email?.message}</p>}
            <div className='col-12 btn'>
              <button disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
