import axios from 'axios';
import store from '@/store';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
	// 超时时间
	timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
	config => {
		if (store.state.user.token) {
			config.headers.Authorization = `Bearer ${store.state.user.token}`;
		}
		return config;
	},
	error => {
		console.log(error);
	}
);

// //响应拦截器
// instance.interceptors.response.use(
// 	response => {},
// 	error => {}
// );

export default instance;
