<template>
	<div class="xtx-center-head">
		<h4 class="title">收货地址</h4>
		<p class="text">
			（地址最多<span>10</span>条，还能保存<span>{{ 10 - num }}</span
			>条）
		</p>
		<a href="javascript:;" class="add" @click="addAddress">+ 新建地址</a>
	</div>
</template>

<script>
export default {
	name: 'AddressHeader',
	props: ['num'],
	methods: {
		addAddress() {
			if (10 - this.num) {
				this.$emit('addAddress');
			} else {
				this.$message({
					type: 'warning',
					message: '最多只能添加10条地址！',
				});
			}
		},
	},
	beforeDestroy() {
		this.$off('addAddress');
	},
};
</script>

<style lang="less" scoped>
.xtx-center-head {
	line-height: 70px;
	margin: 0 25px;
	height: 70px;
	border-bottom: 1px solid #f5f5f5;
	.title {
		float: left;
		font-size: 16px;
		font-weight: 400;
	}
	.text {
		float: left;
		color: #666;
		> span {
			padding: 0 2px;
			color: #27ba9b;
		}
	}
	.add {
		float: right;
		color: #27ba9b;
	}
}
</style>
