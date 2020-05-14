import { isType, isTypes } from '../utils'
import createComponent from './create-component'
import setAttributes from './set-attributes'
import setComponentProps from './set-component-props'
import renderComponent from './render-component'
import diff from '../diff'
// import {renderComponent} from "../../Teacher/JS/react-dom";


const render = function (vnode, container, dom) {

	// 使用diff
	diff(dom, vnode, container)

	// const dom = _render(vnode)
	// // 如果有容器 并且 dom 是真实有效的 我们就 加入到容器中
	// if (container && dom) return container.appendChild(dom)

}

/* 根据虚拟节点去生成真实DOM */
const _render = function (vnode) {

	// 判断虚拟节点为空 我们直接返回
	if (isTypes(vnode, ['Null', 'Undefined', 'Boolean'])) return

	// 如果你是数组再次遍历
	if (isType(vnode, 'Array')) {
		/* 使用 Fragment 文档片段包裹起来 */
		const f = document.createDocumentFragment()
		vnode.map(item => f.appendChild(_render(item)))
		return f
	}

	// 如果是字符串类型 生成文本节点 如果是 number 强制转换为 string 类型
	if (isType(vnode, 'Number')) vnode = String(vnode)

	if (isType(vnode, 'String')) return document.createTextNode(vnode)

	let { tag, attrs, children } = vnode

	// 如果是组件 生成组件
	if (isType(tag, 'Function')) {
		/*
		* 1、创建组件
		* 2、设置组件属性
		* 3、组件渲染的节点返回
		* */

		const instance = createComponent(tag, attrs)

		setComponentProps(instance, attrs)

		// 如果组件内嵌套别的组件我们存放在 props 中 使用 的话 直接 this.props
		if (children) instance.props.children = children

		// 渲染组件
		renderComponent(instance)

		return instance.base
	}

	// 普通JSX 语法

	// 生成一个标签
	const ele = document.createElement(tag)

	// 设置属性
	attrs && Object.keys(attrs).forEach(key => {
		setAttributes(ele, key, attrs[key])
	})

	// 递归遍历子组件
	children && [...children].forEach(vChild => {
		render(vChild, ele)
	})

	return ele
}

export {
	render as default,
	_render
}