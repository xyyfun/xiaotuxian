<template>
	<div class="member-order-detail" v-if="result.id">
		<!-- 商品当前状态 -->
		<DetailAction
			:orderState="result.orderState"
			:createTime="result.createTime"
			:orderId="result.id" />
		<!-- 步骤进度 -->
		<DetailStep
			:orderState="result.orderState"
			:createTime="result.createTime"
			:payTime="result.payTime"
			:consignTime="result.consignTime"
			:evaluationTime="result.evaluationTime"
			:endTime="result.endTime"
			:closeTime="result.closeTime" />
		<!-- 商品详情 -->
		<DetailInfo :result="result" />
	</div>
</template>

<script>
import DetailAction from './components/detail-action';
import DetailStep from './components/detail-step';
import DetailInfo from './components/detail-info';
import { getOrderDetailed } from '@/api/order';
export default {
	name: 'Detail',
	data() {
		return {
			result: {},
		};
	},
	components: { DetailAction, DetailStep, DetailInfo },
	created() {
		getOrderDetailed(this.$route.params.id).then(data => {
			this.result = data.data.result;
		});
	},
};
</script>
