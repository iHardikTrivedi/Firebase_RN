/**
 * Auth request payloads
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

/**
 * Auth response user
 */
export interface AuthUser {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
  photoURL?: string;
}
