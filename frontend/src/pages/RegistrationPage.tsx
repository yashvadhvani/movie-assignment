import { useForm, SubmitHandler } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegistrationPage() {
  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    signUp(data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "33vw",
        padding: (theme) => theme.spacing(3),
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            label="Username"
            {...register("username", { required: true })}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          />
          {errors.username && <span>This field is required</span>}
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          />
          {errors.email && errors.email.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span>Invalid email format</span>
          )}
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          />
          {errors.password && <span>This field is required</span>}
          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value: string) =>
                value === password || "Passwords do not match",
            })}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </Stack>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Exsisting User? <Link to="/login">Login here</Link>
        </Typography>
      </form>
    </Paper>
  );
}

export default RegistrationPage;
