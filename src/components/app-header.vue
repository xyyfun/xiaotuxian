<template>
	<header class="app-header">
		<div class="container">
			<h1 class="logo"><router-link to="/home">小兔鲜儿</router-link></h1>
			<ul class="navs">
				<li class="home"><router-link to="/home">首页</router-link></li>
				<li
					v-for="(item, index) in categoryDataList"
					:key="item.id"
					@mouseenter="showNav(index)"
					@mouseleave="hideNav(index)">
					<router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
					<AppHeaderNav :children="item.children" ref="open" />
				</li>
			</ul>
			<div class="search">
				<i class="icon-search iconfont"></i>
				<input type="text" placeholder="搜一搜" />
			</div>
			<div class="cart" @mouseenter="isShowLayer = true" @mouseleave="isShowLayer = false">
				<router-link to="/cart" class="curr">
					<i class="icon-cart iconfont"></i><em v-if="allSelectedNum > 0">{{ allSelectedNum }}</em>
				</router-link>
				<transition name="a">
					<div class="layer" v-show="isShowLayer && $route.path !== '/cart' && allSelectedNum > 0">
						<div class="list">
							<div class="item" v-for="item in list" :key="item.skuId">
								<router-link :to="`/goods/${item.id}`"
									><img :src="item.picture" alt="" />
									<div class="center">
										<p class="name ellipsis">{{ item.name }}</p>
										<p class="attr ellipsis">{{ item.attrsText }}</p>
									</div>
									<div class="right">
										<p class="price">¥{{ item.price }}</p>
										<p class="count">x{{ item.count }}</p>
									</div></router-link
								><i class="iconfont icon-close" @click="remove(item.skuId)"></i>
							</div>
						</div>
						<div class="foot">
							<div class="total">
								<p>共 {{ allSelectedNum }} 件商品</p>
								<p>¥{{ allSelectedTotalPrice }}</p>
							</div>
							<button class="xtx-button" @click="$router.push('/cart')">去购物车结算</button>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav';
import { mapGetters, mapState } from 'vuex';
export default {
	name: 'AppHeader',
	data() {
		return {
			isShowLayer: false,
		};
	},
	computed: {
		...mapState('category', ['categoryDataList']),
		...mapState('cart', ['list']),
		...mapGetters('cart', ['allSelectedNum', 'allSelectedTotalPrice']),
	},
	components: { AppHeaderNav },
	methods: {
		showNav(id) {
			this.$refs.open[id].isShow = true;
		},
		hideNav(id) {
			this.$refs.open[id].isShow = false;
		},
		// 删除商品
		remove(skuId) {
			this.$store.dispatch('cart/removeCartGoods', skuId);
		},
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.app-header {
	background: #fff;
	.container {
		display: flex;
		align-items: center;
	}
	.logo {
		width: 200px;
		a {
			display: block;
			height: 132px;
			width: 100%;
			text-indent: -9999px;
			background: url(../assets/images/logo.png) no-repeat center 18px / contain;
		}
	}
	.navs {
		width: 820px;
		display: flex;
		justify-content: space-around;
		position: relative;
		padding-left: 40px;
		li {
			margin-right: 40px;
			width: 38px;
			text-align: center;
			a {
				font-size: 16px;
				line-height: 32px;
				height: 32px;
				display: inline-block;
			}
			&:hover {
				a {
					color: @xtxColor;
					border-bottom: 1px solid @xtxColor;
				}
			}
		}
	}
	.search {
		width: 170px;
		height: 32px;
		position: relative;
		border-bottom: 1px solid #e7e7e7;
		line-height: 32px;
		.icon-search {
			font-size: 18px;
			margin-left: 5px;
		}
		input {
			width: 140px;
			padding-left: 5px;
			color: #666;
		}
	}
	.cart {
		width: 50px;
		position: relative;
		z-index: 600;
		.curr {
			height: 32px;
			line-height: 32px;
			text-align: center;
			position: relative;
			display: block;
			.icon-cart {
				font-size: 22px;
			}
			em {
				font-style: normal;
				position: absolute;
				right: 0;
				top: 0;
				padding: 1px 6px;
				line-height: 1;
				background: @helpColor;
				color: #fff;
				font-size: 12px;
				border-radius: 10px;
				font-family: Arial;
			}
		}
		.layer {
			position: absolute;
			top: 50px;
			right: 0;
			width: 400px;
			height: 400px;
			box-shadow: 0 0 10px rgb(0 0 0 / 20%);
			background: #fff;
			border-radius: 4px;
			padding-top: 10px;
			&:before {
				content: '';
				position: absolute;
				right: 14px;
				top: -10px;
				width: 20px;
				height: 20px;
				background: #fff;
				transform: scaleX(0.6) rotate(45deg);
				box-shadow: -3px -3px 5px rgb(0 0 0 / 10%);
			}
			.list {
				height: 310px;
				overflow: auto;
				padding: 0 10px;
				&::-webkit-scrollbar {
					/*滚动条整体样式*/
					width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
					height: 1px;
				}
				&::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius: 10px;
					// box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
					background: #b5b5b5;
				}
				&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					border-radius: 10px;
					background: #f5f5f5;
				}
				.item {
					border-bottom: 1px solid #f5f5f5;
					padding: 10px 0;
					position: relative;
					a {
						display: flex;
						align-items: center;
						img {
							height: 80px;
							width: 80px;
						}
						.center {
							padding: 0 10px;
							width: 200px;
							.cart .list .item a .center .name {
								font-size: 16px;
							}
							.attr {
								color: #999;
								padding-top: 5px;
							}
						}
						.right {
							width: 100px;
							padding-right: 20px;
							text-align: center;
							.price {
								font-size: 16px;
								color: #cf4444;
							}
							.count {
								color: #999;
								margin-top: 5px;
								font-size: 16px;
							}
						}
					}
					i {
						position: absolute;
						bottom: 38px;
						right: 0;
						opacity: 0;
						color: #666;
						transition: all 0.5s;
						cursor: pointer;
					}
					&:hover > i {
						opacity: 1;
					}
				}
			}
			.foot {
				position: absolute;
				left: 0;
				bottom: 0;
				height: 70px;
				width: 100%;
				padding: 10px;
				display: flex;
				justify-content: space-between;
				background: #f8f8f8;
				align-items: center;
				.total {
					padding-left: 10px;
					color: #999;
					p {
						&:last-child {
							font-size: 18px;
							color: #cf4444;
						}
					}
				}
				.xtx-button {
					width: 180px;
					height: 50px;
					font-size: 16px;
					appearance: none;
					outline: none;
					text-align: center;
					border: 1px solid transparent;
					border-color: #27ba9b;
					color: #27ba9b;
					background: #e6faf6;
					border-radius: 4px;
					cursor: pointer;
				}
			}
		}
	}
}

.a-enter,
.a-leave-to {
	opacity: 0;
	transform: translateY(-200px) scaleY(0);
}
/* 进入进行时,离开进行时 */
.a-enter-active,
.a-leave-active {
	transition: all 0.2s linear;
}

/* 进入的终点,离开的起点 */
.a-enter-to,
.a-leave {
	opacity: 1;
	transform: none;
}
</style>
