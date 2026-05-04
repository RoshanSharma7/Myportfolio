import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getExperience    = ()         => axios.get(`${API}/experience/`)
export const createExperience = (data)     => axios.post(`${API}/experience/`, data, authHeaders())
export const updateExperience = (id, data) => axios.put(`${API}/experience/${id}/`, data, authHeaders())
export const deleteExperience = (id)       => axios.delete(`${API}/experience/${id}/`, authHeaders())