import { TokenPayload } from "../interfaces/IAuth";

const tokenName = import.meta.env.VITE_AUTH_TOKEN_NAME || "auth_token"


  export const isTokenValid = (): {
    isValid: boolean;
    payload?: Omit<TokenPayload, 'exp' | 'iat'>;
  } => {
    try {
      // Get token from cookie
      const token = getToken();
      
      if (!token) {
        return { isValid: false };
      }
  
      // Decode token (base64)
      const payload = parseJwt(token);
      
      if (!payload) {
        return { isValid: false };
      }
  
      // Check if token has expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        return { isValid: false };
      }
  
      // Return validation status and payload without exp and iat
      const { exp, iat, ...rest } = payload;
      return {
        isValid: true,
        payload: rest
      };
    } catch (error) {
      return { isValid: false };
    }
  }

  export const saveToken = (token: string): void => {
    localStorage.setItem(tokenName, token )
  }
  
  // Helper function to remove the token if it's invalid
  export const removeInvalidToken = (): void => {
    localStorage.removeItem(tokenName)
  }
  

 export const getToken = (): string | null => {
    return localStorage.getItem(tokenName)
  }
  
  export const deleteToken = (): void => {
    removeInvalidToken()
  }
  
  // JWT parsing utility (decodes base64 without verification)
  const parseJwt = (token: string): TokenPayload => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }