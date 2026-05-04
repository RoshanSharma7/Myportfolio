import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getEducation    = ()         => axios.get(`${API}/education/`)
export const createEducation = (data)     => axios.post(`${API}/education/`, data, authHeaders())
export const updateEducation = (id, data) => axios.put(`${API}/education/${id}/`, data, authHeaders())
export const deleteEducation = (id)       => axios.delete(`${API}/education/${id}/`, authHeaders())