import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { removeUserInfo, removeToken } from '@/utils/userInfo';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	// baseURL: 'https://apipc-xiaotuxian-front.itheima.net/', // 上线请求地址
	baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
	// 超时时间
	timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
	config => {
		// 如果有token进行头部携带 | 没有则后续操作通知用户登录
		if (store.state.user.token) {
			config.headers.Authorization = `Bearer ${store.state.user.token}`;
		}
		return config;
	},
	error => {
		console.log(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// 处理token失效
		if (error.response.status === 401) {
			removeUserInfo(); // 清空本地存储
			removeToken(); // 清空本地token
			store.commit('user/loginOut');
			router.push('/login');
		}
		return Promise.reject(error);
	}
);

export default instance;
