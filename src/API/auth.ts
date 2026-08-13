import { BASE_URL } from "./client";
import type { LoginRequest, LoginResponse } from "./types";

export async function fetchLogin(data: LoginRequest): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();

  if (json.status !== "success") {
    throw new Error(json.message || "Login failed");
  }
  return json;
}

export async function fetchPing(): Promise<LoginResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/ping`, {
      method: "GET",
      credentials: "include",
    });
    // console.log(res)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
}
