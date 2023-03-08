<template>
	<div class="order-info">
		<h3>订单商品</h3>
		<table class="goods-table">
			<thead>
				<tr>
					<th width="400">商品信息</th>
					<th>单价</th>
					<th>数量</th>
					<th>小计</th>
					<th>实付</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in result.skus" :key="index">
					<td>
						<router-link :to="`/goods/${item.spuId}`" class="product"
							><img :src="item.image" alt="" />
							<div class="info">
								<p class="name ellipsis">{{ item.name }}</p>
								<p class="attrs ellipsis">{{ item.attrsText }}</p>
							</div></router-link
						>
					</td>
					<td>￥{{ item.curPrice }}</td>
					<td>{{ item.quantity }}</td>
					<td>￥{{ item.realPay }}</td>
					<td>￥{{ item.realPay }}</td>
				</tr>
			</tbody>
		</table>
		<h3>收货信息</h3>
		<div class="info-box">
			<dl>
				<dt>收货人：</dt>
				<dd>{{ result.receiverContact }}</dd>
			</dl>
			<dl>
				<dt>联系方式：</dt>
				<dd v-if="result.receiverMobile">
					{{ result.receiverMobile.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3') }}
				</dd>
			</dl>
			<dl>
				<dt>收货地址：</dt>
				<dd>{{ result.receiverAddress }}</dd>
			</dl>
		</div>
		<h3>支付方式及送货时间</h3>
		<div class="info-box">
			<dl>
				<template>
					<dt>支付方式：</dt>
					<dd>{{ result.payType === 1 ? '在线支付' : '货到付款' }}</dd>
				</template>
				<dt>支付渠道</dt>
				<dd>{{ result.payChannel === 1 ? '支付宝' : '微信' }}</dd>
			</dl>
			<dl>
				<dt>送货时间：</dt>
				<dd>{{ deliveryTimeType }}</dd>
			</dl>
		</div>
		<h3>发票信息</h3>
		<div class="info-box">
			<dl>
				<dt>发票类型：</dt>
				<dd>电子发票</dd>
			</dl>
			<dl>
				<dt>发票内容：</dt>
				<dd>日用品</dd>
			</dl>
			<dl>
				<dt>发票抬头：</dt>
				<dd>个人</dd>
			</dl>
		</div>
		<h3>订单信息</h3>
		<div class="info-box">
			<dl>
				<dt>订单编号：</dt>
				<dd>{{ result.id }}</dd>
			</dl>
			<dl>
				<dt>下单时间：</dt>
				<dd>{{ result.createTime }}</dd>
			</dl>
		</div>
		<div class="sum-info">
			<div class="info">
				<div class="item">
					<label>商品件数：</label><span>{{ result.totalNum }}件</span>
				</div>
				<div class="item">
					<label>商品总价：</label><span>¥{{ result.totalMoney }}</span>
				</div>
				<div class="item">
					<label>运费：</label><span>{{ result.postFee }}</span>
				</div>
				<div class="item">
					<label>应付总额：</label><span class="price">¥{{ result.payMoney }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DetailInfo',
	props: {
		result: {
			type: Object,
			required: true,
			default: {},
		},
	},
	computed: {
		deliveryTimeType() {
			const num = this.result.deliveryTimeType;
			if (num === 1) {
				return '不限';
			} else if (num === 2) {
				return '工作日';
			} else if (num === 3) {
				return '双休或假日';
			}
		},
	},
};
</script>

<style lang="less" scoped>
.order-info {
	padding: 0 50px;
	h3 {
		font-weight: 400;
		font-size: 16px;
		padding: 25px 5px;
	}
	.goods-table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		margin: 0 auto;
		.product {
			display: flex;
			padding: 20px 0;
			img {
				width: 70px;
				height: 70px;
				border: 1px solid #f5f5f5;
			}
			.info {
				align-self: center;
				padding-left: 20px;
				text-align: left;
			}
			p {
				margin-bottom: 5px;
				width: 280px;
			}
			.attrs {
				color: #999;
			}
		}
		th {
			font-weight: 400;
			line-height: 60px;
			background: #f5f5f5;
		}
		th:first-child {
			text-align: left;
			padding-left: 20px;
		}
		td {
			border-bottom: 1px solid #f5f5f5;
			text-align: center;
		}
		td:first-child {
			padding-left: 20px;
			border-left: 1px solid #f5f5f5;
		}
		td:last-child {
			border-right: 1px solid #f5f5f5;
		}
	}
	.info-box {
		border: 1px solid #f5f5f5;
		padding: 20px;
		dl {
			display: flex;
			line-height: 30px;
			dt {
				width: 80px;
				color: #999;
				font-size: 14px;
			}
			dd {
				flex: 1;
			}
		}
	}
	.sum-info {
		padding: 30px 30px 100px 30px;
		overflow: hidden;
		.info {
			width: 250px;
			height: 160px;
			float: right;
			font-size: 16px;
			.item {
				line-height: 40px;
				display: flex;
				label {
					width: 90px;
				}
				span {
					flex: 1;
					text-align: right;
					padding-right: 30px;
				}
				.price {
					font-size: 20px;
					color: #cf4444;
				}
			}
		}
	}
}
</style>
