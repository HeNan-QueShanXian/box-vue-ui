import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"

let BEM = createBEM("input")
// console.log()
export default createNamespace("input")({
	props: {
		tag: {
			type: String,
			default: "input"
		},
		value: {
			type: [Number, String],
			default: () => ""
		},
		placeholder: {
			type: String,
			default: () => "请输入"
		},
		disabled: {
			type: Boolean,
			default: () => false
		},
	},
	render(h) {
		const listeners = {}
		if (this.$listeners) {
			Object.keys(this.$listeners).forEach(e => {
				listeners["!" + e] = this.$listeners[e]
			})
		}
		const vm = this
		let input = h(this.tag, {
			class: [BEM("inner")],
			domProps: {
				value: vm.value,
			},
			attrs: {
				placeholder: this.placeholder,
				disabled: this.disabled
			},
			on: {
				input: function (event) {
					vm.$emit("input", event.target.value)
				}
			}
		})
		return  h("div", {
			class: [BEM()]
		}, [input])
		// h("div", {
		// 	class: ["box-row"],
		// 	style: {
		// 		"padding-left": this.gutter + "px",
		// 		"padding-right": this.gutter + "px"
		// 	},
		// 	on: listeners
		// }, this.$slots.default)
	}
});