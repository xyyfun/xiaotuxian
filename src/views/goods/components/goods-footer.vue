<template>
	<div class="goods-footer">
		<div class="goods-article">
			<div class="goods-tabs">
				<nav>
					<a class="active" href="javascript:;">商品详情</a
					><a class="" href="javascript:;">商品评价<span>(0)</span></a>
				</nav>
				<div class="goods-detail">
					<ul class="attrs">
						<li v-for="(prompt, index) in details.properties" :key="index">
							<span class="dt">{{ prompt.name }}</span>
							<span class="dd">{{ prompt.value }}</span>
						</li>
					</ul>
					<img v-for="(img, index) in details.pictures" :key="index" v-lazy="img" alt="" />
				</div>
			</div>
			<div class="goods-warn">
				<h3>注意事项</h3>
				<p class="tit">• 购买运费如何收取？</p>
				<p>
					单笔订单金额(不含运费)满88元免邮费；不满88元，每单收取10元运费。（港澳台地区需满500元免邮费；不满500元，每单收取30元运费)
				</p>
				<br />
				<p class="tit">• 使用什么快递发货?</p>
				<p>默认使用顺丰快递发货（个别商品使用其他快递）</p>
				<p>配送范围覆盖全国大部分地区（港澳台地区除外）</p>
				<br />
				<p class="tit">• 如何申请退货?</p>
				<p>
					1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；
				</p>
				<p>2.内裤和食品等特殊商品无质量问题不支持退货；</p>
				<p>
					3.退货流程： 确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；
				</p>
				<p>
					4.因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销。因客户个人原因产生的退货，购买和寄回运费由客户个人承担。
				</p>
			</div>
		</div>
		<div class="goods-aside">
			<div class="goods-hot">
				<h3>24小时热销榜</h3>
				<div>
					<router-link
						:to="`/goods/${list.id}`"
						class="goods-item"
						v-for="(list, index) in dayHotList"
						:key="index"
						><img v-lazy="list.picture" alt="" />
						<p class="name ellipsis">{{ list.name }}</p>
						<p class="desc ellipsis">{{ list.desc }}</p>
						<p class="price">¥{{ list.price }}</p></router-link
					>
				</div>
			</div>
			<div class="goods-hot">
				<h3>周热销榜</h3>
				<div>
					<router-link
						:to="`/goods/${list.id}`"
						v-for="(list, index) in weekHotList"
						:key="index"
						class="router-link-active router-link-exact-active goods-item">
						<img v-lazy="list.picture" alt="" />
						<p class="name ellipsis">{{ list.name }}</p>
						<p class="desc ellipsis">{{ list.desc }}</p>
						<p class="price">¥{{ list.price }}</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsFooter',
	props: ['details', 'dayHotList', 'weekHotList'],
};
</script>

<style lang="less" scoped>
.goods-footer {
	display: flex;
	margin-top: 20px;
	.goods-article {
		width: 940px;
		margin-right: 20px;
		.goods-tabs {
			min-height: 600px;
			background: #fff;
			nav {
				height: 70px;
				line-height: 70px;
				display: flex;
				border-bottom: 1px solid #f5f5f5;
				a {
					padding: 0 40px;
					font-size: 18px;
					position: relative;
					&:first-child {
						border-right: 1px solid #f5f5f5;
					}
				}
			}
			.goods-detail {
				padding: 40px;
				.attrs {
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 30px;
					li {
						display: flex;
						margin-bottom: 10px;
						width: 50%;
						.dt {
							width: 100px;
							color: #999;
						}
						.dd {
							flex: 1;
							color: #666;
						}
					}
				}
				> img {
					width: 100%;
				}
			}
		}
		.goods-warn {
			margin-top: 20px;
			background: #fff;
			padding-bottom: 40px;
			h3 {
				height: 70px;
				line-height: 70px;
				border-bottom: 1px solid #f5f5f5;
				padding-left: 50px;
				font-size: 18px;
				font-weight: 400;
				margin-bottom: 10px;
			}
			p {
				line-height: 40px;
				padding: 0 25px;
				color: #666;
			}
			.tit {
				color: #333;
			}
		}
	}
	.goods-aside {
		width: 280px;
		min-height: 1000px;
		.goods-hot {
			h3 {
				height: 70px;
				background: #e26237;
				color: #fff;
				font-size: 18px;
				line-height: 70px;
				padding-left: 25px;
				margin-bottom: 10px;
				font-weight: 400;
			}
			.goods-item {
				background: #fff;
				width: 100%;
				margin-bottom: 10px;
				display: block;
				padding: 20px 30px;
				text-align: center;
				transition: all 0.5s;
				img {
					width: 200px;
					height: 200px;
				}
				p {
					padding-top: 10px;
				}
				.name {
					font-size: 16px;
				}
				.desc {
					color: #999;
					height: 29px;
				}
				.price {
					color: #cf4444;
					font-size: 20px;
				}
			}
		}
	}
}
</style>
