<template>
	<div class="app-body">
		<!-- 中心 -->
		<div class="home-carousel">
			<div class="container">
				<!-- 左侧分类推荐 -->
				<HomeBanner />
				<!-- 轮播图 -->
				<HomeCategory />
			</div>
		</div>
		<!-- 新鲜好物 -->
		<HomeNew />
		<!-- 人气推荐 -->
		<HomeHot />
		<!-- 热门品牌 -->
		<HomeBrand />
		<!-- 产品 -->
		<HomeProduct />
		<!-- 专题 -->
		<HomeSpecial />
	</div>
</template>

<script>
import HomeBanner from './components/home-banner';
import HomeCategory from './components/home-category';
import HomeNew from './components/home-new';
import HomeHot from './components/home-hot';
import HomeBrand from './components/home-brand';
import HomeProduct from './components/home-product';
import HomeSpecial from './components/home-special';
export default {
	name: 'Home',
	components: {
		HomeBanner,
		HomeCategory,
		HomeNew,
		HomeHot,
		HomeBrand,
		HomeProduct,
		HomeSpecial,
	},
};
</script>

<style lang="less" scoped>
.home-carousel {
	background-color: #f5f5f5;
	.container {
		position: relative;
		height: 500px;
	}
}
</style>
