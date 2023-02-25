import { getToken, getUserInfo } from '@/utils/userInfo';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		// 用户信息
		userInfo: getUserInfo() || {},
		token: getToken(),
	},
	mutations: {
		// 设置token
		setToken(state, val) {
			state.token = val;
		},
		// 设置用户信息
		setUserInfo(state, val) {
			state.userInfo = val;
		},
		// 移除token
		loginOut(state) {
			state.token = null;
			state.userInfo = {};
		},
	},
	actions: {},
	getters: {},
};
