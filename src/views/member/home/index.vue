<template>
	<div class="member-home-page">
		<HomeOverview />
		<XtxGuess />
		<HomePanel v-for="(data, index) in result" :key="index">
			<HomeHeader :title="data.type" :route="data.route" slot="head" />
			<HomeGoods :item="data.items" slot="body" />
		</HomePanel>
	</div>
</template>

<script>
import HomeHeader from './components/home-header';
import HomeOverview from './components/home-overview';
import HomePanel from './components/home-panel';
import HomeGoods from './components/home-goods';
import XtxGuess from '@/components/library/xtx-guess';
import { getMyCollection, getMyFootprint } from '@/api/member';
export default {
	name: 'MemberHome',
	data() {
		return {
			result: [],
		};
	},
	components: { HomeHeader, HomeOverview, HomePanel, HomeGoods, XtxGuess },
	methods: {
		// 收藏
		collection() {
			getMyCollection().then(data => {
				if (data.data.code === '1') {
					data.data.result.type = '我的收藏';
					data.data.result.route = '/member/collect/goods';
					this.result.push(data.data.result);
				}
			});
		},
		// 足迹
		footprint() {
			getMyFootprint(this.$store.state.user.userAddress[0]).then(data => {
				let arr = data.data.result.items.map(item => item.spu);
				data.data.result.items = arr;
				data.data.result.type = '我的足迹';
				data.data.result.route = '/member/foot';
				this.result.push(data.data.result);
			});
		},
	},
	created() {
		this.collection();
		if (!this.$store.state.user.userAddress.length) {
			this.$store.dispatch('user/getUserAddress');
			this.footprint();
		} else {
			this.footprint();
		}
	},
};
</script>
