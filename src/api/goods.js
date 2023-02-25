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
