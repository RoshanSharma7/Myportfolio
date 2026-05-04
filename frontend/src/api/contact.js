import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const sendMessage    = (data) => axios.post(`${API}/contact/`, data)
export const getMessages    = ()     => axios.get(`${API}/contact/`, authHeaders())
export const deleteMessage  = (id)   => axios.delete(`${API}/contact/${id}/`, authHeaders())