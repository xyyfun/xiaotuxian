<template>
	<div class="goods-relevant">
		<div class="header"><i class="icon"></i><span class="title">猜你喜欢</span></div>
		<div class="xtx-carousel">
			<ul class="carousel-body">
				<li class="carousel-item fade">
					<div class="slider">
						<router-link
							:to="`/goods/${item.id}`"
							class=""
							v-for="(item, index) in result"
							:key="index"
							><img :src="item.picture" alt="" />
							<p class="name ellipsis">{{ item.name }}</p>
							<p class="price">¥{{ item.price }}</p></router-link
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getSame } from '@/api/goods';
export default {
	name: 'CartGuess',
	data() {
		return {
			result: [],
		};
	},
	created() {
		getSame('', 4).then(data => {
			if (data.data.code === '1') {
				this.result = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
.goods-relevant {
	background: rgb(255, 255, 255);
	min-height: 420px;
	margin-top: 20px;
	.header {
		height: 80px;
		line-height: 80px;
		padding: 0px 20px;
		.icon {
			width: 16px;
			height: 16px;
			display: inline-block;
			border-top: 4px solid rgb(39, 186, 155);
			border-right: 4px solid rgb(39, 186, 155);
			box-sizing: border-box;
			position: relative;
			transform: rotate(45deg);
			&::before {
				content: '';
				width: 10px;
				height: 10px;
				position: absolute;
				left: 0px;
				top: 2px;
				background: rgb(188, 241, 230);
			}
		}
		.title {
			font-size: 20px;
			padding-left: 10px;
		}
	}
	.xtx-carousel {
		width: 100%;
		height: 100%;
		min-width: 300px;
		min-height: 150px;
		position: relative;
		.slider {
			display: flex;
			justify-content: space-around;
			padding: 0 40px;
			> a {
				width: 240px;
				text-align: center;
				img {
					padding: 20px;
					width: 230px !important;
					height: 230px !important;
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
</style>
