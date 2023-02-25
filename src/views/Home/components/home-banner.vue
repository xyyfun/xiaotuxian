<template>
	<div class="home-banner">
		<div class="home-carousel" @mouseenter="enterBanner" @mouseleave="leaveBanner">
			<ul>
				<li
					class="carousel-item"
					v-for="(item, index) in bannerDataList"
					:key="item.id"
					:class="{ chosen: id === index }"
				>
					<a href="javascript:;">
						<img :src="item.imgUrl" alt="" />
					</a>
				</li>
			</ul>
			<a class="carousel-btn" href="javascript:;" @click="last">
				<i class="iconfont icon-back"></i
			></a>
			<a class="carousel-btn" href="javascript:;" @click="bannerMove">
				<i class="iconfont icon-right"></i
			></a>
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
			timer: null,
			id: 0,
		};
	},
	methods: {
		bannerMove() {
			if (this.id >= this.bannerDataList.length - 1) {
				this.id = 0;
				return;
			}
			this.id++;
		},
		enterBanner() {
			clearInterval(this.timer);
		},
		leaveBanner() {
			this.timer = setInterval(() => {
				this.bannerMove();
			}, 2000);
		},
		last() {
			if (this.id <= 0) {
				this.id = 4;
				return;
			}
			this.id--;
		},
	},
	mounted() {
		// 获取数据
		getBanner().then(data => {
			if (data.data.code === '1') {
				this.bannerDataList = data.data.result;
			}
		});
		this.timer = setInterval(() => {
			this.bannerMove();
		}, 2000);
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
};
</script>

<style lang="less" scoped>
.chosen {
	z-index: 1 !important;
	opacity: 1 !important;
}
.home-banner {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 500px;
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
			.carousel-item {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
				transition: opacity 0.5s linear;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		&:hover > a {
			opacity: 1;
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
			opacity: 0;
			transition: all 0.5s;
			&:last-child {
				left: 1170px;
			}
		}
	}
}
</style>
