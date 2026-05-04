import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getLinks    = ()         => axios.get(`${API}/links/`)
export const createLink  = (data)     => axios.post(`${API}/links/`, data, authHeaders())
export const updateLink  = (id, data) => axios.put(`${API}/links/${id}/`, data, authHeaders())
export const deleteLink  = (id)       => axios.delete(`${API}/links/${id}/`, authHeaders())