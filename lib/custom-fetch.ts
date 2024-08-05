const API_URL = process.env.API_URL;

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  signal?: AbortSignal;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token?: string) => {
  for (const { resolve, reject } of failedQueue) {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  }

  failedQueue.length = 0;
};

const customFetch = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { method = 'GET', headers = {}, body, signal } = options;

  const accessToken = localStorage.getItem('accessToken'); // Replace with your method of accessing the token
  const authHeaders = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const requestOptions: FetchOptions = {
    method,
    headers: { ...(authHeaders as HeadersInit), ...headers },
    body,
    signal,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, requestOptions);

    if (response.status === 401) {
      // Token expired
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken'); // Replace with your method of accessing the refresh token
        const refreshResponse = await fetch(`${API_URL}/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error('Refresh token failed');
        }

        const { accessToken: newAccessToken } = await refreshResponse.json();
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        return customFetch(url, options);
      } else {
        // Retry request after waiting for the refresh token to complete
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          const newHeaders = { Authorization: `Bearer ${token}` };
          return customFetch(url, {
            ...options,
            headers: { ...headers, ...newHeaders },
          });
        });
      }
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export default customFetch;

// useEffect(() => {
//   const controller = new AbortController();
//   setAbortController(controller);
//
//   const fetchData = async () => {
//     try {
//       const result = await fetchWithAuth('/data-endpoint', { signal: controller.signal });
//       setData(result);
//     } catch (err) {
//       if (err.name === 'AbortError') {
//         console.log('Request was cancelled');
//       } else {
//         setError(err.message);
//       }
//     }
//   };
//
//   fetchData();
//
//   return () => {
//     if (controller) {
//       controller.abort(); // Cancel the request on component unmount
//     }
//   };
// }, []);
