export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthSession = {
  email: string;
  token: string;
  type: string;
};

export type ArticleHome = {
  title: string;
  source: string;
  url: string;
  published: string;
};

export type HomePayload = {
  user: {
    email: string;
    userid: string | null;
  };
  is_verified: boolean;
  articles: ArticleHome[];
};

type ApiResponse<T> = {
  message: string;
  data?: T;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

async function apiRequest<T>(path: string, init: RequestInit = {}, token?: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "Something went wrong.");
  }

  return data;
}

export function signup(payload: LoginPayload) {
  return apiRequest<null>("/api/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload) {
  const response = await apiRequest<AuthSession>("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.data) {
    throw new Error("Login succeeded but no session data was returned.");
  }

  return response;
}

export function fetchHome(token: string) {
  return apiRequest<HomePayload>("/api/home", { method: "GET" }, token);
}

export function sendVerificationEmail(token: string) {
  return apiRequest<null>("/api/verify", { method: "POST" }, token);
}

export function verifyEmailToken(token: string) {
  return apiRequest<null>(`/api/verify?token=${encodeURIComponent(token)}`, {
    method: "GET",
  });
}
