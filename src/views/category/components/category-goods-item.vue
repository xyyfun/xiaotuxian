<template>
	<router-link :to="`/goods/${item.id}`" class="goods-item">
		<img v-lazy="item.picture" alt="" />
		<p class="name ellipsis">{{ item.name }}</p>
		<p class="desc ellipsis">{{ item.desc }}</p>
		<p class="price">￥{{ item.price }}</p>
	</router-link>
</template>

<script>
export default {
	name: 'CategoryGoodsItem',
	props: ['item'],
};
</script>

<style lang="less">
.goods-item {
	display: block;
	width: 220px;
	padding: 20px 30px;
	text-align: center;
	transition: all 0.5s;
	img {
		width: 160px;
		height: 160px;
	}
	p {
		padding-top: 10px;
	}
	.name {
		font-size: 16px;
	}
	.desc {
		color: #999;
		height: 29px;
	}
	.price {
		color: #cf4444;
		font-size: 20px;
	}
	&:hover {
		transform: translate3d(0, -3px, 0);
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
	}
}
</style>
