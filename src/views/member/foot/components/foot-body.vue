<template>
	<div class="xtx-footprint-list">
		<div class="item">
			<div class="goods">
				<ul>
					<li v-for="item in result.items" :key="item.id">
						<router-link :to="`/goods/${item.spu.id}`" class=""
							><img :src="item.spu.picture" alt=""
						/></router-link>
						<p class="name ellipsis">{{ item.spu.name }}</p>
						<p class="desc ellipsis">{{ item.spu.desc }}</p>
						<p class="price">¥{{ item.spu.price }}</p>
						<i @click="removeFoot([item.spu.id])" class="iconfont icon-close"></i>
					</li>
				</ul>
			</div>
		</div>
		<!-- 分页器 -->
		<XtxPagination
			v-if="result.page"
			:pageNo="pageNo"
			:pageSize="pageSize"
			:totalPages="result.pages"
			:continues="5"
			@changePage="changePage" />
	</div>
</template>

<script>
import { getMyFootprint, deleteFoot } from '@/api/member';
import XtxPagination from '@/components/library/xtx-pagination';
export default {
	name: 'FootBody',
	data() {
		return {
			result: {},
			pageNo: 1,
			pageSize: 12,
		};
	},
	components: { XtxPagination },
	methods: {
		getMyFoot() {
			getMyFootprint('', this.pageNo, this.pageSize).then(data => {
				this.result = data.data.result;
			});
		},
		// 移除足迹(单个|全部)
		removeFoot(id) {
			this.$confirm('删除足迹后无法找回，确定删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					deleteFoot(id).then(resolv => {
						this.$message({
							message: '删除足迹成功！',
							type: 'success',
						});
						this.getMyFoot();
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 移除所有足迹
		removeAll() {
			let arr = this.result.items.map(item => {
				return item.spu.id;
			});
			this.removeFoot(arr);
		},
		// 换页
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.getMyFoot();
		},
	},
	created() {
		this.getMyFoot();
	},
	mounted() {
		this.$bus.$on('removeAll', this.removeAll);
	},
};
</script>

<style lang="less" scoped>
.xtx-footprint-list {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
	.goods {
		position: relative;
		min-height: 400px;
		padding: 20px 25px;
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 222px;
				height: 336px;
				text-align: center;
				padding: 20px 30px;
				position: relative;
				margin-right: 20px;
				margin-bottom: 20px;
				transition: all 0.5s;
				img {
					width: 150px;
					height: 150px;
				}
				p {
					padding-top: 10px;
				}
				.btn {
					width: 100px;
					height: 32px;
					border: 1px solid #e4e4e4;
					line-height: 30px;
					border-radius: 2px;
					margin: 20px auto;
					background: #f5f5f5;
				}
				i {
					position: absolute;
					right: 0;
					top: 0;
					width: 20px;
					height: 20px;
					background: #e4e4e4;
					color: #fff;
					line-height: 18px;
					opacity: 0;
					cursor: pointer;
				}
				.name {
					font-size: 16px;
				}
				.price {
					color: #cf4444;
					font-size: 18px;
				}
				&:hover {
					transform: translate3d(0, -3px, 0);
					box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
				}
				&:hover i {
					opacity: 1;
					transition: all 0.5s;
				}
				&:nth-child(4n) {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
