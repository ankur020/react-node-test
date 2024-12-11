import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  console.log(dob);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, {
        username,
        email,
        password,
        dob,
      });
      if (data && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Sign-Up</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
        />
        <div className="opt">
          <p>Already have an account?</p>
          <Link
            to={"/login"}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Sign-In
          </Link>
        </div>
        <button type="submit">Register</button>
      </form>
    </Layout>
  );
}

export default Register;
