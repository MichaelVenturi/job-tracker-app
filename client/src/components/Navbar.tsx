import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { authReset, logout } from "../redux/auth/authSlice";
import { FaRegUser, FaSignInAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/");
  };

  return (
    <nav className="md:px-16 px-8 py-3.5 mb-8 bg-success-content shadow-lg text-primary-content">
      <div className="container flex mx-auto items-center justify-between">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg align-middle">
            <FaHome className="text-3xl font-light transition hover:opacity-75" />
          </Link>
        </div>
        <div className="grow-1 p-2 hidden md:inline">
          <div className="flex justify-end">
            {user ? (
              <button onClick={onLogout} className="btn btn-outline btn-lg mx-1 px-2 h-auto">
                <FaSignOutAlt /> logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-lg mx-1 px-2 h-auto">
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/register" className="btn btn-outline mx-1 px-2 h-auto">
                  <FaRegUser /> Register
                </Link>
              </>
            )}
          </div>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="grow-1 p-2 flex justify-end md:hidden">
          <div className="group grid justify-center gap-1.5">
            <span className={`h-0.5 w-6 rounded-full bg-primary-content transition ${isOpen && "rotate-45 translate-y-2"}`}></span>
            <span className={`h-0.5 w-6 rounded-full bg-primary-content transition ${isOpen && "scale-x-0"}`}></span>
            <span className={`h-0.5 w-6 rounded-full bg-primary-content transition ${isOpen && "-rotate-45 -translate-y-2"}`}></span>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" mt-2 flex flex-col w-full justify-center items-center">
          {user ? (
            <button onClick={onLogout} className="btn btn-outline btn-lg btn-wide my-1 px-1 h-auto">
              <FaSignOutAlt /> logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(!isOpen)} className="btn btn-outline btn-lg btn-wide my-1 px-1 h-auto">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(!isOpen)} className="btn btn-outline btn-lg btn-wide my-1 px-1 h-auto">
                <FaRegUser /> Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
