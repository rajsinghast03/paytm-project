import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      password,
      firstName,
      lastName,
    });

    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center gap-3 max-w-[400px] mx-auto mt-20 shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold bg-white">Sign Up</h1>
      <p className="text-gray-400 bg-white">
        Enter your information to create an account
      </p>
      <form className="flex flex-col gap-2 bg-white">
        <label className="bg-white">First Name</label>
        <input
          type="text"
          value={firstName}
          className="bg-gray-200 p-2 rounded-lg"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />
        <label className="bg-white">Last Name</label>

        <input
          type="text"
          className="bg-gray-200 p-2 rounded-lg"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />
        <label className="bg-white">Username</label>

        <input
          type="text"
          className="bg-gray-200 p-2 rounded-lg"
          value={username}
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
          className="bg-black p-3 text-white rounded-lg mb-1"
        >
          Sign Up
        </button>
      </form>

      <Link
        to="/login"
        className="text-underline bg-white cursor-pointer underline mb-2 font-bold "
      >
        Already a user? Login Now
      </Link>
    </div>
  );
}

export default Signup;
