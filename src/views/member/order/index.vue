<template>
	<div class="member-order">
		<!-- 订单列表 -->
		<template v-if="!this.$route.params.id">
			<OrderHeader @handleOrder="handleOrder" :orderStateNum="orderState" />
			<!-- 数据 -->
			<transition name="order">
				<div v-if="this.result.page">
					<template v-if="!this.result.pages">
						<div class="none">暂无数据</div>
					</template>
					<template v-else>
						<OrderList :result="result" @orderIds="orderIds" />
						<XtxPagination
							:pageNo="pageNo"
							:pageSize="pageSize"
							:totalPages="result.pages"
							:continues="5"
							@changePage="changePage" />
					</template>
				</div>
			</transition>

			<!-- 加载 -->
			<template v-if="!this.result.page">
				<div class="load">
					<img src="../../../assets/images/loading.gif" alt="" />
				</div>
			</template>
		</template>

		<!-- 商品详情 -->
		<template v-else>
			<transition name="detail">
				<Detail />
			</transition>
		</template>
		<XtxDialog title="取消订单" width="620px" v-show="isCancel">
			<template slot="body">
				<div class="cancel-info">
					<p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
					<p class="tip">请选择取消订单的原因（必选）：</p>
					<div class="btn">
						<a
							:class="orderInfo.cancelReason === item ? 'active' : ''"
							@click="cancelReason(item)"
							v-for="(item, index) in reasons"
							:key="index"
							href="javascript:;"
							>{{ item }}</a
						>
					</div>
				</div>
			</template>
			<template slot="footer">
				<button class="xtx-common-btn" type="info" @click="isCancel = !isCancel">取消</button
				><button class="xtx-common-btn" type="primary" @click="confirmCancel">确认</button>
			</template>
		</XtxDialog>
	</div>
</template>

<script>
import OrderHeader from './components/order-header';
import OrderList from './components/order-list';
import XtxPagination from '@/components/library/xtx-pagination';
import XtxDialog from '@/components/library/xtx-dialog';
import Detail from './detail';
import { getOrderList, cancelOrder, removeOrder } from '@/api/order';
export default {
	name: 'MemberOrder',
	data() {
		return {
			pageNo: 1,
			pageSize: 5,
			result: {},
			isCancel: false,
			reasons: [
				'配送信息有误',
				'商品买错了',
				'重复下单/误下单',
				'忘记使用优惠券、兔币等',
				'其他渠道价格更低',
				'不想买了',
			],
			orderInfo: {
				id: '', // 订单id
				cancelReason: '', // 取消理由
			},
			orderState: 0, // 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
		};
	},
	components: {
		OrderHeader,
		OrderList,
		XtxPagination,
		XtxDialog,
		Detail,
	},
	methods: {
		// 分页器 跳转页
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.getOrderDataList(this.pageNo, this.pageSize, this.orderState);
		},
		// 初始化获取数据
		getOrderDataList(page, pageSize, orderState) {
			this.result = {};
			getOrderList(page, pageSize, orderState).then(data => {
				this.result = data.data.result;
			});
		},
		// 取消订单 接收取消单的id
		receiveOrderId(id) {
			this.isCancel = true;
			this.orderInfo.id = id;
		},
		// 取消理由
		cancelReason(val) {
			this.orderInfo.cancelReason = val;
		},
		// 确认取消
		confirmCancel() {
			if (!this.orderInfo.cancelReason) {
				this.$message({
					message: '请选择取消理由！',
					type: 'warning',
				});
			} else {
				cancelOrder(this.orderInfo).then(
					resolv => {
						this.isCancel = false;
						this.orderInfo.cancelReason = '';
						this.$message({
							message: '取消订单成功！',
							type: 'success',
						});
						// 判断是否在查看详情 在查看详情内取消直接跳转至order页面
						if (this.$route.name === 'orderDetail') this.$router.push('/member/order');
						this.result.items.forEach((e, index) => {
							if (e.id === this.orderInfo.id) {
								this.result.items[index].orderState = 6;
							}
						});
					},
					reject => {
						this.$message({
							message: '取消订单失败，请稍后再试！',
							type: 'error',
						});
						this.isCancel = false;
					}
				);
			}
		},
		// 删除订单
		orderIds(id) {
			this.$confirm('删除后的订单无法找回，确定删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					removeOrder(id).then(resolv => {
						this.$message({
							message: '删除订单成功！',
							type: 'success',
						});
						this.result.items.forEach((e, index) => {
							if (e.id === id) {
								this.result.items.splice(index, 1);
							}
						});
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '删除失败，请稍后再试！',
					});
				});
		},
		// 显示商品状态分类（全部|已取消|完成|发货|收货|付款）
		handleOrder(num) {
			this.orderState = num;
			this.getOrderDataList(this.pageNo, this.pageSize, this.orderState);
		},
	},
	created() {
		this.getOrderDataList(this.pageNo, this.pageSize, this.orderState);
	},
	mounted() {
		this.$bus.$on('receiveOrderId', this.receiveOrderId);
	},
	beforeDestroy() {
		this.$bus.$off('receiveOrderId');
	},
};
</script>

<style lang="less" scoped>
.member-order {
	height: 100%;
	background: #fff;
	.load {
		position: relative;
		width: 100%;
		height: 100px;
		margin: 300px 0;
		img {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.none {
		height: 400px;
		text-align: center;
		line-height: 400px;
		color: #999;
	}
	.xtx-pagination {
		display: flex;
		justify-content: center;
		padding: 30px;
	}
}
/* 进入的起点,离开的终点 */
.order-enter,
.order-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.order-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.order-enter-to,
.order-leave {
	opacity: 1;
}

/* 进入的起点,离开的终点 */
.detail-enter,
.detail-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.detail-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.detail-enter-to,
.detail-leave {
	transform: none;
	opacity: 1;
}
</style>
