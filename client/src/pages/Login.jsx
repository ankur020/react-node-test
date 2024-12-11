import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toast";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (data && data.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }

      setAuth({
        ...auth,
        user: data?.user,
        token: data?.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      navigate(location.state || "/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="login">
        <h1>Sign-In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="opt">
          <p>Don't have an account?</p>
          <Link to={"/register"} style={{color:"blue", textDecoration:"underline"}}>Sign-Up</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
}

export default Login;
