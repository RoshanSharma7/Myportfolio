import axios from 'axios'
import { authHeaders } from './auth'
const API = import.meta.env.VITE_API_URL

export const getCertifications    = ()         => axios.get(`${API}/certification/`)
export const createCertification  = (data)     => axios.post(`${API}/certification/`, data, authHeaders())
export const updateCertification  = (id, data) => axios.put(`${API}/certification/${id}/`, data, authHeaders())
export const deleteCertification  = (id)       => axios.delete(`${API}/certification/${id}/`, authHeaders())