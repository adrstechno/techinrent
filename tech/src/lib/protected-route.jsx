import { useEffect, useState, useRef } from "react";
import { Route, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

const API_BASE = "https://tech-in-rent.onrender.com/api";

export function ProtectedRoute({ path, component: Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("adminToken"))
  );
  const [, navigate] = useLocation();
  const hasCheckedRef = useRef(false);
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    let isMounted = true;

    async function checkAuth() {
      if (isVerifyingRef.current) return;
      isVerifyingRef.current = true;

      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          console.log("No token found, redirecting to login");
          if (isMounted) setIsAuthenticated(false);
          return;
        }

        console.log("Token found:", token);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.error("Verify request timed out");
        }, 5000);

        const response = await fetch(`${API_BASE}/auth/verify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const text = await response.text();
        console.log("Verify response:", {
          status: response.status,
          body: text,
        });

        if (!response.ok) {
          throw new Error(
            `Token verification failed: ${response.status} ${text}`
          );
        }

        let result;
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Failed to parse response: ${parseError.message}`);
        }

        if (result.success) {
          console.log("Token verification successful:", result);
          if (isMounted) {
            setIsAuthenticated(true);
            console.log("Set isAuthenticated to true");
            isVerifyingRef.current = false;
          }
        } else {
          throw new Error(`Invalid verification response: ${text}`);
        }
      } catch (error) {
        console.error("Auth check error:", error.message, error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        if (isMounted) {
          setIsAuthenticated(false);
          console.log("Set isAuthenticated to false");
          isVerifyingRef.current = false;
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Removed 10s timeout and spinner to avoid blocking UI

  return (
    <Route
      path={path}
      component={() => {
        console.log(
          "Rendering ProtectedRoute, isAuthenticated:",
          isAuthenticated
        );
        if (isAuthenticated === false) {
          navigate("/login");
          return null;
        }
        return <Component />;
      }}
    />
  );
}
