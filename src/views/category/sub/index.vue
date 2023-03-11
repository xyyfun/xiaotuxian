<template>
	<div class="sub-category">
		<div class="container">
			<!-- 面包屑 -->
			<AppBread />
			<!-- 筛选  -->
			<SubFilter :saleProperties="result.saleProperties" @changFilter="changSubDataList" />
			<!-- 主体区域 -->
			<SubGoodsList :goods="result.goods" />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import SubFilter from './components/sub-filter';
import SubGoodsList from './components/sub-goods-list';
import { getCategoryFilter, getPagingQuery } from '@/api/category';
export default {
	name: 'Sub',
	data() {
		return {
			result: {},
			params: {
				attrs: [],
				sortMethod: '',
			},
		};
	},
	components: { AppBread, SubFilter, SubGoodsList },
	watch: {
		$route: {
			immediate: true,
			handler() {
				getCategoryFilter(this.$route.params.id).then(data => {
					// 添加全部选项
					data.data.result.saleProperties.forEach(e => {
						e.properties.unshift({ id: e.id, name: '全部' });
					});
					this.result = data.data.result;
				});
			},
		},
	},
	methods: {
		filterQuery() {
			this.params.id = this.$route.params.id;
			getPagingQuery(this.params).then(data => {
				this.result.goods = data.data.result.items;
			});
		},
		changSubDataList(item, id) {
			if (this.result.saleProperties[item.index].id === id) return;
			this.result.saleProperties[item.index].id = id; // 修改样式
			// 旧值移除
			this.params.attrs.forEach((e, i) => {
				if (e.index === item.index) {
					this.params.attrs.splice(i, 1);
				}
			});
			// 新值添加前判断新值是否为“全部” 如果是直接return不添加
			if (item.propertyName === '全部') return this.filterQuery();
			// 新值添加
			this.params.attrs.push(item);
			this.filterQuery();
		},
		changFilter(val, boolean) {
			if (val === 'inventory') {
				this.params.inventory = boolean;
				return this.filterQuery();
			}
			if (val === 'onlyDiscount') {
				this.params.onlyDiscount = boolean;
				return this.filterQuery();
			}
			if (val === 'default') {
				this.params.sortMethod = '';
				this.filterQuery();
				return;
			}
			this.params.sortMethod = val;
			this.filterQuery();
		},
	},
	mounted() {
		this.$bus.$on('changFilter', this.changFilter);
	},
	beforeDestroy() {
		this.$bus.$off('changFilter');
	},
};
</script>

<style>
.sub-category {
	background-color: #f5f5f5;
}
</style>
