<template>
	<div class="member-size-page xtx-center-size" style="position: relative; min-height: 400px">
		<div class="tip">
			<p>最多可创建10个角色</p>
			<a href="javascript:;" @click="newSize">+ 新建尺码</a>
		</div>

		<!-- 主数据源 -->
		<template v-if="result.length">
			<div class="item-size" v-for="(item, index) in result" :key="item.id">
				<div class="head">
					<span class="name">{{ item.name }}</span
					><span class="def" v-if="!item.isDefault">默认尺码</span>
					<div class="btn">
						<a href="javascript:;" @click="sendData(item.id, index)">编辑</a
						><a href="javascript:;" class="red" @click="removeSize(item.id, index)">删除</a>
					</div>
				</div>
				<div class="body">
					<span>性别 {{ item.gender }}</span
					><span>身高(cm) {{ item.height }}</span
					><span>体重(kg) {{ item.bodyWeight }}</span
					><span>肩宽(cm) {{ item.shoulderWidth }}</span
					><span>胸围(cm) {{ item.chestCircumference }}</span
					><span>腰围(cm) {{ item.waistCircumference }}</span
					><span>臀围(cm) {{ item.hips }}</span
					><span>脚长(cm) {{ item.footSize }}</span
					><span>脚围(cm) {{ item.footCircumference }}</span>
				</div>
			</div>
		</template>

		<!-- 未添加时 -->
		<div v-else class="xtx-center-none">
			<img src="../../../../assets/images/none.png" alt="" />
			<p>当前还未添加尺码</p>
		</div>

		<!-- 窗口对话框 -->
		<transition>
			<XtxDialog :title="title" width="940px" v-show="isShow">
				<template slot="body">
					<div class="xtx-center-size-new">
						<div class="pic">
							<img
								src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/center-size.png"
								alt="" />
						</div>
						<div class="form">
							<div class="form-item">
								<span class="label">姓名：</span
								><input type="text" v-model="size.name" placeholder="收货人姓名" />
							</div>
							<div class="form-item">
								<span class="label">性别：</span>
								<div class="xtx-select" style="width: 300px" @click="isShowGender = !isShowGender">
									<div class="curr">
										<div class="ph" v-if="size.gender" style="color: #000">
											{{ size.gender }}
										</div>
										<div class="ph" v-else>请选择</div>
										<span class="iconfont icon-arrow-down"></span>
									</div>
									<div class="list" v-show="isShowGender">
										<div
											class="option"
											v-for="(item, index) in gender"
											:key="index"
											@click="changGender(item)">
											{{ item }}
										</div>
									</div>
								</div>
							</div>
							<div class="form-item2">
								<span class="label">身高(cm)</span><input v-model="size.height" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">体重(kg)</span><input v-model="size.bodyWeight" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">肩宽(cm)</span
								><input v-model="size.shoulderWidth" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">胸围(cm)</span
								><input v-model="size.chestCircumference" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">腰围(cm)</span
								><input v-model="size.waistCircumference" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">臀围(cm)</span><input v-model="size.hips" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">脚长(cm)</span><input v-model="size.footSize" type="text" />
							</div>
							<div class="form-item2">
								<span class="label">脚围(cm)</span
								><input v-model="size.footCircumference" type="text" />
							</div>
							<div class="form-item start">
								<label
									class="xtx-checkbox"
									@click="size.isDefault ? (size.isDefault = 0) : (size.isDefault = 1)"
									:style="size.isDefault ? '' : 'color:#27ba9b'">
									<i
										class="iconfont"
										:class="
											size.isDefault ? 'icon-duoxuanweixuanzhong' : 'icon-duoxuanxuanzhong'
										"></i>
									<span>设为默认</span></label
								>
							</div>
							<div class="form-item">
								<button class="xtx-button gray" @click="end">取消</button
								><button class="xtx-button pirmary" v-if="title === '新建尺寸'" @click="commitSize">
									提交
								</button>
								<button class="xtx-button pirmary" v-else @click="saveSize">保存</button>
							</div>
						</div>
					</div>
				</template>
			</XtxDialog>
		</transition>
	</div>
</template>

