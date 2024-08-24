import React, { useState, FormEvent } from "react";
import { Form, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="text-center">
      <div className="container">
        <Form
          className="form-register"
          style={{ color: "white" }}
          action="/register"
          method="POST"
        >
          <h1 className="h3 mb-3 font-weight-normal">
            Please create your account
          </h1>
          <br />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="checkbox mb-3">
            <h6>Already have an account?</h6>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <button className="btn btn-lg btn-block btn-primary">Submit</button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
