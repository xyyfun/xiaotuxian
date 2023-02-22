import axios from 'axios';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
	// 超时时间
	timeout: 5000,
});

// // 请求拦截器
// instance.interceptors.request.use(
// 	config => {},
// 	error => {}
// );

// //响应拦截器
// instance.interceptors.response.use(
// 	response => {},
// 	error => {}
// );

export default instance;
