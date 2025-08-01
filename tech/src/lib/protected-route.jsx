import { useEffect, useState } from "react";
import { Route, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ path, component: Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
    checkAuth();
  }, [navigate]);

  return (
    <Route
      path={path}
      component={() => {
        if (isAuthenticated === null) {
          // Loading state
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }
        if (isAuthenticated === false) {
          // This shouldn't render since we navigate away, but just in case
          return null;
        }
        return <Component />;
      }}
    />
  );
}