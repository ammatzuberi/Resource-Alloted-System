import { useEffect, useState } from "react";
import { json, Link, useMatch, useResolvedPath } from "react-router-dom";
import authService from "./context/auth.server";
import "./navbar.scss";
import "../src/components/login.css";
import { FiLogOut } from "react-icons/fi";
import { ImUserPlus } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { SiPhpmyadmin } from "react-icons/si";

import logo from "../src/logo.png";

export default function Navbar() {
  var token = JSON.parse(localStorage.getItem("user"));
  console.log(token.email);
  const [posts, setPost] = useState();

  useEffect(() => {
    if (role == "admin") {
      setPost(role);
    }
  });
  const logOut = () => {
    authService.logout();
  };

  // console.log(token.role)

  var role = token.role;
  // console.log(role)
  // setadminrole(role)
  return (
    <>
      <section className="navigation">
        <div className="nav-container">
          {posts ? (
            <nav className="nav">
              <ul className="nav-item">
                <CustomLink to="/">
                  <img src={logo} className="logo-navbar" />
                </CustomLink>
                <CustomLink to="/CheckStatus" className="admin_signin">
                  <MdDashboard style={{ marginRight: "2px" }} />
                  DASHBOARD
                </CustomLink>

                <CustomLink to="/signup" className="admin_signin">
                  <ImUserPlus style={{ marginRight: "2px" }} />
                  ADD USERS
                </CustomLink>

                <button className="logout" onClick={logOut}>
                <FiLogOut className="logout_logo" />
                  <CustomLink to="login"> </CustomLink>
                </button>
              </ul>
            </nav>
          ) : (
            <nav className="nav">
              <ul className="ulform_status">
                <CustomLink to="/">
                  <img src={logo} className="logo-navbar" />
                </CustomLink>

                <CustomLink to="/" className="admin_signin">
                  <MdAddCircle style={{ marginRight: "2px" }} />
                  ADD REQUEST
                </CustomLink>
                <CustomLink to="/CheckStatus" className="admin_signin">
                  {" "}
                  <SiPhpmyadmin style={{ marginRight: "2px" }} />
                  STATUS
                </CustomLink>

                <button className="logout" onClick={logOut}>
                  <FiLogOut className="logout_logo" />
                  <CustomLink to="login"> </CustomLink>
                </button>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
