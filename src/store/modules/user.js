import { getToken, getUserInfo } from '@/utils/userInfo';
import { getUserAddress, removeUserAddress, addUserAddress, updateUserAddress } from '@/api/member';
import { reject } from 'lodash';
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
				context.commit('GETUSERADDRESS', data.data.result.reverse());
			});
		},
		// 删除地址
		removeUserAddress(context, id) {
			return removeUserAddress(id).then(
				() => {
					context.dispatch('getUserAddress');
				},
				reason => {
					return Promise.reject(reason.response);
				}
			);
		},
		// 添加用户收件地址
		addUserAddress({ dispatch }, data) {
			return new Promise((resolve, reject) => {
				addUserAddress(data).then(
					resolve => {
						dispatch('getUserAddress');
						resolve();
					},
					reason => {
						reject(reason.response);
					}
				);
			});
			/* return addUserAddress(data).then(
				() => {
					dispatch('getUserAddress');
				},
				reason => {
					return new Promise((resolve, reject) => {
						reject(reason.response);
					});
				}
			); */
		},
		// 更新地址
		updateUserAddress({ dispatch }, { data, id }) {
			return updateUserAddress(data, id).then(
				() => {
					dispatch('getUserAddress');
				},
				reason => {
					return Promise.reject(reason.response);
				}
			);
		},
	},
	getters: {},
};
