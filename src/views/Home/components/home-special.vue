<template>
	<div class="home-special">
		<div class="container">
			<HomeTitle>
				<template slot="title">
					<h3>最新专题</h3>
				</template>
				<template slot="more">
					<a class="more" href="javascript:;">
						<span>查看全部</span>
						<i class="iconfont icon-right"></i>
					</a>
				</template>
			</HomeTitle>
			<div class="special-content">
				<div class="special-item" v-for="item in specialDataList" :key="item.id">
					<a href="javascript:;">
						<img :src="item.cover" alt="" />
						<div class="meta">
							<p class="title">
								<span class="top ellipsis">{{ item.title }}</span>
								<span class="btn ellipsis">{{ item.summary }}</span>
							</p>
							<span class="price">￥{{ item.lowestPrice }}</span>
						</div>
					</a>
					<div class="foot">
						<span class="like">
							<i class="iconfont icon-xihuan"></i>
							{{ item.collectNum }}</span
						>
						<span class="view">
							<i class="iconfont icon-yanjing"></i>
							{{ item.viewNum }}</span
						>
						<span class="reply"><i class="iconfont icon-comment"></i>{{ item.replyNum }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getSpecial } from '@/api/home';
import HomeTitle from './home-title.vue';
export default {
	name: 'HomeSpecial',
	data() {
		return {
			specialDataList: [],
		};
	},
	components: {
		HomeTitle,
	},
	mounted() {
		getSpecial().then(data => {
			if (data.data.code === '1') {
				this.specialDataList = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.home-special {
	background-color: #f5f5f5;
	.container {
		.special-content {
			height: 380px;
			padding-bottom: 20px;
			display: flex;
			justify-content: space-between;
			.special-item {
				width: 404px;
				background: #fff;
				transition: all 0.5s;
				&:hover {
					transform: translate3d(0, -3px, 0);
					box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
				}
				a {
					display: block;
					width: 100%;
					height: 288px;
					position: relative;
					img {
						width: 100%;
						height: 100%;
						-o-object-fit: cover;
						object-fit: cover;
					}
					.meta {
						background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent 50%);
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 288px;
						.title {
							position: absolute;
							bottom: 0;
							left: 0;
							padding-left: 16px;
							width: 70%;
							height: 70px;
							.top {
								color: #fff;
								font-size: 22px;
								display: block;
							}
							.btn {
								display: block;
								font-size: 19px;
								color: #999;
							}
						}
						.price {
							position: absolute;
							bottom: 25px;
							right: 16px;
							line-height: 1;
							padding: 4px 8px 4px 7px;
							color: #cf4444;
							font-size: 17px;
							background-color: #fff;
							border-radius: 2px;
						}
					}
				}
				.foot {
					height: 72px;
					line-height: 72px;
					padding: 0 20px;
					font-size: 16px;
					i {
						display: inline-block;
						width: 15px;
						height: 14px;
						margin-right: 5px;
						color: #333;
					}
					.like {
						float: left;
						margin-right: 25px;
						vertical-align: middle;
					}
					.view {
						float: left;
						margin-right: 25px;
						vertical-align: middle;
					}
					.reply {
						float: right;
						vertical-align: middle;
					}
				}
			}
		}
	}
}
</style>
