// Authentication utilities to ensure proper site flow

export const ensureCredentials = () => {
  // Ensure all fetch requests include credentials for admin authentication
  const originalFetch = window.fetch;
  
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const requestInit = {
      ...init,
      credentials: 'include' as RequestCredentials,
    };
    
    return originalFetch(input, requestInit);
  };
};

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/user', {
      credentials: 'include',
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const adminLogin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      return { success: false, error: errorText || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error during login' };
  }
};

// Initialize credentials handling when the module loads
if (typeof window !== 'undefined') {
  ensureCredentials();
}