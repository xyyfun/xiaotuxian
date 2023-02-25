<template>
	<div class="xtx-goods-page">
		<div class="container">
			<AppBread />
			<GoodsInfo />
			<GoodsRelevant />
			<GoodsFooter />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import GoodsInfo from './components/goods-info';
import GoodsRelevant from './components/goods-relevant';
import GoodsFooter from './components/goods-footer';
export default {
	name: 'Goods',
	components: { AppBread, GoodsInfo, GoodsRelevant, GoodsFooter },
};
</script>

<style lang="less" scoped>
.xtx-goods-page {
	background-color: #f5f5f5;
}
</style>
