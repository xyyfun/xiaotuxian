<template>
	<div class="xtx-footprint-list">
		<div class="item">
			<div class="line active"></div>
			<div class="goods">
				<p class="time">
					<span>今天</span
					><!---->
				</p>
				<ul></ul>
			</div>
		</div>
		<div class="item">
			<div class="line"></div>
			<div class="goods">
				<p class="time">
					<span>昨天</span
					><!---->
				</p>
				<ul></ul>
			</div>
		</div>
		<div class="item">
			<div class="line"></div>
			<div class="goods">
				<p class="time"><span>更早之前</span><a href="javascript:;" class="red">删除</a></p>
				<ul></ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getMyFootprint } from '@/api/member';
export default {
	name: 'FootBody',
	created() {
		getMyFootprint('', 1, 10).then(data => {
			console.log(data);
		});
	},
};
</script>

<style></style>
