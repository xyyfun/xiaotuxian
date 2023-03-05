<template>
	<div class="box-body">
		<a
			v-for="item in deliveryTime"
			:key="item.id"
			:style="item.id === id ? { borderColor: '#27ba9b' } : {}"
			@click="changId(item.id)"
			class="my-btn"
			href="javascript:;"
			>{{ item.description }}</a
		>
	</div>
</template>

<script>
export default {
	name: 'CheckoutTime',
	data() {
		return {
			deliveryTime: [
				{
					id: 1,
					description: '不限送货时间：周一至周日',
				},
				{
					id: 2,
					description: '工作日送货：周一至周五',
				},
				{
					id: 3,
					description: '双休日、假日送货：周六至周日',
				},
			],
			id: 1,
		};
	},
	methods: {
		changId(id) {
			this.id = id;
			this.$emit('deliveryTimeType', id);
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
