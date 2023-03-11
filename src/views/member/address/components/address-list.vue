<template>
	<div class="xtx-address-item" :class="{ 'border-active': !item.isDefault }">
		<div class="info">
			<p>
				<span>收货人：</span><span>{{ item.receiver }}</span>
			</p>
			<p>
				<span>联系方式：</span
				><span>{{ item.contact.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3') }}</span>
			</p>
			<p>
				<span>收货地址：</span><span>{{ item.fullLocation + item.address }}</span>
			</p>
		</div>
		<div class="btn">
			<a v-if="item.isDefault === 1" href="javascript:;" @click="editAddress(item, 0)">设为默认</a
			><a v-else href="javascript:;" class="active">默认地址</a
			><a href="javascript:;" @click="editAddress(item)">编辑</a
			><a href="javascript:;" @click="removeAddress()" class="red">删除</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AddressList',
	props: ['item'],
	methods: {
		// 删除地址
		removeAddress() {
			this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$store.dispatch('user/removeUserAddress', this.item.id).then(
						() => {
							this.$message({
								type: 'success',
								message: '删除成功！',
							});
						},
						reason => {
							this.$message({
								type: 'error',
								message: reason.data.message,
							});
						}
					);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 编辑地址
		editAddress(data, num) {
			this.$emit('editAddress', data, num);
		},
	},
	beforeDestroy() {
		this.$off('editAddress');
	},
};
</script>

<style lang="less" scoped>
.xtx-address-item {
	padding: 20px;
	border: 1px solid #f5f5f5;
	display: flex;
	margin: 25px 25px 0 25px;
	.info {
		flex: 1;
		p {
			line-height: 30px;
			span:first-child {
				color: #999;
			}
		}
	}
	.btn {
		width: 100px;
		align-self: center;
		a {
			text-align: center;
			line-height: 32px;
			padding: 0 10px;
			color: #27ba9b;
			&:first-child {
				width: 100px;
				height: 32px;
				background: #f5f5f5;
				border: 1px solid #e4e4e4;
				display: block;
				border-radius: 2px;
				color: #666;
				margin-bottom: 10px;
			}
			&:last-child {
				color: #cf4444;
			}
		}
		.active {
			background: #27ba9b !important;
			color: #fff !important;
			border-color: #27ba9b !important;
		}
	}
	&:hover {
		border-color: #27ba9b;
		border-style: dashed;
	}
}
</style>
