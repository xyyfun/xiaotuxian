<template>
	<div class="goods-info">
		<!-- 左侧展示图 -->
		<div class="media">
			<div class="goods-image">
				<div class="middle">
					<img :src="imageUrl || error" alt="" />
					<div class="layer" ref="layer"></div>
					<div class="aa" @mousemove="mouseIn"></div>
				</div>
				<!-- 大图 -->
				<div
					class="large"
					:style="[{ backgroundImage: `url(${imageUrl || error})` }, bigPosition]"></div>
				<!-- 右侧图片 -->
				<ul class="small">
					<li
						@click="changImg(mainPictures)"
						v-for="(mainPictures, index) in result.mainPictures"
						:key="index"
						:class="{ active: mainPictures === imageUrl }">
						<img :src="mainPictures || error" alt="" v-load-img="loadingImg" />
					</li>
				</ul>
			</div>
			<ul class="goods-sales">
				<li>
					<p>销量人气</p>
					<p>200+</p>
					<p><i class="iconfont icon-hot"></i>销量人气</p>
				</li>
				<li>
					<p>商品评价</p>
					<p>400+</p>
					<p><i class="iconfont icon-comments"></i>查看评价</p>
				</li>
				<li>
					<p>收藏人气</p>
					<p>600+</p>
					<p @click="collectGoods"><i class="iconfont icon-shoucang"></i>收藏商品</p>
				</li>
				<li>
					<p>品牌信息</p>
					<p>苏宁电器</p>
					<p><i class="iconfont icon-home2"></i>品牌主页</p>
				</li>
			</ul>
		</div>
		<!-- 右侧商品信息 -->
		<div class="spec">
			<p class="g-name">{{ result.name }}</p>
			<p class="g-desc">{{ result.desc }}</p>
			<p class="g-price">
				<span>{{ result.price }}</span
				><span>{{ result.oldPrice }}</span>
			</p>
			<div class="g-service">
				<dl>
					<dt>促销</dt>
					<dd>12月好物放送，App领券购买直降120元</dd>
				</dl>
				<dl>
					<dt>配送</dt>
					<dd>
						<b style="vertical-align: middle; padding-right: 5px; font-weight: normal">至</b>
						<div class="xtx-city">
							<div class="select">
								<span class="value">北京市 市辖区 东城区</span
								><i class="iconfont icon-moreunfold"></i>
							</div>
						</div>
					</dd>
				</dl>
				<dl>
					<dt>服务</dt>
					<dd>
						<span>无忧退货</span><span>快速退款</span><span>免费包邮</span
						><a href="javascript:;">了解详情</a>
					</dd>
				</dl>
			</div>
			<div class="goods-sku">
				<dl v-for="item in result.specs" :key="item.id">
					<dt>{{ item.name }}</dt>
					<dd>
						<template v-for="value in item.values" :key="">
							<img
								:class="{ selected: value.selected, disabled: value.disabled }"
								:src="value.picture || error"
								:title="value.name"
								v-if="value.picture"
								v-load-img="loadingImg"
								@click="handlerSpecs(item, value)" />
							<span
								@click="handlerSpecs(item, value)"
								:class="{ selected: value.selected, disabled: value.disabled }"
								v-else
								>{{ value.name }}</span
							>
						</template>
					</dd>
				</dl>
			</div>
			<div class="xtx-numbox">
				<div class="label">数量</div>
				<div class="numbox">
					<a @click="goodsNumSub" href="javascript:;">-</a
					><input type="text" readonly v-model="goodsNum" />
					<a @click="goodsNum++" href="javascript:;">+</a>
				</div>
			</div>
			<button class="primary" @click="addCartGoods">加入购物车</button>
		</div>
	</div>
</template>

