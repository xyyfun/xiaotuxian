<template>
	<div class="home-product">
		<div class="home-goods" v-for="item in productDataList" :key="item.id">
			<div class="container">
				<HomeTitle>
					<template slot="title">
						<h3>{{ item.name }}</h3>
					</template>
					<template slot="nav">
						<ul>
							<li v-for="children in item.children" :key="children.id">
								<a href="javascript:;">{{ children.name }}</a>
							</li>
						</ul>
					</template>
					<template slot="more">
						<a class="more" href="javascript:;">
							<span>查看全部</span>
							<i>&gt;</i>
						</a>
					</template>
				</HomeTitle>
				<div class="product-content">
					<a class="cover" href="javascript:;">
						<img :src="item.picture" alt="" />
						<div class="lable">
							<span>{{ item.name }}馆</span>
							<span>{{ item.saleInfo }}</span>
						</div>
					</a>
					<ul class="goods-list">
						<li v-for="goods in item.goods" :key="goods.id">
							<div class="good-item">
								<a class="image" href="javascript:;"><img :src="goods.picture" alt="" /></a>
								<p class="name">{{ goods.name }}</p>
								<p class="desc ellipsis">{{ goods.desc }}</p>
								<p class="price">￥{{ goods.price }}</p>
								<div class="extra">
									<a href="javascript:;">
										<span>找相似</span>
										<span>发现现多宝贝</span>
									</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getGoods } from '@/api/home';
import HomeTitle from './home-title.vue';
export default {
	name: 'HomeProduct',
	data() {
		return {
			productDataList: [],
		};
	},
	components: {
		HomeTitle,
	},
	mounted() {
		getGoods().then(data => {
			if (data.data.code === '1') {
				this.productDataList = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.home-product {
	.home-goods {
		.container {
			.product-content {
				display: flex;
				.cover {
					width: 240px;
					height: 620px;
					margin-right: 10px;
					position: relative;
					img {
						width: 100%;
						height: 100%;
						-o-object-fit: cover;
						object-fit: cover;
					}
					.lable {
						width: 188px;
						height: 66px;
						display: flex;
						font-size: 18px;
						color: #fff;
						line-height: 66px;
						font-weight: 400;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						span {
							text-align: center;
							&:first-child {
								width: 76px;
								background: rgba(0, 0, 0, 0.9);
							}
							&:last-child {
								flex: 1;
								background: rgba(0, 0, 0, 0.7);
							}
						}
					}
				}
				.goods-list {
					width: 990px;
					display: flex;
					flex-wrap: wrap;
					li {
						width: 240px;
						height: 300px;
						margin-right: 10px;
						margin-bottom: 10px;
						&:nth-child(4n) {
							margin-right: 0;
						}
						.good-item {
							width: 100%;
							height: 100%;
							padding: 10px 30px;
							position: relative;
							overflow: hidden;
							border: 1px solid transparent;
							transition: all 0.5s;
							&:hover {
								border: 1px solid @xtxColor;
							}
							&:hover > .extra {
								transform: translate3d(0, 0, 0);
							}
							.image {
								display: block;
								width: 160px;
								height: 160px;
								margin: 0 auto;
								img {
									width: 100%;
									height: 100%;
								}
							}
							p {
								margin-top: 6px;
								font-size: 16px;
							}
							.name {
								height: 44px;
							}
							.desc {
								color: #666;
								height: 22px;
							}
							.price {
								margin-top: 10px;
								font-size: 20px;
								color: @priceColor;
							}
							.extra {
								position: absolute;
								left: 0;
								bottom: 0;
								height: 86px;
								width: 100%;
								background: #27ba9b;
								text-align: center;
								transform: translate3d(0, 100%, 0);
								transition: all 0.5s;
								a {
									span {
										display: block;
										color: #fff;
										width: 120px;
										margin: 0 auto;
										line-height: 30px;

										&:first-child {
											font-size: 18px;
											border-bottom: 1px solid #fff;
											line-height: 40px;
											margin-top: 5px;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
