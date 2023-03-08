<template>
	<div class="xtx_body_main">
		<div class="xtx-tab">
			<div class="xtx-tab-head">
				<a
					:class="{ active: index + 1 === now }"
					v-for="(item, index) in head"
					:key="index"
					@click="changInfo(index + 1)"
					>{{ item }}</a
				>
			</div>
			<div class="xtx-tab-body">
				<transition name="info">
					<InfoPage v-if="now === 1" />
					<InfoInterest v-else-if="now === 2" />
					<InfoSize v-else />
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import InfoPage from './components/info-page';
import InfoInterest from './components/info-interest';
import InfoSize from './components/info-size';
export default {
	name: 'MemberInfo',
	data() {
		return {
			now: 1,
			head: ['基本信息', '兴趣分类', '我的尺码'],
		};
	},
	methods: {
		changInfo(index) {
			this.now = index;
		},
	},
	components: { InfoPage, InfoInterest, InfoSize },
};
</script>

<style lang="less" scoped>
.xtx_body_main {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
	.xtx-tab .xtx-tab-head {
		height: 60px;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		> a {
			width: 107px;
			height: 100%;
			border-right: 1px solid #f5f5f5;
			float: left;
			line-height: 59px;
			text-align: center;
			font-size: 16px;
			border-top: 2px solid transparent;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
		.active {
			color: #27ba9b;
			border-top-color: #27ba9b;
			background: #fff;
			height: 60px;
		}
	}
}
/* 进入的起点,离开的终点 */
.info-enter,
.info-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.info-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.info-enter-to,
.info-leave {
	transform: none;
	opacity: 1;
}
</style>
