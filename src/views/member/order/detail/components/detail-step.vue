<template>
	<div class="detail-step">
		<el-steps
			:active="orderState === 6 ? 1 : orderState - 1"
			finish-status="success"
			:process-status="state"
			align-center>
			<el-step title="提交订单" :description="createTime"></el-step>
			<template v-if="orderState !== 6">
				<el-step title="付款成功" :description="payTime"></el-step>
				<el-step title="商品发货" :description="consignTime"></el-step>
				<el-step title="确认收货" :description="evaluationTime"></el-step>
				<el-step title="订单完成" :description="endTime"></el-step>
			</template>
			<el-step v-else title="订单取消" :description="closeTime"></el-step>
		</el-steps>
	</div>
</template>

<script>
export default {
	name: 'DetailStep',
	props: {
		// 商品当前状态
		orderState: {
			type: Number, //类型
			required: true, //必要性
			default: -1, //默认值
		},
		// 创建|提交订单时间
		createTime: {
			type: String,
		},
		// 付款时间
		payTime: {
			type: String,
		},
		// 发货时间
		consignTime: {
			type: String,
		},
		// 预计到货时间
		evaluationTime: {
			type: String,
		},
		// 订单完成时间
		endTime: {
			type: String,
		},
		// 交易关闭事件
		closeTime: {
			type: String,
		},
	},
	computed: {
		state() {
			if (this.orderState === 6) {
				return 'error';
			} else {
				return 'success';
			}
		},
	},
};
</script>

<style lang="less" scoped>
.detail-step {
	padding: 20px;
}
</style>
