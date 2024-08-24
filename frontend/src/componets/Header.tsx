import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { useStore } from "../store/store";

const Header: React.FC = () => {
  const fetcher = useFetcher();
  const { user, token } = useStore()[0];

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Black Owl Market
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/market">
              Market
            </Link>
          </li>
        </ul>
        {/* Conditional rendering based on user authentication */}
        {token ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ color: "goldenrod", fontWeight: "bold" }}
              >
                <i className="fas fa-coins"></i> {user.balance}
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Welcome, {user.username}</span>
            </li>
            <li className="nav-item">
              <fetcher.Form method="POST" action="/logout">
                <button className="nav-link">Logout</button>
              </fetcher.Form>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
