import type { AxiosRequestConfig } from 'axios'

// Used to store the identification and cancellation function of each request
const pendingMap = new Map<string, AbortController>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url].join('&')

export class AxiosCanceler {
	/**
	 * Add request
	 * @param {Object} config
	 */
	addPending(config: AxiosRequestConfig) {
		this.removePending(config)
		const url = getPendingUrl(config)
		const controller = new AbortController()
		config.signal = controller.signal
		if (!pendingMap.has(url)) {
			// 如果当前请求不在等待中，将其添加到等待中
			pendingMap.set(url, controller)
		}
	}

	/**
	 * @description: Clear all pending
	 */
	removeAllPending() {
		pendingMap.forEach((abortController) => {
			abortController && abortController.abort()
		})
		this.reset()
	}

	/**
	 * Removal request
	 * @param {Object} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config)

		if (pendingMap.has(url)) {
			// If there is a current request identifier in pending,
			// the current request needs to be cancelled and removed
			const abortController = pendingMap.get(url)
			abortController && abortController.abort(url)
			pendingMap.delete(url)
		}
	}

	/**
	 * @description: reset
	 */
	reset(): void {
		pendingMap.clear()
	}
}
