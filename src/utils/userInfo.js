// 存储用户信息
export const setUserInfo = val => localStorage.setItem('userInfo', val);

// 存储token
export const setToken = val => localStorage.setItem('token', val);

// 获取浏览器token
export const getToken = () => {
	let token = localStorage.getItem('token');
	if (token) return token;
	return null;
};

// 获取用户信息
export const getUserInfo = () => {
	let userInfo = localStorage.getItem('userInfo');
	return JSON.parse(userInfo);
};

// 移除浏览器用户信息
export const removeUserInfo = () => localStorage.removeItem('userInfo');

// 移除浏览器用户token
export const removeToken = () => localStorage.removeItem('token');
