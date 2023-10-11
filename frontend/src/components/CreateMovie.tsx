import { useEffect } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
interface FormData {
  name: string;
  rating: number;
  cast: { name: string; role: string }[];
  genre: string;
  releaseDate: string;
}

interface CreateMovieProps {
  open: boolean;
  initialData?: FormData | null; // Optional initial data for editing
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

function CreateMovie({
  open,
  initialData,
  onClose,
  onSubmit,
}: CreateMovieProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast" as never,
  });

  useEffect(() => {
    if (initialData) {
      // Prefill the form with initial data when editing
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<FormData> = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "50vw" },
      }}
    >
      <DialogTitle>{initialData ? "Edit Movie" : "Create Movie"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Stack>
                <label>Rating</label>
                <Rating
                  {...field}
                  name="rating"
                  defaultValue={0}
                  precision={0.5}
                />
              </Stack>
            )}
          />
          {/* Add other fields (genre, releaseDate) similarly */}
          <Stack>
            <label>Cast</label>
            {fields.map((field, index) => (
              <Stack
                key={field.id}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  {...field}
                  label={`Cast #${index + 1}`}
                  fullWidth
                  margin="normal"
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
                append({});
              }}
              startIcon={<AddCircleOutline />}
              variant="text"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Add Cast Member
            </Button>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="create-movie-form" color="primary">
          {initialData ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateMovie;
