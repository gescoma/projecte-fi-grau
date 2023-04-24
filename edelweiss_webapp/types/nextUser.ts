export type nextUser = {
  name: string,
  email: string,
  picture: string,
  role?: string,
  client_id?: string,
  iat: number,
  exp: number,
  jti: string 
}