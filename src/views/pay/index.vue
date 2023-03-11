<template>
	<div class="xtx-pay-page">
		<div class="container">
			<!-- 面包屑 -->
			<AppBread />
			<template v-if="!isPayCompletion">
				<!-- 支付信息 -->
				<PayInfo :payMoney="result.payMoney" />
				<!-- 支付类型 -->
				<PayType @payNow="payNow" />
			</template>
			<PaySuccess v-else :payMoney="result.payMoney" :id="result.id" :payInfo="payInfo" />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import PayInfo from './components/pay-info';
import PayType from './components/pay-type';
import PaySuccess from './components/pay-success';
import { getOrderDetailed, pay } from '@/api/order';
export default {
	name: 'Pay',
	data() {
		return {
			result: {},
			isPayCompletion: false,
			payInfo: {
				isSuccess: true, // 是否支付成功
				payMode: '', // 支付方式
			},
		};
	},
	components: { AppBread, PayInfo, PayType, PaySuccess },
	methods: {
		// 模拟支付
		payNow(mode) {
			this.payInfo.payMode = mode;
			pay(this.result.id).then(
				resolv => {
					this.isPayCompletion = true;
				},
				reject => {
					this.isPayCompletion = true;
					this.payInfo.isSuccess = false;
				}
			);
		},
	},
	created() {
		getOrderDetailed(this.$route.query.id).then(data => {
			this.result = data.data.result;
		});
	},
	mounted() {
		this.$bus.$emit('bread', [
			{ id: '/cart', name: '购物车' },
			{ id: '/pay', name: '支付订单' },
		]);
	},
};
</script>

<style lang="less" scoped>
.xtx-pay-page {
	background-color: #f5f5f5;
}
</style>
