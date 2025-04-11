import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../redux/store";
import { authReset, login } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess && user) navigate("/");

    dispatch(authReset());
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="text-center w-full">
      <h1 className="md:text-4xl text-2xl font-bold">Login</h1>
      <hr className="my-5 w-[80%] m-auto" />
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
        <input
          type="email"
          id="email"
          name="email"
          className="input input-success input-lg my-5 md:w-[50%]"
          placeholder="email address"
          onChange={onChange}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          className="input input-success input-lg my-5 md:w-[50%]"
          placeholder="password"
          onChange={onChange}
          required
        />
        <button type="submit" className="btn btn-success btn-lg w-[50%] my-5" disabled={Object.values(formData).some((i: string) => i.length < 1)}>
          Login
        </button>
      </form>
      <Link to="/register" className="btn btn-ghost">
        No account? Sign up here
      </Link>
    </div>
  );
};
export default Login;