<script>
import { addCart } from '@/api/cart';
import { addCollect } from '@/api/member';
import getPowerSet from '@/utils/power-set';
export default {
	name: 'GoodsInfo',
	data() {
		return {
			// 数量
			goodsNum: 1,
			imageUrl: '',
			bigPosition: {
				backgroundPositionX: 0,
				backgroundPositionY: 0,
			},
			error: require('../../../assets/images/200.png'),
			pathMap: null, // 字典
			spec: '', // 规格
			symbol: '※',
		};
	},
	props: ['result'],
	watch: {
		result(newVal) {
			if (newVal.mainPictures) this.imageUrl = this.result.mainPictures[0];
		},
	},
	methods: {
		// 修改商品选中状态
		handlerSpecs(item, val) {
			if (val.disabled) return; // 如果按钮被禁用直接return
			if (val.selected) {
				val.selected = false;
			} else {
				item.values.forEach(bv => {
					bv.selected = false;
				});
				val.selected = true;
			}
			// 禁用库存为空的按钮
			if (!this.pathMap) this.getPathMap(); // 字典为空时获取字典
			// 根据字典判断库存 为空时禁用按钮
			this.result.specs.forEach((spec, i) => {
				const selectedArr = this.getSelectedArr(this.result.specs);
				spec.values.forEach(val => {
					// 已经选中的按钮不用判断
					if (val.name === selectedArr[i]) return false;
					// 未选中的替换对应的值
					selectedArr[i] = val.name;
					// 过滤无效值得到key
					const key = selectedArr.filter(v => v).join(this.symbol);
					// 设置禁用状态
					val.disabled = !this.pathMap[key];
				});
			});
		},
		// 得到当前选中规格集合
		getSelectedArr(specs) {
			const selectedArr = [];
			specs.forEach(spec => {
				const selectedVal = spec.values.find(val => val.selected);
				selectedArr.push(selectedVal ? selectedVal.name : undefined);
			});
			this.spec = selectedArr.join(this.symbol);
			return selectedArr;
		},
		// pathMap字典
		getPathMap() {
			const pathMap = {};
			this.result.skus.forEach(sku => {
				// 判断是否有库存
				if (sku.inventory) {
					const specs = sku.specs.map(spec => spec.valueName); // 得到 规格+颜色（拼接）
					const powerSet = getPowerSet(specs);
					powerSet.forEach(set => {
						const key = set.join(this.symbol);
						if (pathMap[key]) {
							// 已经有key往数组追加
							pathMap[key].push(sku.id);
						} else {
							// 没有key设置一个数组
							pathMap[key] = [sku.id];
						}
					});
				}
			});
			this.pathMap = pathMap;
		},
		// 数量选择|最低1
		goodsNumSub() {
			if (this.goodsNum <= 1) return;
			this.goodsNum--;
		},
		// 遮罩层移动
		mouseIn(e) {
			let layer = this.$refs.layer;
			let left = e.offsetX - layer.offsetWidth / 2;
			let top = e.offsetY - layer.offsetHeight / 2;
			// 限制遮罩层移动区域
			if (left <= 0) left = 0;
			if (left >= layer.offsetWidth) left = layer.offsetWidth;
			if (top <= 0) top = 0;
			if (top >= layer.offsetHeight) top = layer.offsetHeight;
			layer.style.left = left + 'px';
			layer.style.top = top + 'px';
			this.bigPosition.backgroundPositionX = -left * 2 + 'px';
			this.bigPosition.backgroundPositionY = -top * 2 + 'px';
		},
		// 加入购物车
		addCartGoods() {
			let i = 0;
			this.spec.split(this.symbol).forEach(e => {
				if (e) i++;
			});
			if (this.result.specs.length === i) {
				const sku = this.pathMap[this.spec]; // skuId
				addCart(sku[0], this.goodsNum).then(data => {
					this.$message({
						message: '加入购物车成功！',
						type: 'success',
					});
					// 更新购物车
					this.$store.dispatch('cart/getCartDataList');
				});
			} else {
				this.$message({
					message: '请选择完整规格！',
					type: 'warning',
				});
			}
		},
		changImg(url) {
			this.imageUrl = url;
		},
		clickSpecs(item, val) {
			this.$emit('changSpecs', item, val);
		},
		loadingImg() {
			this.$emit('load');
		},
		// 添加收藏
		collectGoods() {
			addCollect(this.result.id, 1).then(
				resolv => {
					this.$message({
						type: 'success',
						message: '收藏成功!',
					});
				},
				reject => {
					this.$message({
						type: 'error',
						message: '收藏失败，请稍后再试!',
					});
				}
			);
		},
	},
	directives: {
		'load-img'(el, binding, VNode) {
			el.onload = function () {
				if (el.src) {
					if (el.src.slice(0, 4) === 'http') {
						VNode.context.loadingImg();
					}
				}
			};
		},
	},
	beforeDestroy() {
		this.$off(['load']);
	},
};
</script>

