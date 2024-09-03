import axios from 'axios'

export class APIService {
  private static client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
}
