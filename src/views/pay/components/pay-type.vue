<template>
	<div class="pay-type">
		<p class="head">选择以下支付方式付款</p>
		<div class="item">
			<p>平台支付</p>
			<a @click="$emit('payNow', '微信')" class="btn wx" href="javascript:;"></a>
			<a @click="$emit('payNow', '支付宝')" class="btn alipay" href="javascript:;"></a>
		</div>
		<div class="item">
			<p>银行支付</p>
			<a
				v-for="(item, index) in platform"
				:key="index"
				@click="$emit('payNow', item)"
				class="btn"
				href="javascript:;"
				>{{ item }}</a
			>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PayType',
	data() {
		return {
			platform: ['招商银行', '工商银行', '建设银行', '农业银行', '交通银行'],
		};
	},
	beforeDestroy() {
		this.$off('payNow');
	},
};
</script>

<style lang="less" scoped>
.pay-type {
	margin-top: 20px;
	background-color: #fff;
	padding-bottom: 70px;
	p {
		line-height: 70px;
		height: 70px;
		padding-left: 30px;
		font-size: 16px;
		.head {
			border-bottom: 1px solid #f5f5f5;
		}
	}
	.wx {
		background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
			no-repeat 50% / contain;
	}
	.alipay {
		background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
			no-repeat 50% / contain;
	}
	.btn {
		width: 150px;
		height: 50px;
		border: 1px solid #e4e4e4;
		text-align: center;
		line-height: 48px;
		margin-left: 30px;
		color: #666;
		display: inline-block;
	}
}
</style>
