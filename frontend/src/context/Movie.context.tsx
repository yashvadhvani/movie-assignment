import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth.context";
import { BACKEND_URL } from "../constants";

export interface Movie {
  id: number;
  name: string;
  rating: number;
  cast: {
    name: string;
    role: string;
    id: number;
    movieId: number;
    castId: number;
  }[]; // Assuming `cast` is an array of objects with `name` and `role`
  genre: string;
  releaseDate: string;
}
export interface FormData {
  id?: number;
  name: string;
  rating: number;
  cast: { name: string; role: string }[];
  genre: string;
  releaseDate: string;
}
// Create a context to manage movies
export const MovieContext = createContext({
  movies: [] as Movie[],
  addMovie: (data: FormData | undefined) => Promise.resolve(data),
  updateMovie: (id: number, data: FormData | undefined) =>
    Promise.resolve({ ...data, id } as FormData | undefined),
  deleteMovie: (id: number) => Promise.resolve(id),
});

// Create a MovieProvider component that provides the context
export function MovieProvider({ children }: { children: React.ReactNode }) {
  // State to store the list of movies
  const [movies, setMovies] = useState<Movie[]>([]);
  // const navigate = useNavigate();
  const { commonFetch, user } = useContext(AuthContext);

  const addMovie: (
    data: FormData | undefined
  ) => Promise<FormData | undefined> = async (data: FormData | undefined) => {
    try {
      const response = (await commonFetch(`${BACKEND_URL}/movies`, {
        method: "POST",
        body: JSON.stringify(data),
      })) as Movie;
      setMovies([...movies, response]);
      return Promise.resolve(data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };
  const updateMovie: (
    id: number,
    data: FormData | undefined
  ) => Promise<FormData | undefined> = async (id, data) => {
    try {
      const response = (await commonFetch(`${BACKEND_URL}/movies/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })) as Movie;
      setMovies(movies.map((movie) => (movie.id !== id ? movie : response)));
      return Promise.resolve(data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const deleteMovie: (id: number) => Promise<number> = async (id) => {
    try {
      await commonFetch(`${BACKEND_URL}/movies/${id}`, {
        method: "DELETE",
      });
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
    return id;
  };

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = (await commonFetch(`${BACKEND_URL}/movies`, {
          method: "GET",
        })) as Movie[];

        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };
    if (user) {
      fetchMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Create the context value
  const contextValue = {
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}
