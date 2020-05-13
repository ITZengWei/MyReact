export default function (tag, attrs, ...children) {
	// 为 attr 加一个 key 属性 并且 防止 报错

	attrs = attrs || {}
	let { key = null } = attrs
	return {
		tag,
		attrs,
		children,
		key
	}
}