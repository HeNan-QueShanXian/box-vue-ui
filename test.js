// eslint-disable-next-line no-unused-vars
function createcomponent(name) {
	return (sfc) => {
		const BOX = "box-" + name
		sfc.name = BOX
		sfc.install = (Vue) => {
			Vue.component(BOX, this)
			const camelizeRe = /-(\w)/g;
			Vue.component("-" + BOX.replace(camelizeRe, function(_, c) {
				return c.toUpperCase()
			}), this)
		}
		console.log("sfc", sfc)
		return sfc
	}
}
const b = createcomponent("test")
b({})