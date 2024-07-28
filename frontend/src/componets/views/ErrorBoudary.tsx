import { ReactNode } from "react";
import { useRouteError } from "react-router-dom";

interface RouterError {
  status: number;
  message: string;
}

interface ErrorOutput {
  default: string;
  [key: number]: string;
}

function ErrorBoundary({ children }: { children?: ReactNode }) {
  const error = useRouteError() as RouterError;
  const errorOutput: ErrorOutput = { default: "Ops! Something went worng." };
  console.error(error);
  if (error.status === 404) {
    errorOutput[error.status] = "Could not find the resource";
  }

  if (error.status === 500) {
    errorOutput[error.status] = "Server could not procces your request";
  }

  const message = error.status
    ? errorOutput[error.status]
    : errorOutput["default"];
  return (
    <main>
      <h1>{message}</h1>
      {children}
    </main>
  );
}
export default ErrorBoundary;
