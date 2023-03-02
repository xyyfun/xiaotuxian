<template>
	<div class="pagination">
		<button :disabled="pageNo == 1" @click="$emit('changePage', pageNo - 1)">上一页</button>
		<button v-show="startNumAndEndNum.start > 1" @click="$emit('changePage', 1)">1</button>
		<button v-show="startNumAndEndNum.start > 2">···</button>

		<button
			v-for="(item, index) in startNumAndEndNum.end"
			:key="index"
			v-show="item >= startNumAndEndNum.start"
			@click="$emit('changePage', item)"
			:class="{ active: pageNo === item }"
			:disabled="pageNo === item"
		>
			{{ item }}
		</button>

		<button v-show="startNumAndEndNum.end < totalPages - 1">···</button>
		<button v-show="startNumAndEndNum.end < totalPages" @click="$emit('changePage', totalPages)">
			{{ totalPages }}
		</button>
		<button :disabled="pageNo == totalPages" @click="$emit('changePage', pageNo + 1)">
			下一页
		</button>

		<button style="margin-left: 30px">共 {{ totalPages }} 页</button>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	// pageNo 当前页 pageSize每页几条数据 totalPages总页数 continues连续
	props: ['pageNo', 'pageSize', 'totalPages', 'continues'],
	computed: {
		startNumAndEndNum() {
			// 最小值
			let start = 0;
			// 最大值
			let end = 0;
			// 当总页数小于页码数时
			if (this.continues > this.totalPages) {
				start = 1;
				end = this.totalPages;
			} else {
				start = this.pageNo - parseInt(this.continues / 2);
				end = this.pageNo + parseInt(this.continues / 2);
			}
			if (start < 1) {
				start = 1;
				end = this.continues;
			}
			if (end > this.totalPages) {
				start = this.totalPages - this.continues + 1;
				end = this.totalPages;
			}
			return { start, end };
		},
	},
	beforeDestroy() {
		this.$off('changePage');
	},
};
</script>

<style scoped>
.pagination {
	text-align: center;
	margin: 20px 0;
}
.pagination button {
	margin: 0 5px;
	background-color: #f4f4f5;
	color: #606266;
	outline: none;
	border-radius: 2px;
	padding: 0 4px;
	vertical-align: top;
	display: inline-block;
	font-size: 13px;
	min-width: 35.5px;
	height: 28px;
	line-height: 28px;
	cursor: pointer;
	box-sizing: border-box;
	text-align: center;
	border: 0;
}
.pagination button[disabled] {
	color: #c0c4cc;
	cursor: not-allowed;
}
.pagination button.active {
	background-color: #27ba9b;
	color: #fff;
}
</style>
