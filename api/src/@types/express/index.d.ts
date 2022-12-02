export {};

declare global {
  namespace Express {
    export interface Request {
      isAuthenticated: boolean;
      seller: {
        id: string;
        email: string;
        username: string;
      };
    }
    export interface Response {
      isAuthenticated: boolean;
      seller: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}
