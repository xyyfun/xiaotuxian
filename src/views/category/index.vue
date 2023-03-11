<template>
	<div class="top-category">
		<div class="container">
			<!-- 面包屑 -->
			<AppBread />
			<!-- 全部分类 -->
			<CategoryAll :categoryAll="result.children" />
			<!-- 各个分类 -->
			<CategoryGoods
				v-for="item in result.children"
				:key="item.id"
				:title="item.name"
				:goods="item.goods" />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import CategoryAll from './components/category-all';
import CategoryGoods from './components/category-goods';
import { category } from '@/api/category';
export default {
	name: 'Category',
	data() {
		return {
			result: {},
		};
	},
	components: { CategoryAll, AppBread, CategoryGoods },
	watch: {
		$route: {
			immediate: true,
			handler() {
				this.result = {};
				category(this.$route.params.id).then(data => {
					this.result = data.data.result;
					this.bread(); // 面包屑传参
				});
			},
		},
	},
	methods: {
		bread() {
			this.$bus.$emit('bread', [
				{
					id: '/category/' + this.result.id,
					name: this.result.name,
				},
			]);
		},
	},
};
</script>

<style lang="less">
.top-category {
	background-color: #f5f5f5;
	h3 {
		font-size: 28px;
		color: #666;
		font-weight: 400;
		text-align: center;
		line-height: 100px;
	}
}
</style>
