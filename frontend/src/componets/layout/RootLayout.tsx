import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Header from "../Header";

function RootLayout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
export default RootLayout;
