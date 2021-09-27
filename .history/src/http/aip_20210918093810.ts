import http from "./"
import qs from 'qs'

export default {
   //登录
   login({ username, password }: { username: string, password: string }) {
      return http.post('/login', {
         username,
         password
      })
   },
   //侧边导航栏
   menus() {
      return http.get('/menus')
   },
   //统计图
   reports() {
      return http.get('/reports/type/1')
   },
   // 角色列表
   users({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {
      return http.get(`/users?query=${query}&&pagenum=${pagenum}&&pagesize=${pagesize}`)
   },
   // 删除角色
   sUsers({ id }: { id: any }) {
      return http.delete(`users/${id}`)
   },
   // 编写
   towrite({ id, email, mobile }: { id: any, email: string, mobile: string }) {
      return http.put(`users/${id}`, {
         email, mobile
      })
   },
   //设置
   usersSetup({ id, rid }: { id: any, rid: any }) {
      return http.put(`/users/${id}/role`, {
         rid
      })
   },
   //状态
   state({ uId, type }: { uId: any, type: boolean }) {
      return http.put(`/users/${uId}/state/${type}`)
   },
   //添加用户
   addUsers({ username, password, email, mobile }: { username: string, password: string, email: string, mobile: string }) {
      return http.post(`/users`, {
         username,
         password,
         email,
         mobile
      })
   },
   //查询用户信息
   queryUsers({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {
      return http.get(`/users?query=${query}&&pagenum=${pagenum}&&pagesize=${pagesize}`)
   },
   //角色列表
   roles() {
      return http.get(`/roles`)
   },
   //删除指定权限
   deleteRoles({ roleId, rightId }: { roleId: number, rightId: number }) {
      return http.delete(`/roles/${roleId}/rights/${rightId}`)
   },
   //权限列表角色删除
   Sroles({ id }: { id: any }) {
      return http.delete(`/roles/${id}`)
   },
   //权限列表编辑
   Broles({ id, roleName, roleDesc }: { id: any, roleName: string, roleDesc?: string }) {
      return http.put(`roles/${id}`, {
         roleName,
         roleDesc
      })
   },
   //授权
   rids({ roleId, rids }: { roleId: any, rids: any }) {
      let r = qs.stringify({ rids })
      return http.post(`roles/${roleId}/rights`, r)
   },
   //添加用户
   rolesname({ roleName, roleDesc }: { roleName: string, roleDesc: string }) {
      return http.post(`roles/`, {
         roleName,
         roleDesc
      })
   },
   //商品分类
   categories({ type, pagenum, pagesize }: { type?: any, pagenum?: number, pagesize?: number }) {
      return http.get(`/categories/?type=${type}&&pagenum=${pagenum}&&pagesize=${pagesize}`)
   },
   //添加分类
   addsort({ cat_pid, cat_name, cat_level }: { cat_pid: any, cat_name: any, cat_level: any }) {
      return http.post(`/categories`, {
         cat_pid, cat_name, cat_level
      })
   },
   //删除
   reduce({ id }: { id: any }) {
      return http.delete(`/categories/${id}`)
   },
   //编辑
   edit({ id, cat_name }: { id: any, cat_name: string }) {
      return http.put(`/categories/${id}`, {
         cat_name
      })
   },

























   // 订单列表
   orders({ query, pagenum, pagesize }:
      { query?: any, pagenum: any, pagesize: any }) {
      if (query) {
         return http.get(`/orders?query=${query}&&pagenum=${pagenum}&&pagesize=${pagesize}`)
      } else {
         return http.get(`/orders?pagenum=${pagenum}&&pagesize=${pagesize}`)
      }
   },

   //商品
   goods({ query, pagenum, pagesize }: { query?: string, pagenum: number, pagesize: number }) {
      if (query) {
         return http.get(`/goods?query=${query}&&pagenum=${pagenum}&&pagesize=${pagesize}`)
      } else {
         return http.get(`/goods?pagenum=${pagenum}&&pagesize=${pagesize}`)
      }
   },
   //删除商品
   reduceGoods({ id }: { id: string | number }) {
      return http.get(`/goods/${id}`)
   },
   //权限列表
   rights({ type }: { type: any }) {
      return http.get(`/rights/${type}`)
   },
}