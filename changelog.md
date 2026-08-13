# Changlog

## 13th August 2026

### Cleanups:
**Cleaning up old messy code**
- `fetchGetUsers` function no longer stores users in localstorage
- `fetchUserData` function no longer passes stored password in api call
- removed duplicate function for `/api/ping`
- remove getToken function to get token from localstorage/sessionstorage

### Changes
- changed app.tsx to use auth context
- Changed so that playlist page shows the current user 1st

## 8th August 2026 

### Changes:
- Added support for `.env` 
- Added `.env.example`
