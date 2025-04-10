import { useState } from "react";
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

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
    </div>
  );
};
export default Login;
