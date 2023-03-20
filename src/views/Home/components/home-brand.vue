<template>
	<div class="home-brand">
		<div class="container" ref="brand">
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
				<transition name="fade">
					<ul :class="{ move: isLeft }" v-if="brandDataList.length">
						<li v-for="item in brandDataList" :key="item.id">
							<a href="javascript:;"><img :src="item.picture" alt="" /></a>
						</li>
					</ul>
					<HomeSkeleton father="345px" width="238px" height="305px" :number="5" v-else />
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import { getBrand } from '@/api/home';
import HomeTitle from './home-title';
import HomeSkeleton from './home-skeleton.vue';
import observe from '@/utils/IntersectionObserver';
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
		HomeSkeleton,
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
		observe(this.$refs.brand, () => {
			getBrand().then(data => {
				this.brandDataList = data.data.result;
			});
		});
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
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
	.home-content {
		height: 345px;
		ul {
			display: flex;
			height: 305px;
			li {
				width: 238px;
				height: 305px;
				margin-right: 10px;
			}
		}
	}
}
</style>
