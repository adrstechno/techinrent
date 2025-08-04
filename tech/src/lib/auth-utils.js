// // Authentication utilities to ensure proper site flow

export const ensureCredentials = () => {
  // Ensure all fetch requests include credentials for admin authentication
  const originalFetch = window.fetch;

  window.fetch = function (input, init) {
    const requestInit = {
      ...init,
    };
    requestInit.credentials = 'include';

    return originalFetch(input, requestInit);
  };
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch('/api/user', {
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

export const adminLogin = async (username, password) => {
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
    console.error('Login error:', error);
    return { success: false, error: 'Network error during login' };
  }
};

// Automatically apply credentials when this file is imported
if (typeof window !== 'undefined') {
  ensureCredentials();
}
