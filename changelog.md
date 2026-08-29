# Changlog

## 1.2.0

## Added:
Added a feature for Showing `Release Note` for the update from github backend release note.

## Docs:
- Added docs and basic structure for frontend.
- Updated some `readme.md`. Pre-requiests and Installations

## bug
- Ugggghhhh!!!!!, I added the commit `added: ` and semantic release dont undestand added
---
## 1.1.0

### Added: 
Custom script for generating release notes and changelog and updated the `publish-ghcr` workflow to accept new release note instead of generating one itself

### changes: 
- Remaned workflow file from `.yml` to `.yaml`
- Added app version in env
- Created new branch `develop`
- Adding releasing workflow
- Changing existing `docker-publish.yml` to use workflow call
- changed the missmatch file name 
- updated to use version from `publish-ghcr` workflow

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
- Added a note for users if they are on diffrent origin name cause of `httpOnly` cookies restrictions

### Fixes:
- Fixed 404 error when avatarUrl is undefined, previously it was using `${BASE_URL}${user?.avatar || ""}` which could result in an invalid URL or empty call to base url 

## 8th August 2026 

### Changes:
- Added support for `.env` 
- Added `.env.example`
