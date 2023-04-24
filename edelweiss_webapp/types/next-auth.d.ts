import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
    interface Session {
      user: {
        role?: string,
        client_id?: string
      } & DefaultSession["user"]
    }
    interface User extends DefaultUser {
      role?: string;
      client_id?: string;
    }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    client_id?: string,
    role: string
  }
}
