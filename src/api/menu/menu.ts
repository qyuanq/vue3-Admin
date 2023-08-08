import { request } from '@/utils/http'

export const getMenuList = (params: any) => {
	return request.get({
		url: '',
		params
	})
}

export const menuApi = {
	getMenuList
}
