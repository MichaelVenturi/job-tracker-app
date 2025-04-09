import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer py-5 mx-auto bg-success-content flex flex-row justify-around">
      <div>footer</div>
      <Link to="/about" className="btn btn-outline mx-1 px-1 h-auto">
        about
      </Link>
    </footer>
  );
};
export default Footer;
