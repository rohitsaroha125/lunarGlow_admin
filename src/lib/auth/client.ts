'use client';

import type { User } from '@/types/user';
import { getApiUrl } from '@/lib/get-api-url';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

interface AdminSignInResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      id: string;
      email: string;
    };
    token: string;
  };
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}api/auth/admin/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: AdminSignInResponse = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Sign in failed' };
      }

      if (!data.success) {
        return { error: data.message || 'Sign in failed' };
      }

      // Store the token from the API response
      localStorage.setItem('custom-auth-token', data.data.token);
      
      // Store admin info
      localStorage.setItem('admin-info', JSON.stringify(data.data.admin));

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Network error. Please try again.' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');
    const adminInfo = localStorage.getItem('admin-info');

    if (!token) {
      return { data: null };
    }

    // If we have admin info, use it
    if (adminInfo) {
      try {
        const admin = JSON.parse(adminInfo);
        return { 
          data: {
            id: admin.id,
            email: admin.email,
            avatar: '/assets/avatar.png',
            firstName: 'Admin',
            lastName: 'User',
          }
        };
      } catch (error) {
        console.error('Error parsing admin info:', error);
      }
    }

    // Fallback to mock user
    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('admin-info');

    return {};
  }
}

export const authClient = new AuthClient();
