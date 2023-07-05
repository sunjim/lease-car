import config from '@/config/config'

interface AnyObject {
	[key: string]: any;
  }
  
  interface RequestSuccessCallbackResult {
	/**
	 * 开发者服务器返回的数据
	 */
	data: string | AnyObject | ArrayBuffer;
	/**
	 * 开发者服务器返回的 HTTP 状态码
	 */
	statusCode: number;
	/**
	 * 开发者服务器返回的 HTTP Response Header
	 */
	header: any;
	/**
	 * 开发者服务器返回的 cookies，格式为字符串数组
	 */
	cookies: string [];
  }
  interface GeneralCallbackResult {
	/**
	 * 错误信息
	 */
	errMsg: string;
}
class UniHttp {
	/**
	 * @class UniHttp
	 * @method get
	 * @method post
	 * @method postForm
	 * @param {string} api - 接口地址
	 * @param {string} data - 参数
	 * @param {string} url - 接口前缀
	 * @return {Promise} 返回Promise对象
	 * @description uniapp.request的get方法
	 * @example 查看README.md
	 *
	 */
	get(api:string, data:string | AnyObject | ArrayBuffer,url:string | undefined = config.baseUrl):Promise<any> {
		let headerKey = config.headerKey;
		let headerValue = config.headerValue;
		let jsonHeader = {
			'content-type': 'application/json'
		}
		if (headerKey && headerValue) {
			jsonHeader = {
				'content-type': 'application/json',
				[headerKey]: headerValue
			}
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url + api,
				method: 'GET',
				data,
				header: jsonHeader,
				success: (res:RequestSuccessCallbackResult) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期或者无权限
						uni.clearStorageSync();
						uni.reLaunch({
							url: config.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err:GeneralCallbackResult) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}

	post(api:string, data:string | AnyObject | ArrayBuffer,url:string | undefined = config.baseUrl):Promise<any> {
		let headerKey = config.headerKey;
		let headerValue = config.headerValue;
		let jsonHeader = {
			'content-type': 'application/json'
		}
		if (headerKey && headerValue) {
			jsonHeader = {
				'content-type': 'application/json',
				[headerKey]: headerValue
			}
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url:url + api,
				method: 'POST',
				data,
				header: jsonHeader,
				success: (res:RequestSuccessCallbackResult) => {

					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期或者无权限
						uni.clearStorageSync();
						uni.reLaunch({
							url: config.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err:GeneralCallbackResult) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}

	postForm(api:string, data:string | AnyObject | ArrayBuffer,url:string | undefined = config.baseUrl):Promise<any> {
		let headerKey = config.headerKey;
		let headerValue = config.headerValue;
		let formHeader = {
			'content-type': 'application/x-www-form-urlencoded'
		}
		if (headerKey && headerValue) {
			formHeader = {
				'content-type': 'application/x-www-form-urlencoded',
				[headerKey]: headerValue
			}
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url + api,
				method: 'POST',
				data,
				header: formHeader,
				success: (res:RequestSuccessCallbackResult) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期
						uni.clearStorageSync();
						uni.reLaunch({
							url: config.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err:GeneralCallbackResult) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}
}

export default new UniHttp();
