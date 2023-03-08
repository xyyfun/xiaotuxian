<template>
	<div class="pay-result">
		<span v-if="payInfo.isSuccess" class="iconfont icon-chenggong green"></span>
		<span v-else class="iconfont icon-shibai red"></span>
		<p v-if="payInfo.isSuccess" class="tit">订单支付成功</p>
		<p v-else class="tit">订单支付失败</p>
		<p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
		<p>
			支付方式：<span>{{ payInfo.payMode }}</span>
		</p>
		<p>
			支付金额：<span style="color: #cf4444">¥{{ payMoney }}</span>
		</p>
		<div class="btn">
			<router-link
				:to="`/member/order/${id}`"
				type="primary"
				class="xtx-common-btn"
				style="margin-right: 20px"
				>查看订单</router-link
			>
			<router-link to="/home" class="xtx-common-btn" type="info">进入首页</router-link>
		</div>
		<p class="alert">
			<span class="iconfont icon-tip"></span>
			温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
		</p>
	</div>
</template>

<script>
export default {
	name: 'PaySuccess',
	props: ['payMoney', 'id', 'payInfo'],
};
</script>

<style lang="less" scoped>
.pay-result {
	padding: 100px 0;
	background: #fff;
	text-align: center;
	> .iconfont {
		font-size: 100px;
	}
	.green {
		color: #1dc779;
	}
	.red {
		color: #cf4444;
	}
	.tit {
		font-size: 24px;
	}
	.tip {
		color: #999;
	}
	p {
		line-height: 40px;
		font-size: 16px;
	}
	.btn {
		margin-top: 50px;
		.xtx-common-btn {
			width: 180px;
			height: 50px;
			line-height: 48px;
			font-size: 16px;
			color: #fff;
			text-align: center;
			border-radius: 4px;
			display: inline-block;
		}
		.xtx-common-btn[type='primary'] {
			background: #27ba9b;
		}
		.xtx-common-btn[type='info'] {
			background: #ccc;
		}
	}
	.alert {
		font-size: 12px;
		color: #999;
		margin-top: 50px;
	}
}
</style>
