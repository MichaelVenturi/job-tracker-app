import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../redux/store";
import { authReset, register } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

interface IFormData {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
}

interface IFormValidation {
  username: boolean;
  email: boolean;
  password: boolean;
  checkPassword: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [formValid, setFormValid] = useState<IFormValidation>({
    username: true,
    email: true,
    password: true,
    checkPassword: true,
  });
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess && user) navigate("/");

    dispatch(authReset());
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  const validate = (): boolean => {
    let valid = true;
    if (formData.username.length < 4) {
      toast.error("Username must be at least 4 characters");
      valid = false;
      setFormValid((p) => ({
        ...p,
        username: false,
      }));
    } else {
      setFormValid((p) => ({
        ...p,
        username: true,
      }));
    }
    if (formData.password !== formData.checkPassword) {
      toast.error("Passwords must match");
      valid = false;
      setFormValid((p) => ({
        ...p,
        password: false,
        checkPassword: false,
      }));
    } else {
      setFormValid((p) => ({
        ...p,
        password: true,
        checkPassword: true,
      }));
    }
    return valid;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="text-center w-full">
      <h1 className="md:text-4xl text-2xl font-bold">Register</h1>
      <hr className="my-5 w-[80%] m-auto" />
      <form onSubmit={onSubmit} className="lg:flex flex-col items-center justify-center">
        <div className="flex lg:flex-row flex-col lg:w-[75%] my-5 gap-2 justify-center items-center">
          <input
            type="text"
            id="username"
            name="username"
            className={`input input-lg md:w-[50%] input-${formValid.username ? "success" : "error"}`}
            placeholder="username"
            value={formData.username}
            onChange={onChange}
            required
            autoComplete="off"
          />
          <input
            type="email"
            id="email"
            name="email"
            className={`input input-lg md:w-[50%] input-${formValid.email ? "success" : "error"}`}
            placeholder="email address"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex lg:flex-row flex-col lg:w-[75%] my-5 gap-2 justify-center items-center">
          <input
            type="password"
            id="password"
            name="password"
            className={`input input-lg md:w-[50%] input-${formValid.password ? "success" : "error"}`}
            placeholder="password"
            value={formData.password}
            onChange={onChange}
            required
          />
          <input
            type="password"
            id="checkPassword"
            name="checkPassword"
            className={`input input-lg md:w-[50%] input-${formValid.checkPassword ? "success" : "error"}`}
            placeholder="repeat password"
            value={formData.checkPassword}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success btn-lg w-[50%] my-5"
          disabled={Object.values(formData).some((i: string) => i.trim().length < 1)}>
          Register
        </button>
      </form>
      <Link to="/login" className="btn btn-ghost">
        Already have an account? Sign in
      </Link>
    </div>
  );
};
export default Register;
