import { User } from "@/types";

interface TokenData {
  token: string;
  expires: number;
  user: User;
}

const TOKEN_KEY = "textchat_token";
const USER_KEY = "textchat_user";

export class AuthManager {
  // Store token with expiration
  static setAuth(token: string, user: User): void {
    try {
      // Decode JWT to get expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expires = payload.exp * 1000; // Convert to milliseconds

      const tokenData: TokenData = {
        token,
        expires,
        user,
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      console.log("Auth stored:", {
        user: user.username,
        expires: new Date(expires),
      });
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  }

  // Get valid token
  static getToken(): string | null {
    try {
      const tokenDataStr = localStorage.getItem(TOKEN_KEY);
      if (!tokenDataStr) return null;

      const tokenData: TokenData = JSON.parse(tokenDataStr);

      // Check if token is expired
      if (Date.now() >= tokenData.expires) {
        console.log("Token expired, clearing auth");
        this.clearAuth();
        return null;
      }

      return tokenData.token;
    } catch (error) {
      console.error("Failed to get token:", error);
      this.clearAuth();
      return null;
    }
  }

  // Get user data
  static getUser(): User | null {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      if (!userStr) return null;

      // Verify token is still valid
      const token = this.getToken();
      if (!token) return null;

      return JSON.parse(userStr);
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Clear all auth data
  static clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    console.log("Auth cleared");
  }

  // Get username from token
  static getUsernameFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.identity || payload.username || null;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
}
