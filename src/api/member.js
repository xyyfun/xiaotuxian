import request from '@/utils/request';

/**
 * @Date         : 2023-03-05 21:08:27
 * @description  : 添加收藏
 * @param         {*} collectObjectIds: 集合
 * @param         {*} collectType:收藏类型，1为商品，2为专题，3为品牌
 * @return        {*}
 */
export const addCollect = (collectObjectIds, collectType) => {
	return request({
		url: '/member/collect',
		method: 'post',
		header: { 'Content-Type': 'application/json' },
		data: { collectObjectIds: [collectObjectIds], collectType },
	});
};

/**
 * @Date         : 2023-03-01 12:11:18
 * @description  : 获取我的收藏列表
 * @param         {*} page:第几页
 * @param         {*} pageSize:一页多少条数据
 * @param         {*} collectType:收藏类型，1为商品，2为专题，3为品牌
 * @return        {*}
 */
export const getMyCollection = (page = 1, pageSize = 4, collectType = 1) => {
	return request({
		url: `/member/collect?page=${page}&pageSize=${pageSize}&collectType=${collectType}`,
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-05 21:00:58
 * @description  : 取消收藏
 * @param         {*} ids:集合
 * @param         {*} type:取消收藏类型，1为商品，2为专题，3为品牌
 * @return        {*}
 */
export const cancelCollect = (ids, type) => {
	return request({
		url: '/member/collect/batch',
		method: 'delete',
		header: { 'Content-Type': 'application/json' },
		data: { ids: [ids], type },
	});
};

/**
 * @Date         : 2023-03-02 09:16:25
 * @description  : 获取足迹数据
 * @param         {*} data:地址信息
 * @param         {*} page:当前页
 * @param         {*} pageSize:一页几条数据
 * @return        {*}
 */
export const getMyFootprint = (data, page = 1, pageSize = 4) => {
	return request({
		url: `/member/browseHistory?page=${page}&pageSize=${pageSize}`,
		method: 'get',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-06 18:58:25
 * @description  : 删除足迹
 * @param         {*} ids:需要删除足迹的id集合
 * @return        {*}
 */
export const deleteFoot = ids => {
	return request({
		url: '/member/browseHistory/batch',
		method: 'delete',
		header: { 'Content-Type': 'application/json' },
		data: { ids },
	});
};

/**
 * @Date         : 2023-03-01 14:51:59
 * @description  : 添加用户地址
 * @param		   {Object} : 数据
 * @return        {*}
 */
export const addUserAddress = data => {
	return request({
		url: `/member/address`,
		method: 'post',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-01 15:55:14
 * @description  : 获取用户收件地址
 * @return        {*}
 */
export const getUserAddress = () => {
	return request({
		url: '/member/address',
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-01 16:05:32
 * @description  : 删除用户收件地址
 * @param         {*} id:地址id
 * @return        {*}
 */
export const removeUserAddress = id => {
	return request({
		url: `/member/address/${id}`,
		method: 'delete',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-01 19:33:19
 * @description  : 编辑|更新地址
 * @param         {*} data:
 * @param         {*} id:
 * @return        {*}
 */
export const updateUserAddress = (data, id) => {
	return request({
		url: `/member/address/${id}`,
		method: 'put',
		data,
	});
};

/**
 * @Date         : 2023-03-03 11:17:17
 * @description  : 获取个人信息
 * @param         {*} data:
 * @return        {*}
 */
export const getMyInfo = data => {
	return request({
		url: `/member/profile`,
		method: 'get',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-03 14:32:37
 * @description  : 修改个人数据
 * @param         {*} data:
 * @return        {*}
 */
export const setMyInfo = data => {
	return request({
		url: `/member/profile`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-04 21:33:14
 * @description  : 更新|修改|上传头像
 * @param         {*} file:图片数据
 * @return        {*}
 */
export const updatePicture = file => {
	const form = new FormData();
	form.append('file', file);
	return request({
		url: '/member/profile/avatar',
		method: 'post',
		data: form,
	});
};

/**
 * @Date         : 2023-03-08 18:38:25
 * @description  : 获取兴趣分类
 * @return        {*}
 */
export const getMyInterest = () => {
	return request({
		url: '/member/profile/interest',
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-08 18:54:35
 * @description  : 修改我的兴趣分类
 * @param         {*} data:
 * @return        {*}
 */
export const changMyInterest = data => {
	return request({
		url: '/member/profile/interest',
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-08 19:51:20
 * @description  : 获取我的尺码
 * @return        {*}
 */
export const getMySize = () => {
	return request({
		url: '/member/profile/property',
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-08 19:53:40
 * @description  : 添加我的尺码
 * @param         {*} data:
 * @return        {*}
 */
export const addMySize = data => {
	return request({
		url: '/member/profile/property',
		method: 'post',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-08 20:51:26
 * @description  : 删除我的尺码表
 * @param         {*} id:
 * @return        {*}
 */
export const removeMySize = id => {
	return request({
		url: `/member/profile/property/${id}`,
		method: 'delete',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-08 21:01:30
 * @description  : 修改尺码表
 * @param         {*} id:
 * @param         {*} data:
 * @return        {*}
 */
export const editSize = (id, data) => {
	return request({
		url: `/member/profile/property/${id}`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};
