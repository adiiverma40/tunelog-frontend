import { BASE_URL } from "./client";
import { ReleaseResponse } from "./api_types";


export async function fetchReleaseInfo(): Promise<ReleaseResponse> {
  const res = await fetch(`${BASE_URL}/update/release`);
  if (!res.ok) throw new Error("Failed to fetch sync status");
  return res.json();
}
