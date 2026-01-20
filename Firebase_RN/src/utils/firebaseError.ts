export function mapFirebaseDbError(error: any): string {
  const code = error?.code;

  switch (code) {
    case 'PERMISSION_DENIED':
    case 'permission-denied':
      return 'You do not have permission to view users.';

    case 'NETWORK_ERROR':
      return 'Network error. Please try again.';

    default:
      return 'Unable to fetch users. Please try again.';
  }
}
