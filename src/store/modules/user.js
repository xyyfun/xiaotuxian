import { getToken, getUserInfo } from '@/utils/userInfo';
import { getUserAddress, removeUserAddress, addUserAddress, updateUserAddress } from '@/api/member';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		// 用户信息
		userInfo: getUserInfo() || {},
		token: getToken(),
		// 用户地址信息
		userAddress: [],
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
		// 移除token | 用户信息
		loginOut(state) {
			state.token = null;
			state.userInfo = {};
			state.userAddress = [];
		},
		GETUSERADDRESS(state, data) {
			state.userAddress = data;
		},
	},
	actions: {
		// 获取用户收件地址
		getUserAddress(context) {
			getUserAddress().then(data => {
				if (data.data.code === '1') {
					context.commit('GETUSERADDRESS', data.data.result.reverse());
				}
			});
		},
		// 删除地址
		async removeUserAddress(context, id) {
			const result = await removeUserAddress(id);
			console.log(result.data.code);
			if (result.data.code === '1') {
				context.dispatch('getUserAddress');
				return true;
			} else {
				return Promise.reject(new Error('file'));
			}
		},
		// 添加用户收件地址
		async addUserAddress({ dispatch }, data) {
			const result = await addUserAddress(data);
			if (result.data.code === '1') {
				dispatch('getUserAddress');
				return true;
			} else {
				return Promise.reject(new Error(result.message));
			}
		},
		// 更新地址
		async updateUserAddress({ dispatch }, { data, id }) {
			const result = await updateUserAddress(data, id);
			if (result.data.code === '1') {
				dispatch('getUserAddress');
				return true;
			} else {
				return Promise.reject(new Error('file'));
			}
		},
	},
	getters: {},
};
