import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState(null);

  const onChange = (e) => {};

  const onSubmit = (e) => {};

  return (
    <div className="text-center min-w-5xl">
      <h1 className="text-4xl font-bold">Login</h1>
      <hr className="my-5" />
      <form className="flex flex-col items-center justify-center">
        <input
          type="email"
          id="email"
          className="input input-success input-lg my-5 w-[50%]"
          placeholder="email address"
        />
        <input
          type="password"
          id="password"
          className="input input-success input-lg my-5 w-[50%]"
          placeholder="password"
        />
        <button className="btn btn-success btn-lg w-[50%] my-5">Login</button>
      </form>
    </div>
  );
};
export default Login;
