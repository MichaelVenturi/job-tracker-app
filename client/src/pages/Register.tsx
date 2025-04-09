import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState(null);

  const onChange = (e) => {};

  const onSubmit = (e) => {};

  return (
    <div className="text-center min-w-5xl">
      <h1 className="text-4xl font-bold">Register</h1>
      <hr className="my-5" />
      <form className="flex flex-col items-center justify-center">
        <div className="flex flex-row w-[75%] my-5 gap-2 justify-center">
          <input type="text" id="name" className="input input-success input-lg" placeholder="username" />
          <input type="email" id="email" className="input input-success input-lg" placeholder="email address" />
        </div>
        <div className="flex flex-row w-[75%] my-5 gap-2 justify-center">
          <input type="password" id="password" className="input input-success input-lg" placeholder="password" />
          <input
            type="password"
            id="password2"
            className="input input-success input-lg"
            placeholder="repeat password"
          />
        </div>
        <button className="btn btn-success btn-lg w-[50%] my-5">Register</button>
      </form>
    </div>
  );
};
export default Register;
