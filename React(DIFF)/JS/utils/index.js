let _self = null
const utils = {
	init() {
		_self = this
	},
	toStr(target) {
		return Object.prototype.toString.call(target)
	},
	// 判断是否为这种类型
	isType(target, type) {
		return _self.toStr(target) === `[object ${ type }]`
	},
	// 判断 type 是一组内的哪些
	isTypes(target, types) {
		return types.some(type => _self.isType(target, type))
	}
}

/* 初始化保存 this */
utils.init()

const { isType, isTypes } = utils

export {
	utils as default,
	isType,
	isTypes
}
