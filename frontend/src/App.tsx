import { Route, Routes, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashBoardPage";
import Header from "./components/Header";
import Stack from "@mui/material/Stack";
import Logout from "./components/Logout";
import { useContext } from "react";
import { AuthContext } from "./context/Auth.context";

function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100vw",
        pb: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Header />
      <Routes>
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <RegistrationPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Stack>
  );
}

export default AppRouter;
