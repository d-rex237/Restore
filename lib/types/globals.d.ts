export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "CUSTOMER" | "DRIVER" | "PROVIDER" | "ADMIN";
    };
  }
}
