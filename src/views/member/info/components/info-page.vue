<template>
	<div class="member-info-page xtx-center-info">
		<div class="item-avatar">
			<div class="avatar">
				<img :src="result.avatar" alt="" />
			</div>
			<div class="file">
				点击上传头像
				<input type="file" @change="modify" ref="fileInput" />
			</div>
		</div>
		<div class="item-name">
			<div class="label">昵称：</div>
			<div class="content">
				<input type="text" v-model="result.nickname" placeholder="请输入用户名" />
			</div>
		</div>
		<div class="item-sex">
			<div class="label">性别：</div>
			<div class="content">
				<label for="item-sex-01"
					><input
						value="男"
						v-model="result.gender"
						name="item-sex"
						type="radio"
						id="item-sex-01"
						checked="checked" /><span>男</span></label
				><label for="item-sex-02"
					><input
						value="女"
						v-model="result.gender"
						name="item-sex"
						type="radio"
						id="item-sex-02" />
					<span>女</span></label
				><label for="item-sex-03"
					><input
						value="未知"
						v-model="result.gender"
						name="item-sex"
						type="radio"
						id="item-sex-03" />
					<span>未知</span></label
				>
			</div>
		</div>
		<div class="item-birthday">
			<div class="label">出生日期：</div>
			<div class="content">
				<div class="time">
					<div class="date">
						<el-date-picker
							value-format="yyyy-MM-dd"
							v-model="result.birthday"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</div>
				</div>
			</div>
		</div>
		<div class="item-city">
			<div class="label">城市：</div>
			<div class="content">
				<div class="xtx-city">
					<div class="curr-wrapper">
						<span v-if="result.fullLocation">{{ result.fullLocation }}</span>
						<span v-else class="ph">请选择所在城市</span
						><i @click="isShowCity = !isShowCity" class="iconfont icon-moreunfold"></i>
					</div>
					<XtxNationalAddress v-if="isShowCity" />
				</div>
			</div>
		</div>
		<div class="item-job">
			<div class="label">职业：</div>
			<div class="content">
				<div class="xtx-select" style="width: 300px">
					<div class="curr">
						<div v-if="result.profession" class="ok ellipsis" style="width: 280px">
							{{ result.profession }}
						</div>
						<div v-else class="ph">请选择</div>
						<span
							class="iconfont icon-moreunfold"
							@click="isShowOccupation = !isShowOccupation"></span>
					</div>
					<div class="list" v-if="isShowOccupation">
						<div
							class="item"
							v-for="(item, index) in occupation"
							:key="index"
							@click="selection(item)">
							{{ item }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="item-btn">
			<div class="label"></div>
			<div class="content">
				<a href="javascript:;" class="xtx-save-btn" @click="setInfo">保存</a>
			</div>
		</div>
	</div>
</template>

<script>
import XtxNationalAddress from '@/components/library/xtx-national-address';
import { getMyInfo, setMyInfo, updatePicture } from '@/api/member';
import { setUserInfo, setToken } from '@/utils/userInfo';
export default {
	name: 'InfoPage',
	data() {
		return {
			isShowCity: false,
			isShowOccupation: false,
			occupation: [
				'国家机关、党群组织、企业、事业单位负责人',
				'专业技术人员',
				'办事人员和有关人员',
				'商业、服务业人员',
				'农、林、牧、渔、水利业生产人员',
				'生产、运输设备操作人员及有关人员',
				'军人',
				'不便分类的其他从业人员',
			],
			result: {},
		};
	},
	components: { XtxNationalAddress },
	methods: {
		// 更新用户数据
		updateUserInfo(data) {
			// 持久化用户信息
			setUserInfo(JSON.stringify(data));
			// 将用户信息存储vux
			this.$store.commit('user/setUserInfo', data);
		},
		// 设置职业
		selection(val) {
			this.result.profession = val;
			this.isShowOccupation = false;
		},
		// 保存
		setInfo() {
			setMyInfo(this.result).then(
				data => {
					this.$message({
						message: '个人信息修改成功！',
						type: 'success',
					});
					this.updateUserInfo(data.data.result);
				},
				reject => {
					this.$message({
						message: '个人信息修改失败，请稍后再试！',
						type: 'error',
					});
				}
			);
		},
		// 设置头像
		modify(ev) {
			const file = ev.target.files[0];
			updatePicture(file).then(
				data => {
					this.$message({
						message: '头像修改成功！',
						type: 'success',
					});
					this.getUserInfo();
				},
				reject => {
					this.$message({
						message: reject.message,
						type: 'error',
					});
				}
			);
		},
		// 获取用户数据
		getUserInfo() {
			getMyInfo(this.$store.state.user.userInfo).then(data => {
				this.result = data.data.result;
				this.updateUserInfo(data.data.result);
			});
		},
	},
	created() {
		this.getUserInfo();
	},
	mounted() {
		// 接收城市信息及代码
		this.$bus.$on('city', (cityAddress, provinceCode, cityCode, countyCode) => {
			this.result.fullLocation = cityAddress;
			this.result.provinceCode = provinceCode;
			this.result.cityCode = cityCode;
			this.result.countyCode = countyCode;
			this.isShowCity = false;
		});
	},
	beforeDestroy() {
		this.$bus.$off('city');
	},
};
</script>

<style lang="less" scoped>
.xtx-center-info [class^='item-'] {
	display: flex;
	padding-bottom: 20px;
	.label {
		width: 340px;
		padding-right: 20px;
		text-align: right;
		font-size: 16px;
		color: #999;
		line-height: 50px;
	}
	.content {
		width: 300px;
		height: 50px;
		line-height: 50px;
	}
}
.xtx-center-info {
	.item-avatar {
		padding: 90px 0;
		display: block;
		.avatar {
			width: 106px;
			height: 106px;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 auto;
			position: relative;
		}
		.file {
			position: relative;
			top: 20px;
			left: 50%;
			transform: translateX(-50%);
			width: 100px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: #27ba9b;
			color: #fff;
			border-radius: 4px;
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: red;
				opacity: 0;
			}
		}
	}
	.item-name input {
		border: 1px solid #e4e4e4;
		width: 100%;
		height: 100%;
		padding: 0 10px;
	}
	.item-sex label {
		margin-right: 20px;
		position: relative;
		> span {
			padding-left: 5px;
		}
	}
	.item-birthday .content .time {
		width: 300px;
		height: 50px;
		border: 1px solid #e4e4e4;
		.el-date-editor.el-input {
			width: 298px;
		}
	}
	.xtx-select {
		width: 300px;
		height: 50px;
		position: relative;
		display: inline-block;
		border: 1px solid #e4e4e4;
		&:first-child {
			margin-left: 0;
		}
		.curr {
			.ph {
				color: #ccc;
				padding-left: 10px;
			}
			.ok {
				padding-left: 10px;
			}
			.iconfont {
				position: absolute;
				top: 0;
				right: 10px;
				transition: all 0.5s;
				cursor: pointer;
			}
		}
		.list {
			position: absolute;
			left: -1px;
			top: 50px;
			border: 1px solid #e4e4e4;
			border-top: none;
			width: 301px;
			max-height: 200px;
			overflow-y: auto;
			background: #fff;
			z-index: 100;
			&::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
				height: 1px;
			}
			&::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				// box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
				background: #b5b5b5;
			}
			&::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				border-radius: 10px;
				background: #f5f5f5;
			}
			.item {
				line-height: 40px;
				height: 40px;
				width: 100%;
				overflow: hidden;
				padding-left: 10px;
				cursor: pointer;
				color: #666;
			}
		}
	}
	.item-city .xtx-city {
		min-width: 150px;
		width: 300px;
		height: 50px;
		display: inline-block;
		position: relative;
		vertical-align: middle;
		.curr-wrapper {
			width: 100%;
			line-height: 48px;
			height: 100%;
			border: 1px solid #e4e4e4;
			padding: 0 10px;
			display: flex;
			justify-content: space-between;
			position: relative;
			z-index: 10;
			overflow: hidden;
			.ph {
				color: #ccc;
			}
			i {
				cursor: pointer;
			}
		}
	}
	.item-btn {
		padding: 60px 0;
		.xtx-save-btn {
			font-size: 16px;
			color: #fff;
			text-align: center;
			border-radius: 4px;
			display: inline-block;
			width: 300px;
			line-height: 60px;
			height: 60px;
			background: #27ba9b;
		}
	}
}
</style>
