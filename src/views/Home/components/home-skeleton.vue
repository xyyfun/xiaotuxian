<template>
	<div class="home-skeleton" :style="{ father }">
		<ul :style="{ height }">
			<li :style="{ width, height }" v-for="(item, index) in number" :key="index">
				<XtxSkeleton :width="width" :height="height" animated />
			</li>
		</ul>
	</div>
</template>

<script>
import XtxSkeleton from '@/components/library/xtx-skeleton';
export default {
	name: 'HomeSkeleton',
	components: { XtxSkeleton },
	props: ['father', 'width', 'height', 'number'],
};
</script>

<style lang="less" scoped>
.home-skeleton {
	ul {
		display: flex;
		justify-content: space-between;
	}
}
</style>
