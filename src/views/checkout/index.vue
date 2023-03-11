<template>
	<div class="xtx-pay-checkout-page">
		<div class="container">
			<!-- 面包屑 -->
			<AppBread />
			<!-- 主体 -->
			<div class="wrapper">
				<CheckoutHeader title="收货地址" />
				<CheckoutAddress :userAddresses="result.userAddresses" @changAddress="changAddress" />
				<CheckoutHeader title="商品信息" />
				<CheckoutGoods :goods="result.goods" />
				<CheckoutHeader title="配送时间" />
				<CheckoutTime @changTime="changTime" />
				<CheckoutHeader title="支付方式" />
				<CheckoutPay @changPay="changPay" />
				<CheckoutHeader title="金额明细" />
				<CheckoutTotal :summary="result.summary" />
				<div class="submit">
					<button class="xtx-button ellipsis middle primary" @click="subOrder">提交订单</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import CheckoutHeader from './components/checkout-header';
import CheckoutAddress from './components/checkout-address';
import CheckoutGoods from './components/checkout-goods';
import CheckoutTime from './components/checkout-time';
import CheckoutPay from './components/checkout-pay';
import CheckoutTotal from './components/checkout-total';
import { placeOrder, subOrder } from '@/api/order';
export default {
	name: 'Checkout',
	data() {
		return {
			result: {},
			addressId: '', // 地址id 为空时支付使用默认地址
			deliveryTimeType: 1, // 配送时间
			payType: 1, // 支付方式
			goods: [], // 商品skuId 数量
		};
	},
	components: {
		AppBread,
		CheckoutHeader,
		CheckoutAddress,
		CheckoutGoods,
		CheckoutTime,
		CheckoutPay,
		CheckoutTotal,
	},
	methods: {
		// 接收修改地址id
		changAddress(id) {
			this.addressId = id;
		},
		// 修改配送时间
		changTime(id) {
			this.deliveryTimeType = id;
		},
		// 修改支付方式
		changPay(id) {
			this.payType = id;
		},
		// 提交订单
		subOrder() {
			// 未选地址使用默认地址
			if (!this.addressId) {
				this.result.userAddresses.forEach(e => {
					if (!e.isDefault) {
						this.addressId = e.id;
					}
				});
			}
			let { addressId, deliveryTimeType, payType, goods } = this;
			subOrder(addressId, deliveryTimeType, payType, goods).then(
				resolv => {
					this.$router.replace(`/pay?id=${resolv.data.result.id}`);
					this.$message({
						message: '订单提交成功，请尽快支付！',
						type: 'success',
					});
					// 订单提交成功重新获取购物车刷新数据
					this.$store.dispatch('cart/getCartDataList');
				},
				reject => {
					this.$message({
						message: '订单提交失败，请稍后再试！',
						type: 'error',
					});
				}
			);
		},
	},
	created() {
		placeOrder().then(data => {
			this.result = data.data.result;
			this.goods = data.data.result.goods.map(item => {
				return {
					skuId: item.skuId,
					count: item.count,
				};
			});
		});
	},
	mounted() {
		this.$bus.$emit('bread', [
			{ id: '/cart', name: '购物车' },
			{ id: '/checkout', name: '填写订单' },
		]);
	},
};
</script>

<style lang="less" scoped>
.xtx-pay-checkout-page {
	background-color: #f5f5f5;
}
.wrapper {
	background: #fff;
	padding: 0 20px;
	.submit {
		text-align: right;
		padding: 60px;
		border-top: 1px solid #f5f5f5;
		.xtx-button {
			appearance: none;
			border: none;
			outline: none;
			background: #fff;
			text-align: center;
			border: 1px solid transparent;
			border-radius: 4px;
			cursor: pointer;
		}
		.primary {
			border-color: #27ba9b;
			background: #27ba9b;
			color: #fff;
		}
		.middle {
			width: 180px;
			height: 50px;
			font-size: 16px;
		}
	}
}
</style>
