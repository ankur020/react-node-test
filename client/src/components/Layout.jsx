import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toast";

function Layout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <div className="child">{children}</div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default Layout;
