import type { NitroFetchRequest } from 'nitropack'
type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' // 定义请求方法类型

interface RequestOptions {
    /** 请求方法，如 'get'、'post' 等 */
    method: RequestMethod
    /** 请求参数，可选 */
    params?: Record<string, any>,
    /** 请求体，可选 */
    body?: any
    /** 请求头，可选 */
    headers?: Record<string, string>,
    /** 是否重定向，可选 */
    redirectFlag?: boolean,
    /** 错误处理回调函数 */
    onError: (error: any) => void,
}

interface ResponseData<T = any> {
    code: number | string,
    status?: number,
}

const useFetchApi = <T = any>(baseURL = '') => {
    const fetchApi = async (endpoint: NitroFetchRequest, options: RequestOptions): Promise<ResponseData<T>> => {
        const { method = 'get', params, body, headers, redirectFlag = true, onError } = options
        try {
            const response = await $fetch<ResponseData<T>>(endpoint, {
                baseURL,
                method,
                params,
                body,
                headers,
            })
            // 根据业务code处理不同的逻辑
            handleResponseCode(response)
            return response
        } catch (error: any) {
            /*  if (typeof error === 'object' && error?.status === 401) {
               // 401 未授权处理
             } */
            if (onError) onError(error)
            // 通用错误处理
            handleApiError(error, {
                redirectFlag
            })
            // throw error // 重新抛出错误以便调用者可以处理
            return error
        }
    }

    return {
        fetchApi,
        get: (endpoint: NitroFetchRequest, options: Omit<RequestOptions, 'method'>) => {
            return fetchApi(endpoint, { ...options, method: 'get' }) // 注意加 return
        },
        post: (endpoint: NitroFetchRequest, options: Omit<RequestOptions, 'method'>) => {
            return fetchApi(endpoint, { ...options, method: 'post' })
        },
        put: (endpoint: NitroFetchRequest, options: Omit<RequestOptions, 'method'>) => {
            return fetchApi(endpoint, { ...options, method: 'put' })
        },
        delete: (endpoint: NitroFetchRequest, options: Omit<RequestOptions, 'method'>) => {
            return fetchApi(endpoint, { ...options, method: 'delete' })
        },
        patch: (endpoint: NitroFetchRequest, options: Omit<RequestOptions, 'method'>) => {
            return fetchApi(endpoint, { ...options, method: 'patch' })
        }
    }
}

// 错误处理函数
const handleApiError = (error: Error, { redirectFlag }: { redirectFlag: boolean }) => {
    if (import.meta.client && redirectFlag) {
        // 在客户端处理重定向
        console.error('client API Error:', error)
    } else {
        // 在服务端处理错误
        console.error('Server API Error:', error)
    }
}

// 响应code处理函数
const handleResponseCode = (data: ResponseData) => {
    if (import.meta.client) {
        console.info('Client Code Info:', data)
    } else {
        // 在服务端处理错误
        console.info('Server Code Info:', data)
    }
}

export class ApiService {
    baseURL: string;
    Fetch: any;
    constructor(url: string) {
        this.baseURL = url;
        this.Fetch = useFetchApi(this.baseURL)
    }

    get(query: any, options = {}): Promise<ResponseData> {
        return this.Fetch.get(this.baseURL, {
            params: query,
            headers: {
                ...options,
            },
        })
    }

    put(data: any, options = {}): Promise<ResponseData> {
        return this.Fetch.post(this.baseURL, {
            body: data,
            headers: {
                ...options,
            },
        })
    }
}