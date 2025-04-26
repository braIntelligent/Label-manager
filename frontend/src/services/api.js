import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Interceptor para añadir token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api