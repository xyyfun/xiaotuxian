import request from '@/utils/request';

export const login = data => {
	return request({
		url: '/login',
		method: 'post',
		data,
		header: { 'Content-Type': 'application/json' },
	});
};
