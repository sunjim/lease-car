import config from '@/config/config' 
import type {IUser,IWeather,IMap,IUserResult} from '@/interface/login' 
import http from '@/utils/request/request'
// 使用方法如下，根据header不同调用不同方法，get、post、postForm 
//get和post默认都是'content-type': 'application/json',postForm 的content-type为 application/x-www-form-urlencoded
//方法接收三个参数1、api（接口地址）,data（参数）,url(接口地址前缀，可选，不写的话默认值为config.baseUrl)
	
// 微信登录
export function login(data:IUser):Promise<IUserResult>{
	return http.post('/api/user/store',data)
}
// 其他地址前缀 就传config.otherUrl 
export function getWeather(data:IWeather):Promise<any>{
	return http.get('/api/get_weather',data,config.otherUrl)
}
// postForm方式
export function getMap(data:IMap):Promise<any>{
	return http.postForm('/api/user/store',data)
}