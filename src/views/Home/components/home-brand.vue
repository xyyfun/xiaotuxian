<template>
	<div class="home-brand">
		<div class="container">
			<HomeTitle>
				<template slot="title">
					<h3>热门品牌 <span>国际经典 品质保证</span></h3>
				</template>
				<template slot="more">
					<a class="xtx-btn-brand" :class="isLeft ? 'next' : 'prev'" href="javascript:;"
						><i @click="moveBrand('l')" class="iconfont icon-back"></i
					></a>
					<a class="xtx-btn-brand" :class="isRight ? 'next' : 'prev'" href="javascript:;"
						><i @click="moveBrand('r')" class="iconfont icon-right"></i
					></a>
				</template>
			</HomeTitle>
			<div class="brand-content">
				<ul :class="{ move: isLeft }">
					<li v-for="item in brandDataList" :key="item.id">
						<a href="javascript:;"><img v-lazy="item.picture" alt="" /></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getBrand } from '@/api/home';
import HomeTitle from './home-title';
export default {
	name: 'HomeBrand',
	data() {
		return {
			brandDataList: [],
			isLeft: false,
			isRight: true,
		};
	},
	components: {
		HomeTitle,
	},
	methods: {
		moveBrand(a) {
			if (a === 'l') {
				if (this.isLeft) {
					this.isLeft = !this.isLeft;
					this.isRight = !this.isRight;
				}
			} else {
				if (this.isRight) {
					this.isLeft = !this.isLeft;
					this.isRight = !this.isRight;
				}
			}
		},
	},
	mounted() {
		getBrand().then(data => {
			if (data.data.code === '1') {
				this.brandDataList = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
.home-brand {
	background-color: #f5f5f5;
	.brand-content {
		width: 100%;
		height: 345px;
		overflow: hidden;
		padding-bottom: 40px;
		ul {
			display: flex;
			width: 200%;
			transition: all 1s ease;
			li {
				margin-right: 10px;
				width: 240px;
				a {
					img {
						width: 240px;
						height: 305px;
						object-fit: cover;
					}
				}
			}
		}
		.move {
			transform: translateX(-50%);
		}
	}
}
</style>
