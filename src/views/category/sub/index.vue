<template>
	<div class="sub-category">
		<div class="container">
			<!-- 面包屑 -->
			<AppBread />
			<!-- 筛选  -->
			<SubFilter :saleProperties="result.saleProperties" />
			<!-- 主体区域 -->
			<SubGoodsList :goods="result.goods" />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import SubFilter from './components/sub-filter';
import SubGoodsList from './components/sub-goods-list';
import { getCategoryFilter } from '@/api/category';
export default {
	name: 'Sub',
	data() {
		return {
			result: {},
		};
	},
	components: { AppBread, SubFilter, SubGoodsList },
	watch: {
		$route: {
			immediate: true,
			handler() {
				this.result = {};
				getCategoryFilter(this.$route.params.id).then(data => {
					// 添加全部选项
					data.data.result.saleProperties.forEach(e => {
						e.properties.unshift({ name: '全部' });
					});
					this.result = data.data.result;
				});
			},
		},
	},
};
</script>

<style>
.sub-category {
	background-color: #f5f5f5;
}
</style>
