---
date: 2026-08-13
type: silent
---
### Mismatch Origin
___
You have encountered Mismatch origin error. It might be because of the origin. 
http://ip-address:port , In this url **ip-address** is origin, 
If you frontend and backend has diffrent origin. it will not log in, cause 
**httpOnly cookie** needs same origin to pass the cookie 
### Solution
1. Add or Change `VITE_URL` in .env to where you want to access the website from
2. If your .env has `VITE_URL=http://192.168.29.118:5173` and trying to access in `http://localhost:5173` then access it from `http://192.168.29.118:5173`

> [!NOTE]
> For more information, Read docs at [Mismatch Origin](https://github.com/adiiverma40/tunelog-frontend/wiki/Mismatch-Origin)