<script>
import XtxDialog from '@/components/library/xtx-dialog';
import { getMySize, addMySize, removeMySize, editSize } from '@/api/member';
export default {
	name: 'InfoSize',
	data() {
		return {
			result: [],
			title: '',
			isShow: false,
			isShowGender: false,
			gender: ['男', '女', '未知'],
			id: '',
			size: {
				height: '', // 身高
				bodyWeight: '', // 体重
				shoulderWidth: '', // 肩宽
				chestCircumference: '', // 胸围
				waistCircumference: '', // 腰围
				hips: '', // 臀围
				footSize: '', // 脚长
				footCircumference: '', // 脚围
				name: '', // 名称
				gender: '', // 性别
				isDefault: 1, // 是否默认 0 是 1 否
			},
		};
	},
	components: { XtxDialog },
	methods: {
		// 获取尺码列表
		getSize() {
			getMySize().then(result => {
				this.result = result.data.result;
			});
		},
		// 新建按钮
		newSize() {
			this.title = '新建尺寸';
			this.isShow = true;
		},
		// 性别
		changGender(val) {
			this.size.gender = val;
		},
		// 添加（提交）
		commitSize() {
			let num = 0;
			Object.values(this.size).forEach(item => {
				if (item !== '') {
					num++;
				}
			});
			if (num < 11) {
				this.$message({
					message: '请填写完整信息！',
					type: 'warning',
				});
			} else {
				addMySize(this.size).then(
					resolv => {
						this.getSize();
						this.$message({
							message: '添加成功！',
							type: 'success',
						});
						this.end();
					},
					reject => {
						this.$message({
							message: '添加失败，请检查输入类型或请稍后再试！',
							type: 'error',
						});
						this.end();
					}
				);
			}
		},
		// 删除
		removeSize(id, indx) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					removeMySize(id).then(resolv => {
						this.result.splice(indx, 1);
						this.$message({
							message: '删除成功！',
							type: 'success',
						});
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 编辑
		sendData(id, index) {
			this.id = id;
			this.title = '编辑尺寸';
			const data = this.result[index];
			this.size.height = data.height;
			this.size.bodyWeight = data.bodyWeight;
			this.size.shoulderWidth = data.shoulderWidth;
			this.size.chestCircumference = data.chestCircumference;
			this.size.waistCircumference = data.waistCircumference;
			this.size.hips = data.hips;
			this.size.footSize = data.footSize;
			this.size.footCircumference = data.footCircumference;
			this.size.name = data.name;
			this.size.gender = data.gender;
			this.size.isDefault = data.isDefault;
			this.isShow = true;
		},
		// 保存编辑
		saveSize() {
			editSize(this.id, this.size).then(
				resolv => {
					this.getSize();
					this.$message({
						message: '保存成功！',
						type: 'success',
					});
					this.end();
				},
				reject => {
					this.$message({
						message: '保存失败，请稍后再试！',
						type: 'error',
					});
					this.end();
				}
			);
		},
		// 清空数据关闭对话框
		end() {
			this.isShow = false;
			// 清空原数据
			this.size = {
				height: '',
				bodyWeight: '',
				shoulderWidth: '',
				chestCircumference: '',
				waistCircumference: '',
				hips: '',
				footSize: '',
				footCircumference: '',
				name: '',
				gender: '',
				isDefault: 1,
			};
		},
	},
	created() {
		this.getSize();
	},
};
</script>

<style lang="less" scoped>
.xtx-center-size {
	position: relative;
	min-height: 400px;
	padding: 40px;
	.tip {
		height: 50px;
		background: #f5f5f5;
		line-height: 50px;
		padding: 0 20px;
		color: #999;
		display: flex;
		> p {
			flex: 1;
		}
		> a {
			color: #27ba9b;
			width: 100px;
			text-align: right;
		}
	}
	.item-size {
		margin-top: 40px;
		padding: 20px;
		border: 1px solid #f5f5f5;
		.head {
			height: 40px;
			display: flex;
			line-height: 40px;
			span {
				width: 100px;
				text-align: center;
			}
			.name {
				background: #f5f5f5;
			}
			.def {
				color: #ffb302;
			}
			.btn {
				flex: 1;
				text-align: right;
				> a {
					color: #27ba9b;
					padding-left: 20px;
				}
				.red {
					color: #cf4444 !important;
				}
			}
		}
		.body {
			width: 690px;
			display: flex;
			flex-wrap: wrap;
			margin-top: 10px;
			color: #999;
			span {
				width: 230px;
				line-height: 40px;
			}
		}
		&:hover {
			border-color: #27ba9b;
			border-style: dashed;
		}
	}
	.xtx-center-none {
		padding: 150px 0;
		text-align: center;
		img {
			width: 200px;
		}
		p {
			font-size: 20px;
			padding: 20px;
			color: #ccc;
		}
	}
}
</style>
