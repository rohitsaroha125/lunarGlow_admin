import { getApiUrl } from '@/lib/get-api-url';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ApiClient {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('custom-auth-token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }
}

export const apiClient = new ApiClient(); 