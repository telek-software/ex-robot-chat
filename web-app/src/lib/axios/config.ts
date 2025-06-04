import axios, { AxiosRequestConfig } from 'axios'

import { getSessionToken } from '~utils/config.utils'

export function axiosPost(
  action: string,
  data: object,
  config?: AxiosRequestConfig,
) {
  const conf = config ?? {}
  const baseURL = import.meta.env.VITE_MAIN_API_URL
  const token = getSessionToken()
  const headers = { Authorization: `Bearer ${token}` }
  if (token) conf.headers = headers
  return axios.post(`${baseURL}${action}`, data, conf)
}
