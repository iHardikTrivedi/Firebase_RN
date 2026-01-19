declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

declare module '@env' {
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_DATABASE_URL: string;
  export const FIREBASE_PROJECT_ID: string;
}
