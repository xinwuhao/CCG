import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router/index'
import { ElMessage } from 'element-plus'

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
      ElMessage.error('登录过期');
      router.push('/login')
   }
   if (status === 400) {
      ElMessage.error('参数错误');
   }
   if (status === 403) {
      ElMessage.error('没有全选');
   }
   if (status === 404) {
      ElMessage.error('路径错误');
   }
   if (status === 500) {
      ElMessage.error('服务器错误');
   }
   if (status === 503) {
      ElMessage.error('服务器维护');
   }
   return Promise.reject(err)
})


export default http