import { useEffect } from "react";
import { useAppDispatch as useDispatch } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/auth/authSlice";

const MAX_TIMEOUT = 2000000000; // no one will have the app open for even close to this long, its fine

export const useAutoLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) return;
    const { token } = JSON.parse(localUser);
    const decode = jwtDecode(token);
    const timeout = decode.exp! * 1000 - Date.now();

    if (timeout <= 0) {
      dispatch(logout());
      localStorage.removeItem("user");
      return;
    }

    const logoutTimer = setTimeout(() => {
      dispatch(logout());
      localStorage.removeItem("user");
    }, Math.min(MAX_TIMEOUT, timeout)); // this is only for logging them out if they happen to be logged on around the time their token will expire.  No big deal

    return () => clearTimeout(logoutTimer);
  }, [dispatch]);
};
