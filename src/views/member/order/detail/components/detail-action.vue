<template>
	<div class="detail-action">
		<div class="state">
			<span class="iconfont icon-loading" :class="stateIco"></span>
			<p>{{ state }}</p>
		</div>
		<div class="info">
			<p>订单编号：{{ orderId }}</p>
			<p>下单时间：{{ createTime }}</p>
		</div>
		<div class="btn">
			<button class="xtx-button ellipsis small primary">再次购买</button>
			<button class="xtx-button ellipsis small gray">取消订单</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DetailAction',
	data() {
		return {
			// 状态图片 | 初始时加载图标
			stateIco: 'icon-loading',
		};
	},
	props: {
		orderState: {
			type: Number,
			required: true,
			default: 0,
		},
		// 下单时间
		createTime: {
			type: String,
			default: '加载中...',
		},
		// 订单编号
		orderId: {
			type: String,
			default: '加载中...',
		},
	},
	computed: {
		state() {
			let num = this.orderState;
			if (num === 1) {
				this.stateIco = 'icon-daifukuan';
				return '待付款';
			} else if (num === 2) {
				this.stateIco = 'icon-daifahuo';
				return '待发货';
			} else if (num === 3) {
				this.stateIco = 'icon-daishouhuo';
				return '待收货';
			} else if (num === 4) {
				this.stateIco = 'icon-comment';
				return '待评价';
			} else if (num === 5) {
				this.stateIco = 'icon-yiwancheng';
				return '已完成';
			} else if (num === 6) {
				this.stateIco = 'icon-yiquxiao1';
				return '已取消';
			} else if (num === 0) {
				return '请稍等';
			}
		},
	},
};
</script>

<style lang="less" scoped>
.detail-action {
	height: 180px;
	width: 100%;
	display: flex;
	align-items: center;
	.state {
		width: 220px;
		text-align: center;
		.iconfont {
			font-size: 40px;
			color: #27ba9b;
		}
		.icon-yiquxiao1 {
			color: #cf4444;
		}
		p {
			font-size: 16px;
			color: #666;
			margin-bottom: 10px;
		}
	}
	.info {
		width: 240px;
		line-height: 30px;
		p {
			color: #999;
		}
	}
	.btn {
		flex: 1;
		text-align: right;
		margin-right: 100px;
		.xtx-button {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			border: none;
			outline: none;
			background: #fff;
			text-align: center;
			border: 1px solid transparent;
			border-radius: 4px;
			cursor: pointer;
			margin-left: 20px;
		}
		.primary {
			border-color: #27ba9b;
			background: #27ba9b;
			color: #fff;
		}
		.gray {
			border-color: #ccc;
			background: #ccc;
			color: #fff;
		}
		.small {
			width: 100px;
			height: 32px;
			font-size: 14px;
		}
	}
}
</style>
