// import { getUserToken } from "./getCurrentUser"

// export async function serverFetch(url: string, options: RequestInit = {}, authorization = true): Promise<Response> {
//   const token = await getUserToken()
//   return fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//       ...(authorization && { Authorization: `Bearer ${token}` })
//     }
//   })
// }

// export function serverAPIFetch(url: string, options: RequestInit = {}, authorization = true): Promise<Response> {
//   return serverFetch(`${process.env.BACKEND_DOMAIN}${url}`, options, authorization)
// }