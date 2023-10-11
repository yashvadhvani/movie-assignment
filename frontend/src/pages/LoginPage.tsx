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
  email: string;
  password: string;
}

function LoginPage() {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    login(data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: (theme) => theme.spacing(3),
        textAlign: "center",
        width: "33vw",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            New user? <Link to="/register">Register here</Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
}

export default LoginPage;
