<template>
	<div class="action">
		<div class="batch">
			<div
				class="xtx-checkbox"
				@click="$bus.$emit('action', !isAllChecked)"
				:class="{ green: isAllChecked }">
				<i
					class="iconfont"
					:class="isAllChecked ? 'icon-duoxuanxuanzhong green' : 'icon-duoxuanweixuanzhong'"></i
				><span>全选</span>
			</div>
			<a href="javascript:;" @click="removeSelected">删除选中商品</a
			><a href="javascript:;" @click="collect">移入收藏夹</a
			><a href="javascript:;" @click="removeSelected">清空失效商品</a>
		</div>
		<div class="total">
			共 {{ allGoodsNum }} 件商品，已选择 {{ allSelectedNum }} 件，商品合计：
			<span class="red">¥{{ allSelectedTotalPrice.toFixed(2) }}</span
			><button class="xtx-button ellipsis middle primary" @click="placeOrder">下单结算</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { addCollect } from '@/api/member';
export default {
	name: 'CartAction',
	computed: {
		...mapGetters('cart', [
			'isAllChecked',
			'allSelectedId',
			'allGoodsNum',
			'allSelectedNum',
			'allSelectedTotalPrice',
		]),
	},
	methods: {
		removeSelected() {
			this.$confirm('您是否确认删除该商品？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$store.dispatch('cart/removeCartGoods');
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 下单按钮
		placeOrder() {
			this.$router.push('/checkout');
		},
		// 批量移入收藏夹
		collect() {
			this.$confirm('确定将已选中的商品移入收藏夹？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					addCollect(this.allSelectedId, 1).then(resolv => {
						this.$message({
							type: 'success',
							message: '收藏成功!',
						});
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
	},
};
</script>

<style lang="less" scoped>
.action {
	display: flex;
	background: rgb(255, 255, 255);
	margin-top: 20px;
	height: 80px;
	align-items: center;
	font-size: 16px;
	justify-content: space-between;
	padding: 0px 30px;
	.xtx-checkbox {
		color: rgb(153, 153, 153);
		display: inline-block;
		padding-left: 3px;
		cursor: pointer;
		i {
			position: relative;
			top: 1px;
		}
		span {
			margin-left: 2px;
		}
	}
	.green {
		color: #27ba9b;
	}
	a {
		margin-left: 20px;
	}
	.red {
		font-size: 18px;
		margin-right: 20px;
		font-weight: 700;
		color: rgb(207, 68, 68);
	}
	.primary {
		border-color: #27ba9b;
		background: #27ba9b;
		color: #fff;
		width: 180px;
		height: 50px;
		font-size: 16px;
		outline: none;
		text-align: center;
		border: 1px solid transparent;
		border-radius: 4px;
		cursor: pointer;
	}
}
</style>
