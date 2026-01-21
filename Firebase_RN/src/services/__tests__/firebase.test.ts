// ---------- MOCK VARIABLES (TOP LEVEL) ----------
const mockInitializeApp = jest.fn();
const mockGetApps = jest.fn();
const mockGetApp = jest.fn();

const mockInitializeAuth = jest.fn();
const mockGetPersistence = jest.fn(() => 'mock-persistence');

const mockGetDatabase = jest.fn();

// ---------- MOCK ENV ----------
jest.mock('@/config/env', () => ({
  EXPO_PUBLIC_FIREBASE_API_KEY: 'test-api-key',
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  EXPO_PUBLIC_FIREBASE_DATABASE_URL: 'test-db-url',
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: 'test-project-id',
}));

// ---------- MOCK FIREBASE APP ----------
jest.mock('firebase/app', () => ({
  initializeApp: (...args: any[]) => mockInitializeApp(...args),
  getApps: () => mockGetApps(),
  getApp: () => mockGetApp(),
}));

// ---------- MOCK FIREBASE AUTH ----------
jest.mock('firebase/auth', () => ({
  initializeAuth: (...args: any[]) => mockInitializeAuth(...args),
  getReactNativePersistence: (...args: any[]) => mockGetPersistence(...args),
}));

// ---------- MOCK FIREBASE DATABASE ----------
jest.mock('firebase/database', () => ({
  getDatabase: (...args: any[]) => mockGetDatabase(...args),
}));

// ---------- MOCK ASYNC STORAGE ----------
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// ---------- TESTS ----------
describe('Firebase initialization', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('initializes Firebase app when no apps exist', () => {
    mockGetApps.mockReturnValue([]);
    mockInitializeApp.mockReturnValue('mock-app');

    jest.isolateModules(() => {
      require('../firebase');
    });

    expect(mockInitializeApp).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
      authDomain: 'test-auth-domain',
      databaseURL: 'test-db-url',
      projectId: 'test-project-id',
    });
  });

  it('uses existing Firebase app when already initialized', () => {
    mockGetApps.mockReturnValue(['existing-app']);
    mockGetApp.mockReturnValue('existing-app');

    jest.isolateModules(() => {
      require('../firebase');
    });

    expect(mockGetApp).toHaveBeenCalledTimes(1);
    expect(mockInitializeApp).not.toHaveBeenCalled();
  });

  it('initializes auth with AsyncStorage persistence', () => {
    mockGetApps.mockReturnValue([]);
    mockInitializeApp.mockReturnValue('mock-app');

    jest.isolateModules(() => {
      require('../firebase');
    });

    expect(mockInitializeAuth).toHaveBeenCalledWith('mock-app', {
      persistence: expect.anything(),
    });
    expect(mockGetPersistence).toHaveBeenCalled();
  });

  it('initializes realtime database with app', () => {
    mockGetApps.mockReturnValue([]);
    mockInitializeApp.mockReturnValue('mock-app');

    jest.isolateModules(() => {
      require('../firebase');
    });

    expect(mockGetDatabase).toHaveBeenCalledWith('mock-app');
  });
});
