<template>
	<tr>
		<td>
			<div class="xtx-checkbox">
				<i
					class="iconfont"
					:class="item.selected ? 'icon-duoxuanxuanzhong green' : 'icon-duoxuanweixuanzhong'"
					@click="
						changSelected({ selected: !item.selected, count: item.count, skuId: item.skuId })
					"></i>
			</div>
		</td>
		<td>
			<div class="goods">
				<router-link :to="`/goods/${item.id}`" class=""
					><img :src="item.picture" alt=""
				/></router-link>
				<div>
					<p class="name ellipsis">{{ item.name }}</p>
					<div class="cart-sku">
						<div class="attrs">
							<span class="ellipsis">{{ item.attrsText }}</span
							><i class="iconfont icon-moreunfold"></i>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="tc">
			<p>¥{{ item.nowPrice }}</p>
		</td>
		<td class="tc">
			<div class="xtx-numbox">
				<div class="numbox">
					<a href="javascript:;" @click="subGoodsNum({ count: item.count - 1, skuId: item.skuId })"
						>-</a
					>
					<input type="text" readonly="" :value="item.count" />
					<a
						href="javascript:;"
						@click="changSelected({ count: item.count + 1, skuId: item.skuId })"
						>+</a
					>
				</div>
			</div>
		</td>
		<td class="tc">
			<p class="f16 red">
				¥{{ total }}<template v-if="item.postFee > 0">（含邮费：￥{{ item.postFee }}）</template>
			</p>
		</td>
		<td class="tc">
			<p><a href="javascript:;" @click="collectGoods(item.id)">移入收藏夹</a></p>
			<p><a class="green" href="javascript:;" @click="remove(item.skuId)">删除</a></p>
			<p><a href="javascript:;">找相似</a></p>
		</td>
	</tr>
</template>

<script>
import { addCollect } from '@/api/member';
export default {
	name: 'CartList',
	data() {
		return {};
	},
	props: ['item'],
	computed: {
		// 单件总价 商品数量*商品单价+邮费
		total() {
			return this.item.count * this.item.nowPrice + this.item.postFee;
		},
	},
	methods: {
		// 选中|未选中
		changSelected({ selected = undefined, count, skuId }) {
			this.$store.dispatch('cart/changGoodsNum', { selected, count, skuId });
		},
		// 减少商品数量
		subGoodsNum({ selected = undefined, count, skuId }) {
			if (this.item.count === 1) return;
			this.$store.dispatch('cart/changGoodsNum', { selected, count, skuId });
		},
		// 删除商品
		remove(skuId) {
			this.$confirm('您是否确认删除该商品？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$store.dispatch('cart/removeCartGoods', skuId);
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
		// 添加收藏
		collectGoods(id) {
			addCollect(id, 1).then(
				resolv => {
					this.$message({
						type: 'success',
						message: '收藏成功!',
					});
				},
				reject => {
					this.$message({
						type: 'error',
						message: '收藏失败，请稍后再试!',
					});
				}
			);
		},
	},
};
</script>

<style lang="less" scoped>
tr {
	display: table-row;
	vertical-align: inherit;
	border-color: inherit;
	td:first-child {
		text-align: left;
		padding-left: 34px;
		color: rgb(153, 153, 153);
	}
	td {
		padding: 10px;
		border-bottom: 1px solid rgb(245, 245, 245);
		display: table-cell;
		vertical-align: inherit;
		.xtx-checkbox {
			display: inline-block;
			margin-right: 2px;
			i {
				position: relative;
				top: 1px;
				cursor: pointer;
				.green {
					color: #27ba9b;
				}
			}
		}
		.goods {
			display: flex;
			align-items: center;
			img {
				width: 100px;
				height: 100px;
				border-radius: 4px;
			}
			> div {
				width: 280px;
				font-size: 16px;
				padding-left: 10px;
				.cart-sku {
					height: 28px;
					border: 1px solid rgb(245, 245, 245);
					padding: 0px 6px;
					position: relative;
					margin-top: 10px;
					display: inline-block;
					.attrs {
						line-height: 24px;
						display: flex;
						span {
							max-width: 230px;
							font-size: 14px;
							color: rgb(153, 153, 153);
						}
						i {
							margin-left: 5px;
							margin-top: 2px;
							font-size: 14px;
							cursor: pointer;
						}
					}
				}
			}
		}
		.xtx-numbox {
			display: flex;
			align-items: center;
			margin: 0 auto;
			width: 120px;
			.numbox {
				width: 120px;
				height: 30px;
				border: 1px solid #e4e4e4;
				display: flex;
				> a {
					width: 29px;
					line-height: 28px;
					text-align: center;
					background: #f8f8f8;
					font-size: 16px;
					color: #666;
				}
				> a:first-of-type {
					border-right: 1px solid #e4e4e4;
				}
				> input {
					width: 60px;
					padding: 0 5px;
					text-align: center;
					color: #666;
				}
				> a:last-of-type {
					border-left: 1px solid #e4e4e4;
				}
			}
		}
		.red {
			color: rgb(207, 68, 68);
			font-size: 16px;
		}
		.green {
			color: rgb(39, 186, 155);
		}
	}
	.tc {
		text-align: center;
	}
}
</style>
