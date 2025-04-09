import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="text-center min-w-5xl">
      <h1 className="text-4xl font-bold">Welcome to the job tracker</h1>
      <hr className="my-5" />
      <p>
        Use this site to record logs of the jobs you have applied to, which ones have responded, and which ones have
        (sadly) rejected you.
      </p>
      <br />
      <div className="flex flex-col my-5 gap-5 justify-around">
        <Link to="/" className="btn  btn-neutral">
          View my applications
        </Link>
        <Link to="/" className="btn btn-success">
          Log a new application
        </Link>
      </div>
    </div>
  );
};
export default Home;
