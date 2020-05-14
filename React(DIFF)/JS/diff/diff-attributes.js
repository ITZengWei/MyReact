/*
* 作用：为DOM对比属性然后替换
* */
import { setAttributes } from '../react-dom'
export default function (dom, attrs) {
	// 真实DOM 上属性对象
	let domAttributes = {}
	dom && [...dom.attributes].forEach(attr => {
		let { value, name } = attr
		domAttributes[name] = value
	})


	// 遍历 虚拟VDOM的key 在 domAttributes 有没有? 没有的话我们为  真实DOM 加上 改变了值
	for (let key in attrs) {
		if (!(key in domAttributes) || domAttributes[key] !== attrs[key]) {
			setAttributes(dom, key, attrs[key])
		}
	}

	// 遍历 真实DOM的key 在 attrs 有没有? 没有的话我们为 真实DOM 移除这个属性
	for (let key in domAttributes) {
		if (!(key in attrs)) {
			setAttributes(dom, key, undefined)
		}
	}
}