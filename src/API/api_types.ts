export interface UserDetails {
  username: string;
  name: string;
  avatar?: string;
}



// -------sysytem types-----------
export interface BackendInfo {
  tag_name: string;
  html_url: string;
  created_at: string;
  body: string;
  current_version: string;
  env: string;
  cmnt: string;
}

export interface FrontendInfo {
  tag_name: string;
  html_url: string;
  created_at: string;
  body: string;
}

export interface ReleaseResponse {
  backend: BackendInfo;
  frontend: FrontendInfo;
}