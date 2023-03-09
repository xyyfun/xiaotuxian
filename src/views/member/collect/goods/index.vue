<template>
	<div class="member-collect-goods-page">
		<XtxCenterHead title="我的收藏" />
		<div class="xtx-collect-goods" style="position: relative; min-height: 400px">
			<ul>
				<li v-for="(item, index) in result.items" :key="item.id">
					<router-link :to="`/goods/${item.id}`" class=""
						><img v-lazy="item.picture" alt=""
					/></router-link>
					<p class="name ellipsis">{{ item.name }}</p>
					<p class="desc ellipsis">多目采安</p>
					<p class="price">¥{{ item.price }}</p>
					<div class="btn">找相似</div>
					<i class="iconfont icon-close" @click="cancel(item.id, index)"></i>
				</li>
			</ul>
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
import XtxCenterHead from '@/components/library/xtx-center-head';
import XtxPagination from '@/components/library/xtx-pagination';
import { getMyCollection, cancelCollect } from '@/api/member';
export default {
	name: 'CollectGoods',
	data() {
		return {
			result: {},
			pageNo: 1,
			pageSize: 12,
		};
	},
	components: { XtxPagination, XtxCenterHead },
	methods: {
		// 取消收藏
		cancel(id, index) {
			this.$confirm('确定取消收藏该商品吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					cancelCollect(id, 1).then(resolv => {
						this.$message({
							type: 'success',
							message: '取消收藏成功!',
						});
						this.result.items.splice(index, 1);
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					});
				});
		},
		// 请求收藏的商品
		getCollect() {
			getMyCollection(this.pageNo, this.pageSize, 1).then(data => {
				this.result = data.data.result;
			});
		},
		// 换页
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.getCollect();
		},
	},
	created() {
		this.getCollect();
	},
};
</script>

<style lang="less" scoped>
.member-collect-goods-page {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
	.xtx-collect-goods {
		position: relative;
		min-height: 400px;
		padding: 20px 25px;
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 221px;
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
				.desc {
					color: #999;
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
