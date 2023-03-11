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
		getCategoryDataList({ commit }) {
			getCategory().then(result => {
				commit('GETCATEGORYDATALIST', result.data.result);
			});
		},
	},
	getters: {
		// 加工分类模块
		wrapCategory(state) {
			let categoryNav = [];
			// 模拟品牌数据
			const brand = new Object({
				id: 'brand',
				name: '品牌',
				children: [{ id: 'brand-children', name: '品牌推荐' }],
			});
			state.categoryDataList.forEach(e => {
				categoryNav.push(
					new Object({
						id: e.id,
						name: e.name,
						children: e.children.splice(0, 2),
					})
				);
			});
			categoryNav.push(brand);
			return categoryNav;
		},
	},
};
