import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import Grid from "@mui/material/Grid";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", px: 8, width: "100vw" }}
    >
      <Grid item xs={8}>
        <h1>Favourite Movies</h1>
      </Grid>
      {user && (
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <span>Welcome, {user.username}</span> &nbsp;
          <Link to="/logout">Logout</Link>
        </Grid>
      )}
    </Grid>
  );
}

export default Header;
