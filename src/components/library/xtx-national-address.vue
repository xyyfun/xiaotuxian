<template>
	<div class="city-wrapper">
		<template v-if="cityData.length">
			<span
				class="item"
				v-for="item in cityData"
				:key="item.code"
				@click="changData(item.areaList, item.name, item.code, item.level)"
				>{{ item.name }}</span
			>
		</template>
		<template v-else>
			<img :src="require('../../assets/images/loading.gif')" alt="" />
		</template>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'XtxNationalAddress',
	data() {
		return {
			cityData: [],
			cityAddress: '', // 完整省市县
			provinceCode: '', // 省份代码
			cityCode: '', // 市代码
			countyCode: '', // 县代码
		};
	},
	methods: {
		getCityData() {
			return new Promise((resolv, reject) => {
				if (this.cityData.length) {
					resolv(this.cityData);
				} else {
					const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
					axios.get(url).then(res => {
						this.cityData = res.data;
						resolv(res.data);
					});
				}
			});
		},
		changData(cityCode, city, code, level) {
			if (level === 0) {
				// 省
				this.cityData = cityCode; // 重绘
				this.cityAddress += city; // 拼接地址
				this.provinceCode = code; // 省
			} else if (level === 1) {
				// 市
				this.cityData = cityCode; // 重绘
				this.cityAddress += city; // 拼接地址
				this.cityCode = code; // 市
			} else if (level === 2) {
				// 县
				this.cityData = cityCode; // 重绘
				this.cityAddress += city; // 拼接地址
				this.countyCode = code; // 县
				// 通知组件接收数据
				this.$bus.$emit(
					'city',
					this.cityAddress,
					this.provinceCode,
					this.cityCode,
					this.countyCode
				);
			}
		},
	},
	created() {
		this.getCityData();
	},
};
</script>

<style lang="less" scoped>
.city-wrapper {
	z-index: 9;
	position: absolute;
	left: 0;
	bottom: 1px;
	transform: translateY(100%);
	width: 522px;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	border: 1px solid #e4e4e4;
	background: #fff;
	.item {
		text-align: center;
		line-height: 30px;
		width: 125px;
		padding: 0 5px;
		overflow: hidden;
		height: 30px;
		cursor: pointer;
		&:hover {
			background-color: #f5f5f5;
			color: #27ba9b;
			border-radius: 4px;
		}
	}
	img {
		padding: 90px 220px;
	}
}
</style>
