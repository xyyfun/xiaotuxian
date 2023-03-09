<template>
	<div class="goods-list">
		<SubSort />
		<ul>
			<li v-for="(good, index) in goods" :key="index">
				<CategoryGoodsItem :item="good" />
			</li>
		</ul>
		<div class="xtx-infinite-loading" v-if="!goods.length">
			<div class="none">
				<img src="../../../../assets/images/none.png" alt="" />
				<span class="text">亲，没有更多了</span>
			</div>
		</div>
	</div>
</template>

<script>
import SubSort from './sub-sort';
import CategoryGoodsItem from '../../components/category-goods-item';
export default {
	name: 'SubGoodsList',
	components: { SubSort, CategoryGoodsItem },
	props: {
		goods: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less">
.goods-list {
	background: #fff;
	padding: 0 25px;
	margin-top: 25px;
	ul {
		display: flex;
		flex-wrap: wrap;
		padding: 0 5px;
	}
	.xtx-infinite-loading {
		.none {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 200px;
			.text {
				color: #999;
				font-size: 16px;
			}
		}
	}
}
</style>
