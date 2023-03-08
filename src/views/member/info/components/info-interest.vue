<template>
	<div class="member-interest-page xtx-center-interest">
		<p class="tip">建议多选几个感兴趣的分类，我们会更精准的推荐相关商品哦！</p>
		<ul class="list">
			<li v-for="(item, index) in interestData" :key="item.id">
				<div class="img" :class="{ selected: item.check }">
					<img :src="item.url" alt="" />
				</div>
				<div class="chk">
					<label
						class="xtx-checkbox"
						@click="changState(index)"
						:style="item.check ? 'color:#27ba9b' : ''">
						<i
							class="iconfont"
							:class="item.check ? 'icon-duoxuanxuanzhong' : 'icon-duoxuanweixuanzhong'">
						</i>
						<span>{{ item.name }}</span>
					</label>
				</div>
			</li>
		</ul>
		<div class="btn">
			<a href="javascript:;" class="xtx-save-btn" @click="changInterest">保存</a>
		</div>
	</div>
</template>

<script>
import { getMyInterest, changMyInterest } from '@/api/member';
export default {
	name: 'InfoInterest',
	data() {
		return {
			interestData: [],
		};
	},
	methods: {
		// 点击反馈状态
		changState(indx) {
			this.interestData[indx].check = !this.interestData[indx].check;
		},
		// 保存
		changInterest() {
			const arrInterest = [];
			this.interestData.forEach(e => {
				if (e.check) {
					arrInterest.push(e.id);
				}
			});
			changMyInterest(arrInterest).then(
				resolv => {
					this.$message({
						message: '兴趣分类修改成功！',
						type: 'success',
					});
				},
				reject => {
					this.$message({
						message: '兴趣分类修改失败，请稍后再试！',
						type: 'error',
					});
				}
			);
		},
	},
	created() {
		getMyInterest().then(data => {
			this.interestData = data.data.result;
		});
	},
};
</script>

<style lang="less" scoped>
.xtx-center-interest {
	padding-left: 170px;
	padding-bottom: 100px;
	.tip {
		color: #999;
		padding: 100px 0 40px;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		li {
			width: 164px;
			margin-right: 60px;
			padding-bottom: 30px;
			position: relative;
			.img {
				width: 164px;
				height: 164px;
				img {
					width: 100%;
					height: 100%;
					margin-top: 8px;
				}
			}
			.selected {
				border: 2px solid #27ba9b;
				border-radius: 40px;
			}
			.chk {
				text-align: center;
				padding: 20px 0;
				.xtx-checkbox {
					color: #999;
					cursor: pointer;
					user-select: none;
					margin-right: 3px;
					margin-bottom: 2px;
				}
			}
		}
	}
	.btn {
		padding-left: 160px;
		padding-top: 70px;
		.xtx-save-btn {
			width: 300px;
			line-height: 60px;
			height: 60px;
			background: #27ba9b;
			font-size: 16px;
			color: #fff;
			text-align: center;
			border-radius: 4px;
			display: inline-block;
		}
	}
}
</style>
