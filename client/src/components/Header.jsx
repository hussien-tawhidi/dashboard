import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../app/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <header className='header'>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            MERN
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              {user ? (
                <button className='btn' onClick={onLogout}>
                  <span className='header-icon'>
                    <i className='bi bi-box-arrow-in-right'></i>
                  </span>
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='nav-link active'
                    aria-current='page'>
                    <span className='header-icon'>
                      {" "}
                      <i className='bi bi-box-arrow-in-right'></i>
                    </span>
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='nav-link active'
                    aria-current='page'>
                    <span className='header-icon'>
                      <i className='bi bi-person'></i>
                    </span>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
