<template>
	<div class="home-hot">
		<div class="container" ref="hot">
			<HomeTitle>
				<template slot="title">
					<h3>人气推荐 <span>人气爆款 不容错过</span></h3>
				</template>
			</HomeTitle>
			<transition name="fade">
				<div class="home-content" v-if="hotDataList.length">
					<ul>
						<li v-for="item in hotDataList" :key="item.id">
							<a href="javascript:;">
								<img :src="item.picture" alt="" />
								<p class="ellipsis">{{ item.title }}</p>
								<p>{{ item.alt }}</p>
							</a>
						</li>
					</ul>
				</div>
				<HomeSkeleton father="426px" width="306px" height="406px" :number="4" v-else />
			</transition>
		</div>
	</div>
</template>

<script>
import { getHot } from '@/api/home';
import HomeTitle from './home-title';
import observe from '@/utils/IntersectionObserver';
import HomeSkeleton from './home-skeleton.vue';
export default {
	name: 'HomeHot',
	data() {
		return {
			hotDataList: [],
		};
	},
	components: {
		HomeTitle,
		HomeSkeleton,
	},
	mounted() {
		observe(this.$refs.hot, () => {
			getHot().then(data => {
				this.hotDataList = data.data.result;
			});
		});
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.home-content {
	height: 426px;
	ul {
		display: flex;
		justify-content: space-between;
		height: 406px;
		li {
			width: 306px;
			height: 406px;
			background: #fff;
			transition: all 0.5s;
			a {
				img {
					width: 306px;
					height: 306px;
					object-fit: cover;
				}
				p {
					font-size: 22px;
					padding: 12px 30px 0 30px;
					text-align: center;
					&:last-child {
						color: #999;
						font-size: 18px;
					}
				}
			}
			&:hover {
				transform: translate3d(0, -3px, 0);
				box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
			}
		}
	}
}
</style>
