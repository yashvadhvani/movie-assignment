import Grid from "@mui/material/Grid";
import AddMovie from "../components/AddMovie";
import MovieList from "../components/MovieList";
import { MovieProvider } from "../context/Movie.context";

function DashboardPage() {
  return (
    <MovieProvider>
      <Grid
        container
        sx={{
          mt: 4,
          mx: 4,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
        gap={6}
      >
        <Grid item xs={4}>
          <AddMovie />
        </Grid>
        <Grid item xs={7}>
          <MovieList />
        </Grid>
      </Grid>
    </MovieProvider>
  );
}

export default DashboardPage;
