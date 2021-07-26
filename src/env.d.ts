declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;
    API_NAME: string;
  }
}
