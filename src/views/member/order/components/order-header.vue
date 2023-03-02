<template>
	<div class="xtx-tabs">
		<nav>
			<a class="active" href="javascript:;">全部订单</a><a class="" href="javascript:;">待付款</a
			><a class="" href="javascript:;">待发货</a><a class="" href="javascript:;">待收货</a
			><a class="" href="javascript:;">待评价</a><a class="" href="javascript:;">已完成</a
			><a class="" href="javascript:;">已取消</a>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'OrderHeader',
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
