import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/token/', credentials)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const getCurrentUser = () => {
  // Implementa esto según tu backend
  return { username: 'admin' }
}