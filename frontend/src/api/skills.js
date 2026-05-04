import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getSkills    = ()         => axios.get(`${API}/skills/`)
export const createSkill  = (data)     => axios.post(`${API}/skills/`, data, authHeaders())
export const updateSkill  = (id, data) => axios.put(`${API}/skills/${id}/`, data, authHeaders())
export const deleteSkill  = (id)       => axios.delete(`${API}/skills/${id}/`, authHeaders())