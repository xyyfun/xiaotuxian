import { getCartList, changeCartSelected, modifyGoodsNum, removeGoods } from '@/api/cart';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		list: [],
	},
	mutations: {
		GETCARTDATALIST(state, data) {
			state.list = data;
		},
	},
	actions: {
		// 获取购物车列表
		getCartDataList(context) {
			getCartList().then(data => {
				context.commit('GETCARTDATALIST', data.data.result);
			});
		},
		// 全选or全不选
		changAllSelected(context, selected) {
			let ids = context.getters.stock.map(item => item.skuId);
			changeCartSelected(selected, ids).then(data => {
				context.dispatch('getCartDataList');
			});
		},
		// 单选商品或修改商品数量
		changGoodsNum(context, { selected, count, skuId }) {
			modifyGoodsNum(selected, count, skuId).then(data => {
				context.dispatch('getCartDataList');
			});
		},
		// 删除商品或删除失效商品
		removeCartGoods(context, skuId) {
			if (skuId) {
				let ids = [];
				ids.push(skuId);
				removeGoods(ids).then(data => {
					context.dispatch('getCartDataList');
				});
			} else {
				let ids = context.getters.allSelected.map(item => item.skuId);
				removeGoods(ids).then(data => {
					context.dispatch('getCartDataList');
				});
			}
		},
	},
	getters: {
		// 是否全选商品
		isAllChecked(state) {
			if (state.list.length) return !state.list.map(item => item.selected).includes(false);
			return false;
		},
		// 收集有库存的商品
		stock(state) {
			return state.list.filter(item => item.stock > 0 && item.isEffective);
		},
		// 购物车内所有商品总数
		allGoodsNum(state) {
			let num = 0;
			state.list.forEach(e => {
				num += e.count;
			});
			return num;
		},
		// 购物车内已选商品数
		allSelectedNum(state) {
			let num = 0;
			state.list.forEach(e => {
				if (e.selected) num += e.count;
			});
			return num;
		},
		// 购物车内已选商品 返回一个数组
		allSelected(state) {
			return state.list.filter(item => item.selected);
		},
		// 购物车内已选商品总价
		allSelectedTotalPrice(state) {
			let num = 0;
			state.list.forEach(e => {
				if (e.selected) num += e.price * e.count + e.postFee;
			});
			return num;
		},
		// 返回购物车已选中的商品id
		allSelectedId(state) {
			const arr = [];
			state.list.forEach(item => {
				if (item.selected) {
					arr.push(item.id);
				}
			});
			return arr;
		},
	},
};
