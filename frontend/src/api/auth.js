import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const login = async (username, password) => {
  const res = await axios.post(`${API}/userauth/login/`, { username, password })
  localStorage.setItem('token', res.data.access)
  return res.data
}

export const logout = () => localStorage.removeItem('token')

export const getToken = () => localStorage.getItem('token')

export const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})