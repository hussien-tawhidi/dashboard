import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../app/auth/authSlice";
  import { toast } from "react-toastify";
export default function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  // ****************redux part
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onchange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,password
    }

    dispatch(login(userData))
  };

   useEffect(() => {
     if (!isError) {
     console.log(message)
     }

     if (isSuccess || user) {
       navigate("/");
       toast.success("Login Successfully", {
         toastId: "success1",
       });
     }

     dispatch(reset());
   }, [user, isError, isSuccess, message, navigate, dispatch]);
  const { email, password } = formData;
  return (
    <section className='register'>
      {isLoading && (
        <div className='spinner-border text-secondary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}
      <div className='register-title'>
        <span>
          <i className='bi bi-person'></i>
          <h2>Login</h2>
        </span>
        <h5>Login To your acoount</h5>
      </div>
      <form action='' onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='text'
            value={email}
            name='email'
            className='form-control'
            id='email'
            placeholder='Your Email'
            onChange={onchange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Passord :
          </label>
          <input
            type='text'
            value={password}
            name='password'
            className='form-control'
            id='password'
            placeholder='Your Password'
            onChange={onchange}
          />
        </div>

        <button className='btn btn-outline-dark btn-block register-btn'>
          Login
        </button>
      </form>
    </section>
  );
}
