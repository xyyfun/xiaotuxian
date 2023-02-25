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
						<li><span class="dt">适用季节</span><span class="dd">冬季、秋季</span></li>
						<li><span class="dt">尺码</span><span class="dd">38、39、40、41、42、43、44</span></li>
						<li><span class="dt">帮面材质</span><span class="dd">真皮</span></li>
						<li>
							<span class="dt">售后服务</span
							><span class="dd"
								>1、我们承诺按鞋品三包准则进行售后退换货等服务，详情可见内盒三包卡条约。
								2、非质量问题的退换货，寄回时请保持商品的原始购买状态：内包装完好，吊牌及吊线完好（如有），无磨损，无污渍，无清洗。且不要遗忘任何私人物品于包装中</span
							>
						</li>
						<li>
							<span class="dt">品牌属性</span
							><span class="dd">网易严选推荐选品，本产品为Gary.chen品牌，由Gary.chen生产制造 </span>
						</li>
					</ul>
					<img
						src="https://yanxuan-item.nosdn.127.net/aea43d98167c842d70b9dd4e1e8cab18.jpg"
						alt=""
					/><img
						src="https://yanxuan-item.nosdn.127.net/5547596426851c94413de7413b71adfb.jpg"
						alt=""
					/>
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
				<p>默认使用顺丰快递发货(个别商品使用其他快递）</p>
				<p>配送范围覆盖全国大部分地区(港澳台地区除外）</p>
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
					<a class="goods-item"
						><img alt="" src="" />
						<p class="name ellipsis"></p>
						<p class="desc ellipsis"></p>
						<p class="price">¥</p></a
					>
				</div>
			</div>
			<div class="goods-hot">
				<h3>周热销榜</h3>
				<div>
					<a
						aria-current="page"
						href="#/product/3811050"
						class="router-link-active router-link-exact-active goods-item"
						><img
							alt=""
							src="https://yanxuan-item.nosdn.127.net/bfb1b8d93a34205bfa9f2f8e64150b24.png"
						/>
						<p class="name ellipsis">无惧踩泥涉水，男式牛皮工装切尔西靴</p>
						<p class="desc ellipsis">商务精英的野心之选</p>
						<p class="price">¥390.00</p></a
					><a href="#/product/3441061" class="goods-item"
						><img
							alt=""
							src="https://yanxuan-item.nosdn.127.net/18e583e27a7cd9f2fb25eca0507936db.png"
						/>
						<p class="name ellipsis">女式羊反绒流苏装饰轻便乐福鞋</p>
						<p class="desc ellipsis">轻灵流苏，自由穿脱</p>
						<p class="price">¥179.00</p></a
					><a href="#/product/3989000" class="goods-item"
						><img
							alt=""
							src="https://yanxuan-item.nosdn.127.net/c28641dbf14645f518ee01df668daca7.png"
						/>
						<p class="name ellipsis">酸爽酸菜鱼，麻香藤椒虾手工水饺360g</p>
						<p class="desc ellipsis">严选食材，汤汁浓郁，两种口味吃不够</p>
						<p class="price">¥19.90</p></a
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsFooter',
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