<style lang="less" scoped>
.goods-info {
	min-height: 600px;
	background: #fff;
	display: flex;
	.media {
		width: 580px;
		height: 600px;
		padding: 30px 50px;
		.goods-image {
			width: 480px;
			height: 400px;
			position: relative;
			display: flex;
			z-index: 500;
			.large {
				position: absolute;
				top: 0;
				left: 412px;
				width: 400px;
				height: 400px;
				box-shadow: 0 0 10px rgb(0 0 0 / 10%);
				background-repeat: no-repeat;
				background-size: 800px 800px;
				background-color: #f8f8f8;
				display: none;
			}
			.middle {
				width: 400px;
				height: 400px;
				background: #f5f5f5;
				position: relative;
				z-index: 999;
				cursor: move;
				img {
					width: 400px;
					height: 400px;
					vertical-align: middle;
				}
				.aa {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
				.layer {
					width: 200px;
					height: 200px;
					background: rgba(0, 0, 0, 0.2);
					position: absolute;
					top: 0;
					left: 0;
					display: none;
				}
			}
			.middle:hover > .layer,
			.middle:hover + .large {
				display: block;
			}
			.small {
				width: 80px;
				> li {
					width: 68px;
					height: 68px;
					margin-left: 12px;
					margin-bottom: 15px;
					cursor: pointer;
				}
				.active,
				.selected {
					border: 2px solid #27ba9b;
				}
			}
		}
		.goods-sales {
			display: flex;
			width: 400px;
			align-items: center;
			text-align: center;
			height: 140px;
			li {
				flex: 1;
				position: relative;
				p:first-child {
					color: #999;
				}
				p:nth-child(2) {
					color: #cf4444;
					margin-top: 10px;
				}
				p:last-child {
					color: #666;
					margin-top: 10px;
					cursor: pointer;
				}
				p:last-child i {
					color: #27ba9b;
					font-size: 14px;
					margin-right: 2px;
				}
				~ li:after {
					content: '';
					position: absolute;
					top: 10px;
					left: 0;
					height: 60px;
					border-left: 1px solid #e4e4e4;
				}
			}
		}
	}
	.spec {
		flex: 1;
		padding: 30px 30px 30px 0;
		.g-name {
			font-size: 22px;
		}
		.g-desc {
			color: #999;
			margin-top: 10px;
		}
		.g-price {
			margin-top: 10px;
			span:first-child {
				color: #cf4444;
				margin-right: 10px;
				font-size: 22px;
				&::before {
					content: '¥';
					font-size: 14px;
				}
			}
			span:last-child {
				color: #999;
				text-decoration: line-through;
				font-size: 16px;
				&::before {
					content: '¥';
					font-size: 14px;
				}
			}
		}
		.g-service {
			background: #f5f5f5;
			width: 500px;
			padding: 20px 10px 0 10px;
			margin-top: 10px;
			dl {
				padding-bottom: 20px;
				display: flex;
				align-items: center;
				dt {
					width: 50px;
					color: #999;
				}
				dd {
					color: #666;
					b {
						display: inline-block;
						vertical-align: middle;
						padding-right: 5px;
						font-weight: normal;
					}
					.xtx-city {
						display: inline-block;
						vertical-align: middle;
						.select {
							border: 1px solid #e4e4e4;
							height: 30px;
							padding: 0 5px;
							line-height: 28px;
							cursor: pointer;
							overflow: hidden;
							.value {
								color: #666;
								font-size: 12px;
							}
							i {
								font-size: 12px;
								margin-left: 5px;
							}
						}
					}
					> span {
						margin-right: 10px;
						&::before {
							content: '•';
							color: rgb(39, 186, 155);
							margin-right: 2px;
						}
					}
					&:last-child a {
						color: #27ba9b;
					}
				}
			}
		}
		.goods-sku {
			padding-left: 10px;
			padding-top: 20px;
			dl {
				display: flex;
				padding-bottom: 10px;
				align-items: center;
				dt {
					width: 50px;
					color: #999;
				}
				dd {
					flex: 1;
					color: #666;
					line-height: 40px;
					> img {
						width: 50px;
						height: 50px;
						margin-bottom: 5px;
						border: 1px solid #e4e4e4;
						margin-right: 10px;
						cursor: pointer;
					}
					> span {
						display: inline-block;
						height: 30px;
						line-height: 28px;
						padding: 0 20px;
						border: 1px solid #e4e4e4;
						margin-right: 10px;
						cursor: pointer;
					}
					.disabled {
						opacity: 0.6;
						border-style: dashed;
						cursor: not-allowed;
					}
					> .selected {
						border-color: #27ba9b;
					}
				}
			}
		}
		.xtx-numbox {
			display: flex;
			align-items: center;
			.label {
				width: 60px;
				color: #999;
				padding-left: 10px;
			}
			.numbox {
				width: 120px;
				height: 30px;
				border: 1px solid #e4e4e4;
				display: flex;
				> a {
					width: 29px;
					line-height: 28px;
					text-align: center;
					background: #f8f8f8;
					font-size: 16px;
					color: #666;
				}
				> a:first-of-type {
					border-right: 1px solid #e4e4e4;
				}
				> input {
					width: 60px;
					padding: 0 5px;
					text-align: center;
					color: #666;
				}
				> a:last-of-type {
					border-left: 1px solid #e4e4e4;
				}
			}
		}
		.primary {
			border-color: #27ba9b;
			background: #27ba9b;
			color: #fff;
			margin-top: 20px;
			width: 180px;
			height: 50px;
			font-size: 16px;
			text-align: center;
			border: 1px solid transparent;
			border-radius: 4px;
			cursor: pointer;
		}
	}
}
</style>
