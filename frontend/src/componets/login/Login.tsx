import {
  useActionData,
  useNavigate,
  useNavigation,
  Form,
} from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const data = useActionData() as any;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  console.log(data);
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="text-center ">
      <div className="container">
        <Form className="form-signin" method={"post"}>
          <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
          <br />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="User Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <p className="text-danger badge bg-light">
            {data?.error["message"] ? "Woring creditentials" : null}
          </p>
          <br />
          <div className="checkbox mb-3">
            <h6 className="text-dark">Do not have an account?</h6>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
          <button className="btn btn-lg btn-block btn-primary">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
