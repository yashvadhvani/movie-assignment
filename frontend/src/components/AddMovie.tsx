import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating"; // Import the Rating component
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { MovieContext, FormData } from "../context/Movie.context";
import { useContext } from "react";

function AddMovie() {
  const { addMovie } = useContext(MovieContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      name: "",
      rating: 0,
      cast: [{ name: "", role: "" }],
      genre: "",
      releaseDate: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast" as never,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addMovie(data);
  };
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Favorite Movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Movie Name"
              fullWidth
              margin="normal"
              required // Add required attribute for validation
              error={!!errors.name}
              helperText={errors.name ? "Movie name is required" : ""}
            />
          )}
        />
        <Controller
          name="rating"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                {...field}
                name="rating"
                defaultValue={0}
                precision={0.5} // Allow half-star ratings
              />
            </Box>
          )}
        />
        <Controller
          name="genre"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Genre"
              fullWidth
              margin="normal"
              required // Add required attribute for validation
              error={!!errors.genre}
              helperText={errors.genre ? "Genre is required" : ""}
            />
          )}
        />
        <Controller
          name="releaseDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Release Date"
              type="date"
              fullWidth
              margin="normal"
              required // Add required attribute for validation
              error={!!errors.releaseDate}
              helperText={errors.releaseDate ? "Release date is required" : ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <Typography variant="h6">Cast</Typography>
        {fields.map((field, index) => (
          <Stack
            key={field.id}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginBottom: 1 }}
          >
            <Controller
              name={`cast.${index}.name`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Cast #${index + 1} Name`}
                  fullWidth
                  margin="normal"
                  required // Add required attribute for validation
                  error={!!errors.cast?.[index]}
                />
              )}
            />
            <Controller
              name={`cast.${index}.role`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Cast #${index + 1} Role`}
                  fullWidth
                  margin="normal"
                  required // Add required attribute for validation
                  error={!!errors.cast?.[index]}
                />
              )}
            />
            {index > 0 && fields.length > 1 && (
              <IconButton
                onClick={() => remove(index)}
                color="secondary"
                aria-label="Remove Cast"
                disabled={fields.length === 1}
              >
                <RemoveCircleOutline />
              </IconButton>
            )}
          </Stack>
        ))}
        <Button
          type="button"
          onClick={() => {
            append("");
          }}
          startIcon={<AddCircleOutline />}
          variant="text"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Add Cast Member
        </Button>
        <Box
          sx={{
            width: "100%",
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Add Movie
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AddMovie;
