import render, { _render } from "./render";
import diff, { diffNode, diffChild } from '../diff'
import {isType} from "../utils";

export default function (comp) {

	let {
		base: oldBase,
		prevState,
		prevProps,
		props,
		state,
		shouldComponentUpdate,
		componentWillUpdate,
		componentDidUpdate,
		componentWillMount,
		componentDidMount,

	} = comp

	// 如果之前没有组件 代表 第一次渲染
	if (!oldBase) {
		componentWillMount && componentWillMount.call(comp)
	} else {
		if (shouldComponentUpdate) {
			// 如果 返回 false 我们 就直接退出
			if (!shouldComponentUpdate(props, state)) return
		}

		componentWillUpdate && componentWillUpdate()
	}


	const renderer = comp.render ? comp.render() : comp.initClass.render()

	// const renderer = comp.render()
	// const base = _render(renderer)

	const base = diffNode(oldBase, renderer)
	// console.dir(base, '结果')
	// /* TODO 为 base 指向 constructor diff 对比 */
	// base.constructor = comp.constructor
	// 初始化的时候 类
	// console.log(base.initClass)
	base.initClass = comp.render ? comp : comp.initClass


	/* 开始渲染子组件 */
	// if (props.children) {
	// 	console.log(props.children)
	// 	diffChild(base, props.children)
	// }


	// if (oldBase && oldBase.parentNode) {
	// 	oldBase.parentNode.replaceChild(base, oldBase)
	// }

	comp.base = base

	if (oldBase) {
		componentDidUpdate && componentDidUpdate.call(comp, prevProps, prevState)
	} else {
		componentDidMount && componentDidMount.call(comp)
	}
}