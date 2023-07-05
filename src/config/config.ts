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
	baseUrl: 'http://127.0.0.1:8000', // 接口地址前缀 无需设置
	otherUrl: 'https://restapi.amap.com', // 其他接口地址前缀，为了兼容多个域名或者第三方服务接口
	testUrl: 'http://test.com', // 测试地址前缀
	productionUrl: 'http://pro.com', // 正式地址前缀
	loginPage: '/pages/login/login', // 服务器statusCode返回401强制跳转的登录页
	headerKey: 'Authorization', // header的名称一般是Authorization或者token，以你们项目为准(如果不需要设置请求头，就把headerKey和headerValue去掉)
	headerValue: uni.getStorageSync('token') || '' // header的值 在登录成功后一定要将token赋值给config.headerValue，并且存到缓存
} as IConfig

//  加testUrl和productionUrl是为了方便测试人员调试，打包app也就不需要给测试人员打两个版本了，可以一键切换正式/测试地址