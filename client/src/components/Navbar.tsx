import { Link, useNavigate } from "react-router-dom";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { authReset, logout } from "../redux/auth/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/");
  };
  return (
    <nav className="navbar mb-6 bg-success-content shadow-lg text-primary-content">
      <div className="container flex mx-auto items-center justify-between">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg align-middle">
            Go Home
          </Link>
        </div>
        <div className="grow-1 p-2">
          <div className="flex justify-end">
            {user ? (
              <button onClick={onLogout} className="btn btn-outline mx-1 px-1 h-auto">
                logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline mx-1 px-1 h-auto">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline mx-1 px-1 h-auto">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
