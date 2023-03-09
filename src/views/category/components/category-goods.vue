<template>
	<div class="ref-goods">
		<div class="head">
			<h3>- {{ title }} -</h3>
			<p class="tag">温暖柔软，品质之选</p>
		</div>
		<div class="body">
			<CategoryGoodsItem v-for="item in goods" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script>
import CategoryGoodsItem from './category-goods-item';
export default {
	name: 'CategoryGoods',
	components: { CategoryGoodsItem },
	props: {
		goods: {
			type: Array,
		},
		title: {
			type: String,
		},
	},
};
</script>

<style lang="less">
.ref-goods {
	background-color: #fff;
	margin-top: 20px;
	position: relative;
	.head {
		.tag {
			text-align: center;
			color: #999;
			font-size: 20px;
			position: relative;
			top: -20px;
		}
		.xtx-more {
			position: absolute;
			top: 20px;
			right: 20px;
			span {
				font-size: 16px;
				vertical-align: middle;
				margin-right: 4px;
				color: #999;
			}
			i {
				font-size: 14px;
				vertical-align: middle;
				position: relative;
				top: 2px;
				color: #ccc;
			}
		}
	}
	.body {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0 65px 30px;
	}
}
</style>
