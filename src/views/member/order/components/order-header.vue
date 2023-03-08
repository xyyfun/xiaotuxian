<template>
	<div class="xtx-tabs">
		<nav>
			<a
				v-for="(item, index) in orderState"
				:key="index"
				:class="{ active: orderStateNum === index }"
				@click="$emit('handleOrder', index)"
				href="javascript:;">
				{{ item }}
			</a>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'OrderHeader',
	data() {
		return {
			orderState: ['全部订单', '待付款', '待发货', '待收货', '待评价', '已完成', '已取消'],
		};
	},
	props: ['orderStateNum'],
};
</script>

<style lang="less" scoped>
.xtx-tabs > nav {
	height: 60px;
	line-height: 60px;
	display: flex;
	border-bottom: 1px solid #f5f5f5;
	> a {
		width: 110px;
		border-right: 1px solid #f5f5f5;
		text-align: center;
		font-size: 16px;
	}
	.active {
		border-top: 2px solid #27ba9b;
		height: 60px;
		background: #fff;
		line-height: 56px;
	}
}
</style>
