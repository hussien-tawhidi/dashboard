import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import { register, reset } from "../app/auth/authSlice";
export default function Register() {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onchange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, password, password2 } = formData;

  // ****************redux part
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("password are not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (!isError) {
      console.log(message)
    }

    if (isSuccess || user) {
      navigate("/");
       toast.success("Registration is successfully", {
         toastId: "success3",
       });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className='register'>
      {isLoading && (
        <div class='spinner-border text-secondary' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      )}
      <div className='register-title'>
        <span>
          <i className='bi bi-person'></i>
          <h2>Register</h2>
        </span>
        <h5>create your acoount</h5>
      </div>
      <form action='' onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            value={name}
            name='name'
            className='form-control'
            id='name'
            placeholder='Your Name'
            onChange={onchange}
          />
        </div>
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
        <div className='mb-3'>
          <label htmlFor='password2' className='form-label'>
            Confirm Password :
          </label>
          <input
            type='text'
            value={password2}
            name='password2'
            password={password2}
            className='form-control'
            id='password'
            placeholder='Confirm Your Password'
            onChange={onchange}
          />
        </div>
        <button
          className='btn btn-outline-dark btn-block register-btn'
          type='submit'>
          Submit
        </button>
      </form>
    </section>
  );
}
