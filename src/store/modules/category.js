import { getCategory } from '@/api/home';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		categoryDataList: [],
	},
	mutations: {
		GETCATEGORYDATALIST(state, data) {
			state.categoryDataList = data;
		},
	},
	actions: {
		async getCategoryDataList({ commit }) {
			const result = await getCategory();
			if (result.data.code === '1') {
				console.log(result);
				commit('GETCATEGORYDATALIST', result.data.result);
			}
		},
	},
	getters: {},
};
