import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context";

function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
