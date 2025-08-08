import { useEffect, useState } from "react";
import { Route, useLocation } from "wouter";
import { Loader2 } from "lucide-react";
const API_URI = "https://api-tech-in-rent.onrender.com"

export function ProtectedRoute({ path, component: Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem('adminToken');

        if (!token) {
          console.log('No token found, redirecting to login');
          setIsAuthenticated(false);
          navigate("/login");
          return;
        }

        console.log('Token found, verifying with backend...');
        const response = await fetch(`${API_URI}/api/auth/verify`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log('Verify response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('Token verification successful:', result);
          setIsAuthenticated(true);
        } else {
          console.log('Token verification failed, removing token');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
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
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }
        if (isAuthenticated === false) {
          return null;
        }
        return <Component />;
      }}
    />
  );
}