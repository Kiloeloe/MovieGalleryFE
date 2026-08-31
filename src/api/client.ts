import axios from "axios";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  MovieSummary,
  MovieDetail,
  FavoriteActionResponse,
} from "../types";

const BASE_URL = "https://localhost:61457/api";

const apiClient = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//reroute if token is expired
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes("/auth/");

    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<LoginResponse>("/auth/register", data).then((r) => r.data),
};

export const moviesApi = {
  getPopular: () =>
    apiClient.get<MovieSummary[]>("/movies/popular").then((r) => r.data),

  search: (keyword: string) =>
    apiClient
      .get<MovieSummary[]>("/movies/search", { params: { keyword } })
      .then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<MovieDetail>(`/movies/${id}`).then((r) => r.data),
};

export const favoritesApi = {
  add: (movieId: number) =>
    apiClient
      .post<FavoriteActionResponse>(`/favorites/${movieId}`)
      .then((r) => r.data),

  remove: (movieId: number) =>
    apiClient
      .post<FavoriteActionResponse>(`/favorites/${movieId}/remove`)
      .then((r) => r.data),

  list: () =>
    apiClient.get<MovieSummary[]>("/favorites").then((r) => r.data),
};

export default apiClient;
