<template>
	<div class="home-banner">
		<div class="home-carousel">
			<ul>
				<li v-for="item in bannerDataList" :key="item.id">
					<a href="javascript:;">
						<img :src="item.imgUrl" alt="" />
					</a>
				</li>
			</ul>
			<a class="carousel-btn" href="javascript:;">&lt;</a>
			<a class="carousel-btn" href="javascript:;">&gt;</a>
		</div>
	</div>
</template>

<script>
import { getBanner } from '@/api/home';
export default {
	name: 'HomeBanner',
	data() {
		return {
			bannerDataList: [],
		};
	},
	mounted() {
		getBanner().then(data => {
			if (data.data.code === '1') {
				this.bannerDataList = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
.home-banner {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 500px;
	background-color: pink;
	z-index: 499;
	.home-carousel {
		width: 100%;
		height: 100%;
		min-width: 300px;
		min-height: 150px;
		position: relative;
		ul {
			width: 100%;
			height: 100%;
			li {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.carousel-btn {
			position: absolute;
			top: 228px;
			left: 270px;
			width: 44px;
			height: 44px;
			line-height: 44px;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			border-radius: 50%;
			z-index: 499;
			text-align: center;
			// opacity: 0;
			// transition: all .5s;
			&:last-child {
				left: 1170px;
			}
		}
	}
}
</style>
