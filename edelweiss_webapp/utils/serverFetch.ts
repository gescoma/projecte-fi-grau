import { getUserToken } from "./getCurrentUser"

export function serverFetch(url: string, options: RequestInit = {}, authorization = true): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(authorization && { Authorization: `Bearer ${getUserToken()}` })
    }
  })
}

export function serverAPIFetch(url: string, options: RequestInit = {}, authorization = true): Promise<Response> {
  return serverFetch(`${process.env.BACKEND_DOMAIN}${url}`, options, authorization)
}