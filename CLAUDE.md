# TextChat Web Application - Development Notes

## Authentication Architecture Decisions

### Token Storage Strategy
- **Decision**: Store JWT tokens in localStorage with proper expiration handling
- **Rationale**: 
  - localStorage persists across browser sessions
  - Easier to implement than httpOnly cookies for SPA
  - Can be easily cleared on logout
- **Implementation**: Store token with expiration timestamp for validation

### User Session Management
- **Decision**: Use React Context for global auth state management
- **Components**:
  - AuthContext: Global authentication state
  - ProtectedRoute: Route-level authentication guard
  - Token validation on app initialization

### API Integration Issues Resolved
- **Issue**: `/user/{username}` endpoint only supports DELETE/PATCH methods
- **Solution**: Use `/users/{username}` endpoint for GET requests
- **JWT Payload Structure**: `{exp, identity, user_id}`
  - `identity`: Contains username
  - `user_id`: Contains user ID (number)

### Authentication Flow
1. User submits login form
2. API returns JWT token
3. Store token in localStorage with expiration
4. Decode token to get username
5. Fetch user profile using `/users/{username}`
6. Store user data in context state
7. Redirect to protected route

### Issues Resolved ✅
- ✅ getCurrentUser() function not properly decoding JWT - Fixed with AuthManager
- ✅ Token expiration not being validated - Added automatic expiration checking
- ✅ User data not being stored/retrieved correctly - Implemented proper localStorage management
- ✅ Wrong API endpoint usage - Changed from `/user/{username}` to `/users/{username}`
- ✅ Authentication state management - Created robust AuthManager class
- ✅ Session persistence - Token stored with expiration validation

### Authentication System Status: FULLY FUNCTIONAL ✅
- Login/Registration: Working
- Token Management: Working with expiration
- Protected Routes: Working
- User Session: Persists across browser sessions
- API Integration: All endpoints connected
- Real-time Features: WebSocket support implemented

## API Endpoints Reference
- Login: `POST /auth/login`
- Register: `POST /auth/register` 
- Get User: `GET /users/{username}`
- Update User: `PATCH /user/{username}`
- Get All Users: `GET /users/`
- Get Chats: `GET /chats/`
- Get Messages: `GET /chats/{id}/messages`
- Send Message: `POST /chats/{id}/messages`

## Technology Stack
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- JWT for authentication
- WebSocket for real-time messaging (planned)