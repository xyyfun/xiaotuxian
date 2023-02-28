<template>
	<div class="goods-relevant">
		<div class="header"><i class="icon"></i><span class="title">同类商品推荐</span></div>
		<div class="xtx-carousel">
			<ul class="carousel-body">
				<li class="carousel-item fade">
					<div class="slider">
						<router-link :to="`/goods/${list.id}`" v-for="(list, index) in same" :key="index"
							><img :src="list.picture" alt="" />
							<p class="name ellipsis">{{ list.name }}</p>
							<p class="price">¥{{ list.price }}</p></router-link
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsRelevant',
	props: ['same'],
};
</script>

<style lang="less" scoped>
.goods-relevant {
	background: #fff;
	min-height: 460px;
	margin-top: 20px;
	.header {
		height: 80px;
		line-height: 80px;
		padding: 0 20px;
		.icon {
			width: 16px;
			height: 16px;
			display: inline-block;
			border-top: 4px solid #27ba9b;
			border-right: 4px solid #27ba9b;
			box-sizing: border-box;
			position: relative;
			transform: rotate(45deg);
			&:before {
				content: '';
				width: 10px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 2px;
				background: #bcf1e6;
			}
		}
		.title {
			font-size: 20px;
			padding-left: 10px;
		}
	}
	.xtx-carousel {
		width: 100%;
		height: 380px;
		min-width: 300px;
		min-height: 150px;
		position: relative;
		.carousel-body {
			width: 100%;
			height: 100%;
			.carousel-item {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				// opacity: 0;
				transition: opacity 0.5s linear;
				.slider {
					display: flex;
					justify-content: space-around;
					padding: 0 40px;
					> a {
						width: 240px;
						text-align: center;
						img {
							padding: 20px;
							width: 230px;
							height: 230px;
						}
						.name {
							font-size: 16px;
							color: #666;
							padding: 0 40px;
						}
						.price {
							font-size: 16px;
							color: #cf4444;
							margin-top: 15px;
						}
					}
				}
			}
		}
		.prev {
			left: 20px;
		}
		.next {
			right: 20px;
		}
	}
}
</style>
