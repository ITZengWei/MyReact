/*
* 判断是否为改变了组件
* */
import { createComponent, setComponentProps, renderComponent } from '../react-dom'

export default function (dom, vnode) {
	let comp = dom
	let { tag, attrs, children } = vnode

	// 如果有 dom 并且它的 constructor 和 tag 是一样的函数，代表没有改变组件
	if (comp && comp.constructor === tag) {
		/* 重新改变 props 就好 */
		setComponentProps(comp, attrs)

	// 组件已经改变 Home ===> About
	} else {
		// 如果之前有 我们就要销毁
		if (comp) {
			UnMountComponent(dom)
			dom = null
		}
		/*
	* 1、创建新组件
	* 2、设置组件属性
	* 3、给当前dom挂载
	* */

		// 我们需要创建一个新的组件
		comp = createComponent(tag, attrs)
		setComponentProps(comp, attrs)
	}

	// // 如果组件内嵌套别的组件我们存放在 props 中 使用 的话 直接 this.props
	if (children) {
		comp.props.children = children
	}

	// 开始渲染组件，就会挂载一个 base  属性 也就是 真实dom 对象
	renderComponent(comp)

	/* 如果有内嵌我们 将它转换为 真实DOM 放到 props 中 */
	// if (children) {
	// 	comp.props.children = diffNode(null, children)
	// }

	/* TODO 为 base 指向 constructor diff 对比 */
	comp.base.constructor = comp.constructor

	return comp.base
}

function UnMountComponent(comp) {
	comp.parentNode && comp.parentNode.removeChild(comp)
}