export interface User {
  id: string;
  username: string;
  fullname?: string;
  email: string;
  authProvider: "manual" | "clerk";
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}