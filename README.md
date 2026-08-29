# Tunelog-Frontend : TLF

TLF is a frontend for my Open-sourced `Tunelog` project. This uses react and Typscript for the code base.
This is based on TailAdmin project. I have modified it to use it. 

---

![TLF Preview](./public/dashboard.png)

---

# Overview

TLF provides a way to access the backend of tunelog to see the song stats, or create playlist and other config. 


# Installation
## 1. Manual Installation

```bash
git clone https://github.com/adiiverma40/tunelog-frontend
cd tunelog-frontend
npm i
npm run dev 
```

## Prerequisites
- NPM 
- Node
- Tunelog-backend: API backend for the frontend dashboard




## Env Variable

Required envrinment variables for frontend.

```text
# ===============================================
#              DASHBOARD CONFIG
# ==============================================

VITE_URL=http://192.168.29.118:5173             # URL for Dashboard. 
VITE_SERVER_PORT=8000                           # PORT on which Uvicorn(fastapi) server will be of Dashboard

# Add additional origins separated by commas, or use * to allow all.
ALLOWED_ORIGINS=http://localhost:5173,http://192.168.29.118:5173,*

# VITE_API_URL=http://192.168.29.118:8000
# VITE_NAVIDROME_URL=http://192.168.29.118:4533
MY_DOMAIN=192.168.29.118
```