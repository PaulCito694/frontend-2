import Axios from 'axios'

const axios = () =>
  Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Authorization: `${localStorage.getItem('token')}`,
    },
    withCredentials: false,
    withXSRFToken: true,
  })

export const axiosAuth = (logged = true) =>
  Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...(logged ? { Authorization: `${localStorage.getItem('token')}` } : {}),
    },
    withCredentials: false,
    withXSRFToken: true,
  })

export default axios
