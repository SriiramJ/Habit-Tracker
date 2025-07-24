import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { fetchCurrentUser } from "@/api/userApi";
import { getErrorMessage } from "@/utils/error";

// Custom hook to manage authentication state and user profile
export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    setUser,
    checkAuth,
    logout,
    login,
    register,
  } = useAuthStore();

  // On mount, check authentication state
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch user profile after confirming authentication state
  useEffect(() => {
    if (isAuthenticated && !user) {
      (async () => {
        try {
          const fetchedUser = await fetchCurrentUser();
          setUser(fetchedUser);
        } catch (err) {
          console.error("Failed to fetch user", err);
          logout();
          console.error(getErrorMessage(err));
        }
      })();
    }
    // Only trigger if auth state changes or user is updated
  }, [isAuthenticated, user, setUser, logout]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    logout,
    login,
    register,
  };
}
