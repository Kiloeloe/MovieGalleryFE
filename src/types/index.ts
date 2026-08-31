export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAtUtc: string;
  username: string;
}

export interface MovieSummary {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  rating: number;
  posterUrl: string;
  isFavorite: boolean;
}

export interface MovieDetail extends MovieSummary {
  description: string;
  director: string;
  cast: string;
  screenshotUrls: string[];
}

export interface FavoriteActionResponse {
  success: boolean;
  message: string;
}
