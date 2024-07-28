import React from "react";
import { Link, useFetcher } from "react-router-dom";

const Header: React.FC = () => {
  // TODO: Logout
  const fetcher = useFetcher();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Black Owl Market
      </a>
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
        {isLoggedIn() ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: "goldenrod", fontWeight: "bold" }}
              >
                <i className="fas fa-coins"></i> {currentUser?.prettier_budget}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Welcome, {currentUser?.username}</a>
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

// Mock functions for demonstration
const isLoggedIn = () => localStorage.getItem("token"); // Replace with your actual authentication check
const currentUser = {
  prettier_budget: "$1000",
  username: "JohnDoe",
};
