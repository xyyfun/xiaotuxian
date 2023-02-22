<template>
	<div class="home-brand">
		<div class="container">
			<HomeTitle>
				<template slot="title">
					<h3>热门品牌 <span>国际经典 品质保证</span></h3>
				</template>
				<template slot="more">
					<a class="prev xtx-btn-brand" href="javascript:;">&lt;</a>
					<a class="next xtx-btn-brand" href="javascript:;">&gt;</a>
				</template>
			</HomeTitle>
			<div class="brand-content">
				<ul>
					<li v-for="item in brandDataList" :key="item.id">
						<a href="javascript:;"><img :src="item.picture" alt="" /></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getBrand } from '@/api/home';
import HomeTitle from './home-title';
export default {
	name: 'HomeBrand',
	data() {
		return {
			brandDataList: [],
		};
	},
	components: {
		HomeTitle,
	},
	mounted() {
		getBrand().then(data => {
			if (data.data.code === '1') {
				this.brandDataList = data.data.result;
			}
		});
	},
};
</script>

<style lang="less" scoped>
.home-brand {
	background-color: #f5f5f5;
	.brand-content {
		width: 100%;
		height: 345px;
		overflow: hidden;
		padding-bottom: 40px;
		ul {
			display: flex;
			width: 200%;
			li {
				margin-right: 10px;
				width: 240px;
				a {
					img {
						width: 240px;
						height: 305px;
						vertical-align: middle;
					}
				}
			}
		}
	}
}
</style>
