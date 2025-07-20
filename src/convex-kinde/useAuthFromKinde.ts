import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useCallback, useMemo } from "react";

export function useAuthFromKinde() {
  const { isLoading, isAuthenticated, getToken } = useKindeBrowserClient();
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (forceRefreshToken) {
        try {
          const response = getToken();
          return response as string;
        } catch (_) {
          return null;
        }
      }
      return null;
    },
    [getToken],
  );
  return useMemo(
    () => ({
      isLoading: isLoading ?? true,
      isAuthenticated: isAuthenticated ?? false,
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken],
  );
}
