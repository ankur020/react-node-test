import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful!");
  };

  return (
    <div style={{ background: "white", borderRadius:"5px", paddingLeft:"10px" }}>
      <header>
        <Link to="/" className="logo">
          QIS
        </Link>
        <nav style={{paddingRight:"5px"}}>
          {auth?.user ? (
            <>
              <Link to="/dashboard">{auth?.user?.username}</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
