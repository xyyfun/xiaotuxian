<template>
	<div class="member-order">
		<OrderHeader />
		<OrderList :result="result" />
		<XtxPagination
			:pageNo="pageNo"
			:pageSize="pageSize"
			:totalPages="result.pages"
			:continues="5"
			@changePage="changePage"
		/>
	</div>
</template>

<script>
import OrderHeader from './components/order-header';
import OrderList from './components/order-list';
import XtxPagination from '@/components/library/xtx-pagination';
import { getOrderList } from '@/api/member';
export default {
	name: 'MemberOrder',
	data() {
		return {
			pageNo: 1,
			pageSize: 5,
			result: {},
		};
	},

	components: { OrderHeader, OrderList, XtxPagination },
	methods: {
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.result = {};
			this.getOrderDataList(this.pageNo, this.pageSize);
		},
		getOrderDataList(page, pageSize) {
			getOrderList(page, pageSize).then(data => {
				if (data.data.code === '1') {
					this.result = data.data.result;
				}
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
