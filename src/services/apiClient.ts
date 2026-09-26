import {API_BASE_URL} from '../config/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {'Content-Type': 'application/json'},
    ...options,
  });

  if (!response.ok) {
    let message = `Erro ${response.status} ao chamar ${path}`;
    try {
      const body = await response.json();
      message = body?.error ?? message;
    } catch {
      // corpo não era JSON, mantém a mensagem genérica
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {method: 'POST', body: body ? JSON.stringify(body) : undefined}),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {method: 'PUT', body: body ? JSON.stringify(body) : undefined}),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {method: 'PATCH', body: body ? JSON.stringify(body) : undefined}),
  delete: <T>(path: string) => request<T>(path, {method: 'DELETE'}),
};
