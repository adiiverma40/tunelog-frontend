import { BASE_URL } from "./client";
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
  User,
  UserDataResponse,
} from "./types";

export async function fetchCreateUser(
  data: CreateUserRequest,
): Promise<CreateUserResponse> {
  const res = await fetch(`${BASE_URL}/admin/create-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}


export async function fetchGetUsers(): Promise<GetUsersResponse> {
  const res = await fetch(`${BASE_URL}/admin/get-users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to get users");
  }

  return res.json() as Promise<GetUsersResponse>;
}

export async function fetchUserData(
  username: string,
): Promise<UserDataResponse> {
  const res = await fetch(
    `${BASE_URL}/admin/getUserData?username=${encodeURIComponent(username)}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch user data");
  return res.json();
}
