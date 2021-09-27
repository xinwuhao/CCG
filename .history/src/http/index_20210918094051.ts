import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'


const http = axios.create({
   baseURL: '/api',
   timeout: 10000
})


http.interceptors.request.use((config: AxiosRequestConfig) => {
   let token = localStorage.getItem('token')
   if (token) {
      config.headers['Authorization'] = token
   }
   return config
}, (err: AxiosError) => {
   return Promise.reject(err)
})


http.interceptors.response.use((res: any) => {
   return res.data
}, (err: AxiosError) => {
   let status: number = err.response! && err.response!.status
   if (status === 401) {
 
   }
   if (status === 400) {

   }
   if (status === 403) {

   }
   if (status === 404) {

   }
   if (status === 500) {
 
   }
   if (status === 503) {

   }
   return Promise.reject(err)
})


export default http