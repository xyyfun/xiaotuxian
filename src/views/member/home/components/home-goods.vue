<template>
	<div class="xtx_panel_goods">
		<router-link :to="`/goods/${value.id}`" class="item" v-for="(value, index) in item" :key="index"
			><div class="img-box">
				<img :src="value.picture" alt="" />
			</div>
			<p class="name">{{ value.name }}</p>
			<p class="price"><small>￥</small>{{ value.price }}</p></router-link
		>
	</div>
</template>

<script>
export default {
	name: 'HomeGoods',
	props: ['item'],
};
</script>

<style lang="less" scoped>
.xtx_panel_goods {
	display: flex;
	justify-content: space-between;
	.item {
		display: block;
		width: 210px;
		padding: 30px 12px 0;
		.img-box {
			width: 186px;
			height: 160px;
			text-align: center;
			display: table-cell;
			vertical-align: middle;
		}
		.name {
			margin: 20px 0 10px;
			font-size: 16px;
		}
		.price {
			font-size: 22px;
			color: #cf4444;
			small {
				font-size: 80%;
			}
		}
	}
}
</style>
