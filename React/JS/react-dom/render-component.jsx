import render, { _render } from "./render";

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

	const renderer = comp.render(comp.props)
	const base = _render(renderer)

	if (oldBase && oldBase.parentNode) {
		oldBase.parentNode.replaceChild(base, oldBase)
	}
	comp.base = base

	if (oldBase) {
		componentDidUpdate && componentDidUpdate.call(comp, prevProps, prevState)
	} else {
		componentDidMount && componentDidMount.call(comp)
	}
}