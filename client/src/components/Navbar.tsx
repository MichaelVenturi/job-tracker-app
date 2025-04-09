import { Link } from "react-router-dom";
const Navbar = () => {
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
            <Link to="/login" className="btn btn-outline mx-1 px-1 h-auto">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline mx-1 px-1 h-auto">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
