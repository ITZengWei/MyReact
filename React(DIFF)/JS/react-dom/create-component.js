import { Component } from '../react'

/*
	1、函数组件
	2、类组件
* */
export default function (Comp, props) {
	// 最终实例
	let instance

	/* 判断是否属于类组件还是函数组件 */
	// 查看是否有 prototype 并且原型上有 render 方法 就是 类组件
	if (Comp.prototype && Comp.prototype.render) {
		instance = new Comp(props)
	// 现在就是函数组件 我们需要 让它具备 render
	} else {
		instance = new Component(props)
		// 让创建的实例的构造器 指向 函数组件
		instance.constructor = Comp

		// 执行 render 只需要返回 函数组件的结果
		instance.render = function () {
			// 返回结果
			return instance.constructor(props)
		}
	}
	return instance
}