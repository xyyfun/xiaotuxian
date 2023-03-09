<template>
	<div class="app-header-sticky" :class="{ show: y >= 78 }">
		<div class="container">
			<router-link to="/home" class="logo-header-sticky"></router-link>
			<ul class="app-header-nav">
				<li class="home">
					<router-link to="/home">首页</router-link>
				</li>
				<li
					v-for="(item, index) in categoryDataList"
					:key="item.id"
					@mouseenter="showNav(index)"
					@mouseleave="hideNav(index)">
					<router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
					<AppHeaderNav :children="item.children" ref="open" />
				</li>
			</ul>
			<div class="right"><a href="javascript:;">品牌</a><a href="javascript:;">专题</a></div>
		</div>
	</div>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue';
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';
export default {
	name: 'AppHeaderSticky',
	data() {
		return {
			y: '',
		};
	},
	computed: {
		...mapState('category', ['categoryDataList']),
	},
	components: { AppHeaderNav },
	methods: {
		showNav(id) {
			this.$refs.open[id].isShow = true;
		},
		hideNav(id) {
			this.$refs.open[id].isShow = false;
		},
		isShowHeader: throttle(function () {
			this.y = window.pageYOffset;
		}, 50),
	},
	mounted() {
		window.addEventListener('scroll', this.isShowHeader);
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.show {
	transition: all 0.3s linear;
	transform: none !important;
	opacity: 1 !important;
}
.app-header-sticky {
	width: 100%;
	height: 80px;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	background-color: #fff;
	border-bottom: 1px solid #e4e4e4;
	transform: translateY(-100%);
	opacity: 0;
	.container {
		display: flex;
		align-items: center;
		.logo-header-sticky {
			width: 200px;
			height: 80px;
			background: url(../assets/images/logo.png) no-repeat right 2px;
			background-size: 160px auto;
		}
		.app-header-nav {
			width: 820px;
			display: flex;
			justify-content: space-around;
			padding-left: 40px;
			position: relative;
			z-index: 999;
			> li {
				margin-right: 40px;
				width: 38px;
				text-align: center;
				> a {
					font-size: 16px;
					line-height: 32px;
					height: 32px;
					display: inline-block;
				}
				&:hover,
				&.active {
					> a {
						color: @xtxColor;
						border-bottom: 1px solid @xtxColor;
					}
				}
			}
		}
		.right {
			width: 220px;
			display: flex;
			text-align: center;
			padding-left: 40px;
			border-left: 2px solid @xtxColor;
			> a {
				width: 38px;
				margin-right: 40px;
				font-size: 16px;
				line-height: 1;
			}
		}
	}
}
</style>
