<template>
	<div class="xtx-goods-page">
		<div class="container" v-show="elementOver">
			<AppBread />
			<GoodsInfo :result="goodsData" @load="over" />
			<GoodsRelevant :same="same" />
			<GoodsFooter :details="details" :weekHotList="weekHotList" :dayHotList="dayHotList" />
		</div>
		<div class="load" v-if="!elementOver">
			<div class="loading">
				<img src="../../assets/images/load.gif" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import { getHotList, getSame, getGoodsDataList } from '@/api/goods';
import AppBread from '@/components/app-bread';
import GoodsInfo from './components/goods-info';
import GoodsRelevant from './components/goods-relevant';
import GoodsFooter from './components/goods-footer';
export default {
	name: 'Goods',
	data() {
		return {
			details: {}, // 商品底部信息
			dayHotList: [], // 24小时热销
			weekHotList: [], // 周销
			same: [], // 同类推荐
			result: {}, // 商品数据
			elementOver: false, // 是否显示商品
			loadImgNum: 0, // 加载完毕的图片数
			waitImgNum: 0, // 待加载的图片数
		};
	},
	computed: {
		goodsData() {
			let obj = {
				desc: this.result.desc,
				name: this.result.name,
				oldPrice: this.result.oldPrice,
				price: this.result.price,
				specs: this.result.specs,
				mainPictures: this.result.mainPictures,
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
				let id = to.params.id;
				this.hot(id);
				this.week(id);
				this.sameRec(id);
				this.goods(id);
			},
		},
		result() {
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
		},
	},
	components: { AppBread, GoodsInfo, GoodsRelevant, GoodsFooter },
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
		sameRec(id) {
			// 同类推荐
			getSame(id, 4).then(data => {
				if (data.data.code === '1') {
					this.same = data.data.result;
				}
			});
		},
		goods(id) {
			// 商品数据
			getGoodsDataList(id).then(data => {
				if (data.data.code === '1') {
					this.result = data.data.result;
					this.details = data.data.result.details;
				}
			});
		},
		over() {
			this.loadImgNum++;
			if (this.waitImgNum) {
				if (this.waitImgNum === this.loadImgNum) this.elementOver = true;
			}
		},
	},
	beforeDestroy() {
		this.$off('load');
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
}
</style>
