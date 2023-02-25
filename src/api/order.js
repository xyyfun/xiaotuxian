import request from '@/utils/request';

export const getOrderList = (page, pageSize) => {
	return request({
		url: `/member/order?page=${page}&pageSize=${pageSize}`,
		method: 'get',
	});
};
