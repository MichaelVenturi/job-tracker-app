import { Link } from "react-router-dom";
import { useAppSelector as useSelector } from "../redux/store";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="text-center w-full">
      {user ? (
        <h1 className="md:text-4xl text-2xl font-bold">Welcome back, {user.name}</h1>
      ) : (
        <h1 className="md:text-4xl text-2xl font-bold">Welcome to the job tracker</h1>
      )}
      <hr className="my-5 w-[80%] m-auto" />
      <p className="max-w-[80%] m-auto">
        Use this site to record logs of the jobs you have applied to, which ones have responded, and which ones have (sadly) rejected you.
      </p>
      <br />
      <div className="flex flex-col my-5 gap-5 justify-around items-center">
        <Link to="/application-list" className="btn btn-neutral w-[80%]">
          View my applications
        </Link>
        <Link to="/new-application" className="btn btn-success w-[80%]">
          Log a new application
        </Link>
      </div>
    </div>
  );
};
export default Home;
