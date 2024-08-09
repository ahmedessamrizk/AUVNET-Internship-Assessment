import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";

export const allRoles = { A: 'Admin', SA: 'SuperAdmin', U: 'User' }

export function ProtectedRoute({ children, roles = [allRoles.A, allRoles.SA, allRoles.U] }) {
  const { auth, setAuth } = useContext(AuthContext);
  if (auth && roles.includes(auth.role)) {
    return children ? children : <Outlet />
  } else {
    return <Navigate to='/login' />;
  }
}

export function ProtectedCredentials(props) {
  const { auth, setAuth } = useContext(AuthContext);
  if (auth) {
    return <Navigate to='/' />;
  } else {
    return props.children;
  }
}
