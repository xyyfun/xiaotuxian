import request from '@/utils/request';

/**
 * @Date         : 2023-02-24 16:45:34
 * @description  : 获取商品数据列表
 * @param         {Number} id:
 * @return        {Promise}
 */
export const getGoodsDataList = id => {
	return request({
		url: `/goods?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-02-26 20:42:36
 * @description  : 热销推荐
 * @param         {*} id:商品ID
 * @param         {*} limit:数量限制
 * @param         {*} type:热销类型，1为24小时，2为周榜，3为总榜，默认为1
 * @return        {Promise}
 */
export const getHotList = (id, limit, type) => {
	return request({
		url: `/goods/hot?id=${id}&limit=${limit}&type=${type}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-02-26 20:45:47
 * @description  : 同类推荐
 * @param         {*} id:商品ID
 * @param         {*} limit:数量限制
 * @return        {*}
 */
export const getSame = (id, limit) => {
	return request({
		url: `/goods/relevant?id=${id}&limit=${limit}`,
		method: 'get',
	});
};
