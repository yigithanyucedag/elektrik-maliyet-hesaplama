import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
