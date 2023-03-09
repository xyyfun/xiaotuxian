<template>
	<div class="member-collect-special-page">
		<XtxCenterHead title="收藏的专题" />
		<div class="xtx-collect-special">
			<ul>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">太花间到理</p>
						<p class="desc">去许最里</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">不油管速除省</p>
						<p class="desc">根何引口须</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">产支后圆需做济</p>
						<p class="desc">体见般里体</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">又多受</p>
						<p class="desc">际验意查书</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">比一写经</p>
						<p class="desc">中新市天值或白</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">受话技把小者</p>
						<p class="desc">外研省片任</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">才强完阶心如维</p>
						<p class="desc">代酸千里住书</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">南半再而象</p>
						<p class="desc">决带却论</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">打四来日政特知</p>
						<p class="desc">极重身权</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">具精转千按</p>
						<p class="desc">计周称众</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">派点完务改</p>
						<p class="desc">京段至称方</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
				<li>
					<a href="javascript:;"
						><img
							src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/index-new-pd01.png"
							alt="" />
						<p class="name">单况收决来</p>
						<p class="desc">每安时两议水质</p>
						<i class="iconfont icon-guanbi"></i
					></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import XtxCenterHead from '@/components/library/xtx-center-head';
import { getMyCollection } from '@/api/member';
export default {
	name: 'CollectSpecial',
	components: { XtxCenterHead },
	created() {
		getMyCollection(1, 10, 2).then(data => {
			console.log(data);
		});
	},
};
</script>

<style lang="less" scoped>
.member-collect-special-page {
	min-height: 100%;
	background-color: #fff;
	.xtx-collect-special {
		position: relative;
		padding: 20px 25px;
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 294px;
				height: 210px;
				margin-right: 20px;
				margin-bottom: 20px;
				position: relative;
				box-shadow: 0 0 2px #e4e4e4;
				transition: all 0.5s;
				img {
					width: 294px;
					height: 140px;
				}
				p {
					padding: 0 10px;
				}
				.desc {
					color: #999;
					padding-top: 6px;
				}
				.name {
					font-size: 16px;
					padding-top: 12px;
				}
				i {
					position: absolute;
					right: 0;
					top: 0;
					width: 20px;
					height: 20px;
					background: #e4e4e4;
					color: #fff;
					line-height: 18px;
					display: none;
					text-align: center;
				}
				&:hover {
					transform: translate3d(0, -3px, 0);
					box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
				}
				&:hover i {
					opacity: 1;
					transition: all 0.5s;
				}
			}
		}
	}
}
</style>
