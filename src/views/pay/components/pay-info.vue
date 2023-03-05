<template>
	<div class="pay-info">
		<span class="icon iconfont icon-chenggong"></span>
		<div class="tip">
			<p>订单提交成功！请尽快完成支付。</p>
			<p>支付还剩 <span>29分03秒</span>, 超时后将取消订单</p>
		</div>
		<div class="amount">
			<span>应付总额：</span><span>¥{{ payMoney }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PayInfo',
	props: ['payMoney'],
};
</script>

<style lang="less" scoped>
.pay-info {
	background: #fff;
	display: flex;
	align-items: center;
	height: 240px;
	padding: 0 80px;
	.icon {
		font-size: 60px;
		color: #1dc779;
	}
	.tip {
		padding-left: 10px;
		flex: 1;
		p:first-child {
			font-size: 20px;
			margin-bottom: 5px;
		}
	}
	.amount span:first-child,
	.tip p:last-child {
		color: #999;
		font-size: 16px;
	}
	.amount span:last-child {
		color: #cf4444;
		font-size: 20px;
	}
}
</style>
