<template>
	<div class="xtx-goods-page">
		<transition>
			<div class="container" v-show="elementOver">
				<AppBread />
				<GoodsInfo :result="goodsData" @load="over" />
				<XtxGuess title="同类推荐" :id="result.id" />
				<GoodsFooter :details="details" :weekHotList="weekHotList" :dayHotList="dayHotList" />
			</div>
		</transition>

		<div class="load" v-if="!elementOver">
			<div class="loading">
				<img src="../../assets/images/loading.gif" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import { getHotList, getGoodsDataList } from '@/api/goods';
import AppBread from '@/components/app-bread';
import GoodsInfo from './components/goods-info';
import XtxGuess from '@/components/library/xtx-guess';
import GoodsFooter from './components/goods-footer';
export default {
	name: 'Goods',
	data() {
		return {
			details: {}, // 商品底部信息
			dayHotList: [], // 24小时热销
			weekHotList: [], // 周销
			result: {}, // 商品数据
			elementOver: false, // 是否显示商品
			loadImgNum: 0, // 加载完毕的图片数
			waitImgNum: 0, // 待加载的图片数
		};
	},
	computed: {
		// 商品主要数据
		goodsData() {
			let obj = {
				desc: this.result.desc,
				name: this.result.name,
				oldPrice: this.result.oldPrice,
				price: this.result.price,
				skus: this.result.skus,
				specs: this.result.specs,
				mainPictures: this.result.mainPictures,
				id: this.result.id,
			};
			return obj;
		},
	},
	watch: {
		// 初始化时调用接口
		$route: {
			immediate: true,
			handler(to) {
				this.result = {};
				this.elementOver = false;
				this.loadImgNum = 0;
				this.waitImgNum = 0;
				let id = to.params.id;
				this.hot(id);
				this.week(id);
				this.goods(id);
			},
		},
		result(newVal) {
			// 计算多少张图片等待加载
			if (newVal.specs) {
				let i = 0;
				this.result.specs.forEach(e => {
					e.values.forEach(e => {
						if (e.picture) i++;
					});
				});
				this.result.mainPictures.forEach(e => {
					if (e) i++;
				});
				this.waitImgNum = i;
			}
		},
	},
	components: { AppBread, GoodsInfo, XtxGuess, GoodsFooter },
	methods: {
		// 24小时热榜
		hot(id) {
			getHotList(id, 4, 1).then(data => {
				if (data.data.code === '1') {
					this.dayHotList = data.data.result;
				}
			});
		},
		week(id) {
			// 周热榜
			getHotList(id, 4, 2).then(data => {
				if (data.data.code === '1') {
					this.weekHotList = data.data.result;
				}
			});
		},
		goods(id) {
			// 商品数据
			getGoodsDataList(id).then(data => {
				// 添加自定义属性|判断是否选中 selected(选中) disabled(未选中)
				data.data.result.specs.forEach(element => {
					element.values.forEach(e => {
						e.selected = false;
						e.disabled = false;
					});
				});
				this.result = data.data.result;
				this.details = data.data.result.details;
			});
		},
		// 图片加载完成加载此函数 将 elementOver 改为 true
		over() {
			this.loadImgNum++;
			if (this.waitImgNum) {
				if (this.waitImgNum === this.loadImgNum) {
					this.elementOver = true; // 图片加载完毕|显示商品
					// 将面包屑数据打包发送给组件
					this.$bus.$emit('bread', this.result.categories, this.result.name, this.result.id);
				}
			}
		},
	},
};
</script>

<style lang="less" scoped>
.xtx-goods-page {
	background-color: #f5f5f5;
	.load {
		width: 1240px;
		margin: 0 auto;
		padding-top: 72px;
		.loading {
			width: 100%;
			height: 600px;
			background-color: #fff;
			display: flex;
			img {
				margin: auto;
			}
		}
	}
} /* 进入的起点,离开的终点 */
.v-enter,
.v-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.v-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.v-enter-to,
.v-leave {
	opacity: 1;
}
</style>
