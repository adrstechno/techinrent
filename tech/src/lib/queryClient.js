// import { QueryClient } from "@tanstack/react-query";

// async function throwIfResNotOk(res) {
//   if (!res.ok) {
//     const text = (await res.text()) || res.statusText;
//     throw new Error(`${res.status}: ${text}`);
//   }
// }

// export async function apiRequest(method, url, data) {
//   const res = await fetch(url, {
//     method,
//     headers: data ? { "Content-Type": "application/json" } : {},
//     body: data ? JSON.stringify(data) : undefined,
//     credentials: "include",
//   });

//   await throwIfResNotOk(res);
//   return res;
// }

// export const getQueryFn = ({ on401: unauthorizedBehavior }) =>
//   async ({ queryKey }) => {
//     const res = await fetch(queryKey[0], {
//       credentials: "include",
//     });

//     if (unauthorizedBehavior === "returnNull" && res.status === 401) {
//       return null;
//     }

//     await throwIfResNotOk(res);
//     return await res.json();
//   };

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       queryFn: getQueryFn({ on401: "throw" }),
//       refetchInterval: false,
//       refetchOnWindowFocus: false,
//       staleTime: Infinity,
//       retry: false,
//     },
//     mutations: {
//       retry: false,
//     },
//   },
// });
import { QueryClient } from "@tanstack/react-query";

/**
 * Throws an error if the response is not OK
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    let errorText;
    try {
      const json = await res.json();
      errorText = json.error || JSON.stringify(json);
    } catch {
      errorText = await res.text() || res.statusText;
    }
    throw new Error(`${res.status}: ${errorText}`);
  }
}

/**
 * General-purpose API request using fetch
 * @param {string} method - HTTP method: 'GET', 'POST', etc.
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @param {object} customHeaders - Optional headers
 */
export async function apiRequest(method, url, data, customHeaders = {}) {
  const headers = data
    ? { "Content-Type": "application/json", ...customHeaders }
    : customHeaders;

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res.json(); // You can also return res if you want raw response
}

/**
 * Query function generator for React Query
 * @param {object} options
 * @param {'throw' | 'returnNull'} options.on401 - Behavior when 401 is received
 */
export const getQueryFn = ({ on401 = "throw" } = {}) =>
  async ({ queryKey, signal }) => {
    const [url] = queryKey;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      signal,
    });

    if (on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * React Query client instance
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
