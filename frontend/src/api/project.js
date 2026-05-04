import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getProjects     = ()       => axios.get(`${API}/projects/`)
export const createProject   = (data)   => axios.post(`${API}/projects/`, data, authHeaders())
export const updateProject   = (id, data) => axios.put(`${API}/projects/${id}/`, data, authHeaders())
export const deleteProject   = (id)     => axios.delete(`${API}/projects/${id}/`, authHeaders())