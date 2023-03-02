<template>
	<div class="cart">
		<table>
			<thead>
				<tr>
					<th width="120">
						<div class="xtx-checkbox" :class="{ green: isAllChecked }">
							<i
								class="iconfont"
								:class="isAllChecked ? 'icon-duoxuanxuanzhong green' : 'icon-duoxuanweixuanzhong'"
								@click="changAllSelected(!isAllChecked)"
							></i
							><span>全选</span>
						</div>
					</th>
					<th width="400">商品信息</th>
					<th width="220">单价</th>
					<th width="180">数量</th>
					<th width="180">小计</th>
					<th width="140">操作</th>
				</tr>
			</thead>
			<tbody v-if="list.length">
				<CartList v-for="item in list" :key="item.skuId" :item="item" />
			</tbody>
			<tbody v-else>
				<tr>
					<td colspan="6">
						<div class="cart-none">
							<img :src="require('../../../assets/images/none.png')" alt="" />
							<p>购物车内暂时没有商品</p>
							<div class="btn">
								<button class="xtx-button" @click="$router.push('/home')">继续逛逛</button>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import CartList from './cart-list';
import throttle from 'lodash/throttle';
import { mapGetters, mapState } from 'vuex';
export default {
	name: 'CartItem',
	components: { CartList },
	computed: {
		...mapState('cart', ['list']),
		...mapGetters('cart', ['isAllChecked']),
	},
	methods: {
		// 全选or未全选
		changAllSelected: throttle(function (selected) {
			this.$store.dispatch('cart/changAllSelected', selected);
		}, 1000),
	},
	mounted() {
		this.$bus.$on('action', this.changAllSelected);
	},
	beforeDestroy() {
		this.$bus.$off('action');
	},
};
</script>

<style lang="less" scoped>
.cart {
	background: rgb(255, 255, 255);
	color: rgb(102, 102, 102);
	table {
		display: table;
		text-indent: initial;
		border-spacing: 0px;
		border-collapse: collapse;
		line-height: 24px;
		border-color: grey;
		td,
		th {
			padding: 10px;
			border-bottom: 1px solid rgb(245, 245, 245);
		}
		thead {
			display: table-header-group;
			vertical-align: middle;
			border-color: inherit;
			tr {
				display: table-row;
				vertical-align: inherit;
				border-color: inherit;
				td :first-child,
				th :first-child {
					text-align: left;
					color: rgb(153, 153, 153);
				}
				th {
					font-size: 16px;
					font-weight: 400;
					line-height: 50px;
					.xtx-checkbox {
						display: inline-block;
						margin-right: 2px;
						i {
							position: relative;
							top: 1px;
							cursor: pointer;
						}
						span {
							margin-left: 2px;
						}
					}
					.green {
						color: #27ba9b;
					}
				}
			}
		}
		tbody {
			display: table-row-group;
			vertical-align: middle;
			border-color: inherit;
			.cart-none {
				text-align: center;
				padding: 150px 0;
				background: #fff;
				img {
					width: 180px;
				}
				p {
					color: #999;
					padding: 20px 0;
				}
				.xtx-button {
					width: 180px;
					height: 50px;
					font-size: 16px;
					border-color: #27ba9b;
					background: #27ba9b;
					color: #fff;
					appearance: none;
					outline: none;
					text-align: center;
					border: 1px solid transparent;
					border-radius: 4px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
