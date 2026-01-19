/**
 * Base User (shared across app)
 * - Auth
 * - Dashboard
 * - Profile
 */
export interface User {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
}

/**
 * Dashboard user (Firebase user list)
 */
export interface DashboardUser extends User {
  name: string;
}

/**
 * Profile update payload
 */
export interface UpdateProfileRequest {
  uid: string;
  name: string;
  phone: string;
}
