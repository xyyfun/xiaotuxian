<template>
	<article class="article">
		<div class="member-order">
			<div class="xtx-tabs">
				<nav>
					<a class="active" href="javascript:;">全部订单</a
					><a class="" href="javascript:;">待付款</a><a class="" href="javascript:;">待发货</a
					><a class="" href="javascript:;">待收货</a><a class="" href="javascript:;">待评价</a
					><a class="" href="javascript:;">已完成</a><a class="" href="javascript:;">已取消</a>
				</nav>
			</div>
			<div class="order-list">
				<div class="order-item" v-for="item in result.items" :key="item.id">
					<div class="head">
						<span>下单时间：{{ item.createTime }}</span
						><span>订单编号：{{ item.id }}</span
						><span class="down-time"
							><i class="iconfont icon-down-time"></i><b>付款截止：18分52秒</b></span
						>
					</div>
					<div class="body">
						<div class="column goods">
							<ul>
								<li v-for="goods in item.skus" :key="goods.id">
									<a href="#/product/3828087" class="image"><img :src="goods.image" alt="" /></a>
									<div class="info">
										<p class="name ellipsis-2">{{ goods.name }}</p>
										<p
											class="attr ellipsis"
											v-for="(params, index) in goods.properties"
											:key="index"
										>
											{{ params.propertyMainName }}:{{ params.propertyValueName }}
										</p>
									</div>
									<div class="price">¥{{ item.totalMoney }}</div>
									<div class="count">x{{ item.totalNum }}</div>
								</li>
							</ul>
						</div>
						<div class="column state">
							<p>待付款</p>
						</div>
						<div class="column amount">
							<p class="red">¥{{ item.payMoney }}</p>
							<p>（含运费：¥{{ item.postFee }}）</p>
							<p>在线支付</p>
						</div>
						<div class="column action">
							<button class="xtx-button ellipsis small primary">立即付款</button
							><!---->
							<p><a href="javascript:;">查看详情</a></p>
							<p><a href="javascript:;">取消订单</a></p>
							<!----><!---->
						</div>
					</div>
				</div>
			</div>
			<div class="xtx-pagination">
				<a href="javascript:;" class="disabled">上一页</a
				><!----><a href="javascript:;" class="active">1</a><a href="javascript:;" class="">2</a
				><a href="javascript:;" class="">3</a><a href="javascript:;" class="">4</a
				><a href="javascript:;" class="">5</a><span>...</span><a href="javascript:;">下一页</a>
			</div>
		</div>
	</article>
</template>

<script>
import { getOrderList } from '@/api/order';
export default {
	name: 'OrderArticle',
	data() {
		return {
			page: 1,
			pageSize: 10,
			result: {},
		};
	},
	created() {
		getOrderList(this.page, this.pageSize).then(data => {
			if (data.data.code === '1') {
				this.result = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
.article {
	width: 1000px;
	.member-order {
		height: 100%;
		background: #fff;
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
		.xtx-pagination {
			display: flex;
			justify-content: center;
			padding: 30px;
		}
	}
}
</style>
