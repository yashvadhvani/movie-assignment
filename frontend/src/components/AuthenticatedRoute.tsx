import { Route, Navigate, PathRouteProps } from "react-router-dom";

interface AuthenticatedRouteProps extends PathRouteProps {}

function AuthenticatedRoute({ children, ...rest }: AuthenticatedRouteProps) {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" replace />}
    />
  );
}

export default AuthenticatedRoute;
