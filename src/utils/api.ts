// /utils/api.ts

import user from '../model/userData.json';
export type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface ApiOptions<Body = any, Headers = any> {
  method?: ApiMethod;
  body?: Body;
  headers?: Headers;
  timeoutMs?: number;
  parseJson?: boolean;
  throwOnErrorStatus?: boolean; // If false, always resolve; if true, throws on HTTP errors
}

export class ApiError extends Error {
  status?: number;
  data?: any;
  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// Utility: Converts non-2xx HTTP errors to thrown errors
async function handleResponse(
  response: Response,
  parseJson = true,
  throwOnErrorStatus = true,
) {
  const contentType = response.headers.get('content-type');
  let data: any = undefined;

  if (parseJson && contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = undefined;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = (data && data.message) || `API Error: ${response.status}`;
    if (throwOnErrorStatus) throw new ApiError(message, response.status, data);
    return { data, status: response.status, ok: false };
  }
  return data;
}

// Main API function
export async function apiCall<Res = unknown, Body = any>(
  url: string,
  options: ApiOptions<Body> = {},
): Promise<Res> {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = 20000,
    parseJson = true,
    throwOnErrorStatus = true,
  } = options;
  const apiUrl = user.baseApiUrl + url;
  let controller: AbortController | undefined;
  let signal: AbortSignal | undefined;

  if (timeoutMs > 0 && typeof AbortController !== 'undefined') {
    controller = new AbortController();
    signal = controller.signal;
    setTimeout(() => controller!.abort(), timeoutMs);
  }

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body
        ? { body: typeof body === 'string' ? body : JSON.stringify(body) }
        : {}),
      ...(signal ? { signal } : {}),
    });

    return await handleResponse(response, parseJson, throwOnErrorStatus);
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw new ApiError('Network timeout', 599);
    }
    // Network errors, unreachable, etc.
    const msg = error?.message || 'Network Error';
    throw new ApiError(msg, undefined, undefined);
  }
}

// Optional: convenient methods
export const Api = {
  get: <T>(apiUrl: string, options: ApiOptions = {}) =>
    apiCall<T>(apiUrl, { ...options, method: 'GET' }),

  post: <T>(apiUrl: string, body: any, options: ApiOptions = {}) =>
    apiCall<T>(apiUrl, { ...options, method: 'POST', body }),

  put: <T>(apiUrl: string, body: any, options: ApiOptions = {}) =>
    apiCall<T>(apiUrl, { ...options, method: 'PUT', body }),

  patch: <T>(apiUrl: string, body: any, options: ApiOptions = {}) =>
    apiCall<T>(apiUrl, { ...options, method: 'PATCH', body }),

  delete: <T>(apiUrl: string, options: ApiOptions = {}) =>
    apiCall<T>(apiUrl, { ...options, method: 'DELETE' }),
};
