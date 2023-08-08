import type {
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

// 定义拦截器接口
export interface RequestInterceptors<T = AxiosResponse> {
	requestInterceptor?: (
		config: InternalAxiosRequestConfig
	) => InternalAxiosRequestConfig
	requestInterceptorCatch?: (error: any) => any
	responseInterceptor?: (res: T) => T
	responseInterceptorCatch?: (error: any) => any
}

// 定义配置接口
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>
	shouldAbortController?: boolean
}

// 定义response.data接口
export interface Result<T = any> {
	code: number
	type: 'success' | 'error' | 'warning'
	message: string
	data: T
}
