import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/v1/user/login", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  }
  return (
    <div className="flex flex-col items-center gap-3 max-w-[400px] mx-auto mt-20 bg-white  rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold bg-white">Login</h1>
      <p className="text-gray-400 bg-white">Enter your information to login</p>
      <form className="flex flex-col gap-2 bg-white">
        <label className="bg-white">Username</label>
        <input
          type="text"
          value={username}
          className="bg-gray-200 p-2 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />

        <label className="bg-white">Password</label>

        <input
          type="password"
          className="bg-gray-200 p-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black p-3 text-white rounded-lg mb-3 mt-2"
        >
          Login Now
        </button>
      </form>
      <div className="flex gap-1 bg-white font-bold mb-2">
        <p className="bg-white">Don&apos;t have an account ?</p>
        <Link to="/signup" className="underline pointer bg-white">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
