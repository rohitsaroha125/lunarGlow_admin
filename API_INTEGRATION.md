# API Integration Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Endpoint

The admin signin endpoint is configured to use:
- **URL**: `${API_URL}/api/auth/admin/signin`
- **Method**: POST
- **Content-Type**: application/json

## Request Body

```json
{
  "email": "admin@lunarglow.com",
  "password": "your_password"
}
```

## Response Format

```json
{
  "success": true,
  "message": "Admin signin successful",
  "data": {
    "admin": {
      "id": "685abafde6995a4ecf982d86",
      "email": "admin@lunarglow.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6I...."
  }
}
```

## Implementation Details

1. **Auth Client**: Updated `src/lib/auth/client.ts` to use the real API
2. **Token Storage**: JWT token is stored in localStorage as 'custom-auth-token'
3. **Admin Info**: Admin details are stored in localStorage as 'admin-info'
4. **Error Handling**: Network errors and API errors are properly handled
5. **User Context**: Updated to use admin information from localStorage

## Usage

1. Set up your environment variables
2. Start your API server
3. Navigate to the signin page
4. Enter admin credentials
5. Upon successful authentication, you'll be redirected to the dashboard

## Error Handling

The system handles the following error scenarios:
- Network connectivity issues
- Invalid credentials
- Server errors
- Malformed responses 