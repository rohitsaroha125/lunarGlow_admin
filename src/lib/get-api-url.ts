export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use NEXT_PUBLIC_ prefix
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }
  
  // Server-side: use regular env variable
  return process.env.API_URL || 'http://localhost:3001';
} 