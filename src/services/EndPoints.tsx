import axios from "axios"

const baseURL = 'https://upskilling-egypt.com:3003/api/v1'
export const imageBaseURL = 'https://upskilling-egypt.com:3003'

export const axiosInstanceUrl = axios.create({baseURL: baseURL})

export const axiosInstance = axios.create({baseURL: baseURL, headers: {
    Authorization: localStorage.getItem('token')
}})
