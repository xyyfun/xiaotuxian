<template>
	<div class="order-list">
		<div class="order-item" v-for="item in result.items" :key="item.id">
			<div class="head">
				<span>下单时间：{{ item.createTime }}</span
				><span>订单编号：{{ item.id }}</span>
				<a
					href="javascript:;"
					@click="$emit('orderIds', item.id)"
					class="del"
					v-if="item.orderState === 6"
					>删除</a
				>
				<span class="down-time" v-if="item.orderState === 1">
					<b>付款截止：{{ item.payLatestTime }}</b>
				</span>
			</div>
			<div class="body">
				<div class="column goods">
					<ul>
						<li v-for="goods in item.skus" :key="goods.id">
							<router-link :to="`/goods/${goods.spuId}`" class="image"
								><img v-lazy="goods.image" alt=""
							/></router-link>
							<div class="info">
								<p class="name ellipsis-2">{{ goods.name }}</p>
								<p class="attr ellipsis" v-for="(params, index) in goods.properties" :key="index">
									{{ params.propertyMainName }}:{{ params.propertyValueName }}
								</p>
							</div>
							<div class="price">¥{{ goods.curPrice }}</div>
							<div class="count">x{{ item.totalNum }}</div>
						</li>
					</ul>
				</div>
				<div class="column state">
					<p>{{ item.orderState | orderState() }}</p>
				</div>
				<div class="column amount">
					<p class="red">¥{{ item.payMoney }}</p>
					<p>（含运费：¥{{ item.postFee }}）</p>
					<p>在线支付</p>
				</div>
				<div class="column action">
					<button
						class="xtx-button ellipsis small primary"
						v-if="item.orderState === 1"
						@click="nowPay(item.id)">
						立即付款
					</button>
					<p><a href="javascript:;" @click="viewDetail(item.id)">查看详情</a></p>
					<p v-if="item.orderState === 1">
						<a href="javascript:;" @click="$bus.$emit('receiveOrderId', item.id)">取消订单</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderList',
	props: ['result'],
	filters: {
		orderState(num) {
			if (num === 1) {
				return '待付款';
			} else if (num === 2) {
				return '待发货';
			} else if (num === 3) {
				return '待收货';
			} else if (num === 4) {
				return '待评价';
			} else if (num === 5) {
				return '已完成';
			} else if (num === 6) {
				return '已取消';
			}
		},
	},
	methods: {
		// 查看详细
		viewDetail(id) {
			this.$router.push(`/member/order/${id}`);
		},
		// 立即付款
		nowPay(id) {
			this.$router.push(`/pay?id=${id}`);
		},
	},
};
</script>

<style lang="less" scoped>
.order-list {
	background: #fff;
	padding: 20px;
	position: relative;
	min-height: 400px;
	.order-item {
		margin-bottom: 20px;
		border: 1px solid #f5f5f5;
		.head {
			height: 50px;
			line-height: 50px;
			background: #f5f5f5;
			padding: 0 20px;
			overflow: hidden;
			span {
				margin-right: 20px;
			}
			.down-time {
				float: right;
			}
			.del {
				margin-right: 0;
				float: right;
				color: #999;
			}
		}
		.body {
			display: flex;
			align-items: stretch;
			.column {
				border-left: 1px solid #f5f5f5;
				text-align: center;
				padding: 20px;
			}
			.goods {
				flex: 1;
				padding: 0;
				align-self: center;
				ul li {
					border-bottom: 1px solid #f5f5f5;
					padding: 10px;
					display: flex;
					.image {
						width: 70px;
						height: 70px;
						border: 1px solid #f5f5f5;
					}
					.info {
						width: 220px;
						text-align: left;
						padding: 0 10px;
						p.name {
							height: 38px;
						}
						.attr {
							color: #999;
							font-size: 12px;
						}
					}
					.price {
						width: 100px;
					}
					.count {
						width: 80px;
					}
				}
				ul li :last-child {
					border-bottom: none;
				}
			}
			.state {
				width: 120px;
				> p {
					padding-top: 10px;
				}
			}
			.amount {
				width: 200px;
				.red {
					color: #cf4444;
				}
				> p {
					padding-top: 10px;
				}
			}
			.action {
				width: 140px;
				.primary {
					border-color: #27ba9b;
					background: #27ba9b;
					color: #fff;
					width: 100px;
					height: 32px;
					font-size: 14px;
					text-align: center;
					border: 1px solid transparent;
					border-radius: 4px;
					cursor: pointer;
				}
				> p {
					padding-top: 10px;
					a {
						display: block;
					}
				}
			}
		}
	}
}
</style>
