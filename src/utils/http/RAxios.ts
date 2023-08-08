import axios from 'axios'
// 实例类型
import type { AxiosInstance } from 'axios'
// 自定义接口类型
import type { RequestInterceptors, RequestConfig, Result } from './type'
import { AxiosCanceler } from './axiosCancel'

// 创建不同的axios实例
class RAxios {
	instance: AxiosInstance
	interceptors?: RequestInterceptors
	shouldAbortController?: boolean

	constructor(config: RequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config)
		// 保存信息
		this.interceptors = config.interceptors
		this.shouldAbortController = config.shouldAbortController

		// 创建拦截器
		// 1.从config中取出的拦截器是对应的实例的拦截器（传参才有）
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)

		// 2.全局拦截器，添加所有实例拦截
		const axiosCanceler = new AxiosCanceler()
		this.instance.interceptors.request.use(
			(config) => {
				this.shouldAbortController && axiosCanceler.addPending(config)
				return config
			},
			(err) => {
				return Promise.reject(err)
			}
		)

		this.instance.interceptors.response.use(
			(config) => {
				config && axiosCanceler.removePending(config.config)
				const data = config.data
				if (data.type === 'success') {
					return data
				} else {
					//2. 返回200，服务器没有正常返回数据
					ElMessage({
						message: `服务器错误 ${data.message}`,
						type: 'error'
					})
				}
			},
			(err) => {
				//1. 响应失败返回错误码
				const networkErrMap: any = {
					'400': '参数不正确',
					'401': '您未登录，或者登录已经超时，请先登录！',
					'403': '拒绝访问',
					'404': '很抱歉资源未找到',
					'408': '请求超时',
					'500': '服务器错误',
					'501': '网络未实现',
					'502': '网关错误',
					'503': '服务不可用',
					'504': '网络超时，请稍后再试！',
					'505': 'http版本不支持该请求'
				}

				if (err.response.status) {
					ElMessage({
						message:
							networkErrMap[err.response.status] ??
							`其他连接错误 --${err.response.status}`,
						type: 'error'
					})
				}

				return Promise.reject(err)
			}
		)
	}

	request<T = Result>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 单个请求对请求config的处理
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config as any)
			}
			// 判断是否需要取消重复请求
			// if (config.shouldAbortController) {
			//   axiosCanceler.addPending(config)
			// }
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 单个请求对数据的处理
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res)
					}
					//这样不会影响下一个请求
					// axiosCanceler.removePending(config.config)

					//将结果resolve
					resolve(res)
				})
				.catch((err) => {
					//这样不会影响下一个请求
					// axiosCanceler.removePending(config.config)
					reject(err)
				})
		})
	}

	get<T = Result>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T = Result>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	delete<T = Result>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}

	put<T = Result>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}
}
export default RAxios
