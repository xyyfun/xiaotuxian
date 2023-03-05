<template>
	<div class="box-body">
		<a
			v-for="item in pay"
			:key="item.id"
			:style="item.id === id ? { borderColor: '#27ba9b' } : {}"
			@click="changId(item.id)"
			class="my-btn"
			href="javascript:;"
			>{{ item.description }}</a
		><span style="color: #999">货到付款需付5元手续费</span>
	</div>
</template>

<script>
export default {
	name: 'CheckoutPay',
	data() {
		return {
			pay: [
				{
					id: 1,
					description: '在线支付',
				},
				{
					id: 2,
					description: '货到付款',
				},
			],
			id: 1,
		};
	},
	methods: {
		changId(id) {
			this.id = id;
			this.$emit('payType', this.id);
		},
	},
};
</script>

<style lang="less" scoped>
.box-body {
	padding: 20px 0;
	.my-btn {
		width: 228px;
		height: 50px;
		border: 1px solid #e4e4e4;
		text-align: center;
		line-height: 48px;
		margin-right: 25px;
		color: #666;
		display: inline-block;
		&:hover {
			border-color: #27ba9b;
		}
	}
}
</style>
