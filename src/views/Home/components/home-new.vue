<template>
	<div class="home-new">
		<div class="container">
			<HomeTitle>
				<template slot="title">
					<h3>新鲜好物 <span>新鲜出入 品质靠谱</span></h3>
				</template>
				<template slot="more">
					<a class="more" href="javascript:;">
						<span>查看全部</span>
						<i class="iconfont icon-right"></i>
					</a>
				</template>
			</HomeTitle>
			<div class="home-content">
				<ul>
					<li v-for="item in result" :key="item.id">
						<router-link :to="`/goods/${item.id}`">
							<img v-lazy="item.picture" alt="" />
							<p class="ellipsis">{{ item.desc }}</p>
							<p>￥{{ item.price }}</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import HomeTitle from './home-title';
import { getNew } from '@/api/home';
export default {
	name: 'HomeNew',
	data() {
		return {
			result: [],
		};
	},
	components: {
		HomeTitle,
	},
	mounted() {
		getNew().then(data => {
			this.result = data.data.result;
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
			background: #f0f9f4;
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
						color: @priceColor;
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
/* 进入的起点,离开的终点 */
.new-enter,
.new-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.new-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.new-enter-to,
.new-leave {
	opacity: 1;
}
</style>
