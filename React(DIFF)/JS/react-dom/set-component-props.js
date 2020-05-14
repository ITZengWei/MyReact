import { _render } from "./render"
/*
* 设置 props 并且 在 实例上加一个 dom 属性
* */


export default function (instance, nextProps) {
	let {
		base: oldBase,
		props,
		componentWillReceiveProps,
	} = instance
	instance.prevProps = props

	instance.props = nextProps

	// 如果 有 componentWillReceiveProps 我们就执行
	if (oldBase) {
		componentWillReceiveProps && componentWillReceiveProps(instance.props)
	}
}