// 存储用户信息
export const setUserInfo = val => localStorage.setItem('userInfo', val);

// 获取浏览器token
export const getToken = () => {
	let userInfo = localStorage.getItem('userInfo');
	if (userInfo) return JSON.parse(userInfo).token;
	return null;
};

// 获取用户信息
export const getUserInfo = () => {
	let userInfo = localStorage.getItem('userInfo');
	return JSON.parse(userInfo);
};

// 移除浏览器用户信息
export const removeUserInfo = () => localStorage.removeItem('userInfo');
