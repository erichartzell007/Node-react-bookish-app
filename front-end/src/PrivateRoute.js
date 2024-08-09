import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element, role, ...rest }) => {
  const { user } = useSelector((state) => state.login);

  console.log("Private Route LoggedUser:", user);

  return (
    <Route
      {...rest}
      element={user.role === role ? <Element /> : <Navigate to="/error" />}
    />
  );
};

export default PrivateRoute;
