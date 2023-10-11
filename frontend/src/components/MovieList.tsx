import { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { formatDateToDDMMYYYY } from "../utils/index";
import { MovieContext, Movie } from "../context/Movie.context";

function MovieList() {
  const { movies, updateMovie, deleteMovie } = useContext(MovieContext);
  const [editableMovie, setEditableMovie] = useState<Movie | null>();

  const handleEdit = (movie: Movie) => {
    setEditableMovie(movie);
  };

  const handleSave = async () => {
    if (editableMovie?.id) {
      await updateMovie(editableMovie?.id, editableMovie);

      setEditableMovie(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Movie List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Movie Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Cast</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie: Movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  {editableMovie?.id === movie.id ? (
                    <input
                      defaultValue={movie.name}
                      onChange={(e) =>
                        setEditableMovie({
                          ...editableMovie,
                          name: e.target.value,
                        })
                      }
                      type="text"
                    />
                  ) : (
                    movie.name
                  )}
                </TableCell>
                <TableCell>
                  {editableMovie?.id === movie.id ? (
                    <Rating
                      value={editableMovie.rating}
                      onChange={(e, value) => {
                        e.preventDefault();
                        if (value)
                          setEditableMovie({ ...editableMovie, rating: value });
                      }}
                    />
                  ) : (
                    <Rating
                      name="read-only"
                      value={movie.rating}
                      precision={0.5}
                      readOnly
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editableMovie?.id === movie.id
                    ? editableMovie.cast.map((field, index) => (
                        <div key={field.id}>
                          <input
                            onChange={(e) => {
                              const editableMovieNew = { ...editableMovie };
                              editableMovieNew.cast[index].name =
                                e.target.value;
                              setEditableMovie(editableMovieNew);
                            }}
                            value={editableMovie.cast[index].name}
                            type="text"
                          />

                          <input
                            onChange={(e) => {
                              const editableMovieNew = { ...editableMovie };
                              editableMovieNew.cast[index].role =
                                e.target.value;
                              setEditableMovie(editableMovieNew);
                            }}
                            value={editableMovie.cast[index].role}
                            type="text"
                          />
                        </div>
                      ))
                    : movie.cast.map((castMember, index) => (
                        <div key={index}>
                          {castMember.name} - {castMember.role}
                        </div>
                      ))}
                </TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>
                  {formatDateToDDMMYYYY(new Date(movie.releaseDate))}
                </TableCell>
                <TableCell>
                  {editableMovie?.id === movie.id ? (
                    <IconButton onClick={() => handleSave()} color="primary">
                      Save
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleEdit(movie)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => deleteMovie(movie.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MovieList;
