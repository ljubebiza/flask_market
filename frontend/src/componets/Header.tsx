import React from "react";

const Header: React.FC = () => {
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
            <a className="nav-link" href="/home">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/market">
              Market
            </a>
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
              <a className="nav-link" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;

// Mock functions for demonstration
const isLoggedIn = () => false; // Replace with your actual authentication check
const currentUser = {
  prettier_budget: "$1000",
  username: "JohnDoe",
};
