<template>
	<div class="member-order">
		<template>
			<OrderHeader />
			<OrderList :result="result" @receiveOrderId="receiveOrderId" @orderIds="orderIds" />
			<XtxPagination
				:pageNo="pageNo"
				:pageSize="pageSize"
				:totalPages="result.pages"
				:continues="5"
				@changePage="changePage" />
			<transition>
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
			</transition>
		</template>
		<template> </template>
	</div>
</template>

<script>
import OrderHeader from './components/order-header';
import OrderList from './components/order-list';
import XtxPagination from '@/components/library/xtx-pagination';
import XtxDialog from '@/components/library/xtx-dialog';
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
		};
	},
	components: {
		OrderHeader,
		OrderList,
		XtxPagination,
		XtxDialog,
	},
	methods: {
		// 分页器 跳转页
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.result = {};
			this.getOrderDataList(this.pageNo, this.pageSize);
		},
		// 初始化获取数据
		getOrderDataList(page, pageSize) {
			getOrderList(page, pageSize).then(data => {
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
						this.getOrderDataList(this.pageNo, this.pageSize);
						this.$message({
							message: '取消订单成功！',
							type: 'success',
						});
						this.isCancel = false;
						this.orderInfo.cancelReason = '';
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
						// 删除成功获取数据
						this.getOrderDataList(this.pageNo, this.pageSize);
						this.$message({
							message: '删除订单成功！',
							type: 'success',
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
	},
	created() {
		this.getOrderDataList(this.pageNo, this.pageSize);
	},
};
</script>

<style lang="less" scoped>
.member-order {
	height: 100%;
	background: #fff;

	.xtx-pagination {
		display: flex;
		justify-content: center;
		padding: 30px;
	}
}
</style>
