## ts版本uniapp封装请求类,轻量级promise请求库，支持多域名，支持一键切换正式、测试接口地址，方便测试人员调试，支持自定义header，支持vue2，vue3，nvue，支持async+await

## 安装教程 使用 HBuilderX 导入插件 

## 使用方法：

## 1、最重要！！！和pages目录同级新建config文件夹，下面新建config.ts 内容如下

```js
interface IConfig{
	baseUrl:string,
	otherUrl:string,
	testUrl:string,
	productionUrl:string,
	loginPage:string,
	headerKey?:string | undefined,
	headerValue?:string | undefined
}

export default {
	baseUrl: '', // 接口地址前缀 无需设置
	otherUrl: 'https://restapi.amap.com', // 其他接口地址前缀，为了兼容多个域名或者第三方服务接口
	testUrl: 'http://test.com', // 测试地址前缀
	productionUrl: 'http://pro.com', // 正式地址前缀
	loginPage: '/pages/login/login', // 服务器statusCode返回401强制跳转的登录页
	headerKey: 'Authorization', // header的名称一般是Authorization或者token，以你们项目为准(如果不需要设置请求头，就把headerKey和headerValue去掉)
	headerValue: uni.getStorageSync('token') || '' // header的值 在登录成功后一定要将token赋值给config.headerValue，并且存到缓存
} as IConfig

//  加testUrl和productionUrl是为了方便测试人员调试，打包app也就不需要给测试人员打两个版本了，可以一键切换正式/测试地址
```

## 2、在App.vue中写如下代码(自动识别运行环境，为了无需打包时再修改接口前缀)

```js
import config from '@/config/config'
onLaunch: function() {
		if (process.env.NODE_ENV === 'development') {
			// 开发环境 运行
			config.baseUrl = config.testUrl;
		} else {
			// 生产环境 发行
			config.baseUrl = config.productionUrl;
		}
	}
```

## 和config目录同级新建interface文件夹，用来定义接口类型，最好按模块区分，这里以login.ts为例

```js
export interface IUser {
	extensions: string;
	key: string;
	location: string;
}
export interface IWeather {
	current: number;
	size: number;
	pageNo: number;
	pageSize: number;
	communityId: string;
}
export interface IMap {
	current: number;
	size: number;
	pageNo: number;
	pageSize: number;
	communityId: string;
}
export interface IData {
	name:string;
	id:string;
}

export interface IUserResult {
	data:IData,
	code: number;
	msg: string;
}

```

## 和config目录同级新建api文件夹，用来管理api，最好按模块区分，这里以login.ts为例

```	js
import config from '@/config/config' 
import {IUser,IWeather,IMap,IUserResult} from '@/interface/login' 
import http from '@/uni_modules/rt-request-ts/js_sdk/index'
// 使用方法如下，根据header不同调用不同方法，get、post、postForm 
//get和post默认都是'content-type': 'application/json',postForm 的content-type为 application/x-www-form-urlencoded
//方法接收三个参数1、api（接口地址）,data（参数）,url(接口地址前缀，可选，不写的话默认值为config.baseUrl)
	
// 微信登录
export function login(data:IUser):Promise<IUserResult>{
	return http.post('/transport_order/driver/wechat_login',data)
}
// 其他地址前缀 就传config.otherUrl 
export function getWeather(data:IWeather):Promise<any>{
	return http.get('/api/get_weather',data,config.otherUrl)
}
// postForm方式
export function getMap(data:IMap):Promise<any>{
	return http.postForm('/transport_order/driver/get_map',data)
}



```

## 在页面vue中使用vue2写法

```
		import { login } from '@/api/login'
		data() {
				return {
						info:{
							name:'ssss',
							password:'123456'
						}
					}
				},
				methods:{
					async toLogin() {
						const res = await login(this.info)
						if(res.success){
							console.log('登录成功')
						}else{
							uni.showModal({
								title:res.msg,
								showCancel:false
							})
						}
					}
					
				}
```

## vue3 setup写法	

```js		
	
	<script setup lang="ts">
		
		import { reactive,toRefs } from 'vue'
		import { login } from '@/api/login'
		const data = reactive({
			info:{
				name:'ssss',
				password:'123456'
			}
		})

		// 登录
		const toLogin = async () => {
			const res = await login(data.info)
			if(res.success){
				console.log('登录成功')
			}else{
				uni.showModal({
					title:res.msg,
					showCancel:false
				})
			}
		}

	</script>
 
```





## 切换正式、测试环境  示例代码，自己根据自己需求修改

```vue
<template>
	<view class="content">
		<image src="../../static/logo.png" mode="" class="logo" @click="showChange" v-if="num !== 7"></image>
		<image src="../../static/logo.png" mode="" class="logo" v-else></image>
		<button v-if="num === 7" @click="changeEnvironment" style="margin: 20px;">切换环境</button>
		<view class="text-area">
			<text class="title">点击logo七次切换正式、测试环境</text>
		</view>
	</view>
</template>

<script>
import config from '@/config/config'
export default {
	data() {
		return {
			num:0,
		};
	},
	onLoad() {

	},
	methods: {
		// 点击logo7次弹出切换接口地址按钮
		showChange() {
			if (this.num == 7) {
				return;
			} else {
				this.num++;
			}
		},
		// 一键切换接口地址(写法仅做参考)
		changeEnvironment() {
			uni.showActionSheet({
				itemList: ['测试环境', '正式环境'],
				success: res => {
					if (!res.tapIndex) {
						uni.showModal({
							title: '您已切换为测试环境',
							showCancel: false
						});
						config.baseUrl = config.testUrl;
						console.log('已切换为测试环境，地址是：',config.baseUrl);
					} else {
						uni.showModal({
							title: '您已切换为正式环境',
							showCancel: false
						});
						config.baseUrl = config.productionUrl;
						console.log('已切换正式环境，地址是：',config.baseUrl);
					}
				}
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>

```

## 如果插件对您有一点帮助，请给个五星好评，感谢支持

## 如有不懂 请加qq 965969604