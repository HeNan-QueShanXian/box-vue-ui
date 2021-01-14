import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"
let BEM = createBEM("button")
export default createNamespace("button")({
	props: {
		tag: {
			type: String,
			default: "button"
		},
		type: {
			type: String,
			default: () => "text"
		},
		size: {
			type: String,
			default: () => "large"
		}
	},
	render(h) {
		// 事件
		const listeners = {}
		if (this.$listeners) {
			Object.keys(this.$listeners).forEach(e => {
				listeners["!" + e] = this.$listeners[e]
			})
		}
		return h(this.tag, {
			class: [BEM(), BEM(this.type), BEM(this.size)],
			on: listeners
		}, this.$slots.default)
	}
});