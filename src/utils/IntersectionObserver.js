export default function observe(element, callback) {
	const intersectionObserver = new IntersectionObserver((entries, observe) => {
		// 函数体在进入视野外/内触发一次
		// 如果 isIntersecting 为 true，则目标在视野内，
		if (entries[0].isIntersecting) {
			// 防止过快切换导致画面闪烁
			setTimeout(() => {
				callback(); // 调用回调函数
			}, 500);
			observe.unobserve(element); // 业务处理完成后取消监听
		}
	});
	// 监听元素
	intersectionObserver.observe(element);
}
