import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"

let BEM = createBEM("badge")
export default createNamespace("badge")({
	props: {
		tag: {
			type: String,
			default: "div"
		},
		value: {
			type: [Number, String, Array],
			default: () => ""
		},
		type: {
			type: String,
			default: () => "text"
		}
	},
	render(h) {
		const listeners = {}
		if (this.$listeners) {
			Object.keys(this.$listeners).forEach(e => {
				listeners["!" + e] = this.$listeners[e]
			})
		}
		let valueText = null
		// console.log(this.value)
		if(this.value) {
			valueText = h("span", {
				class: [BEM("content"), BEM(this.type)]
			}, this.value)
		}
		// const vm = this
		// this.$slots
		// padding-bottom
		return  h("div", {
			class: [BEM()],
		}, [this.$slots.default, valueText])
	}
});