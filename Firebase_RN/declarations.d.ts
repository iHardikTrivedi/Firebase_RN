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
