import {createNamespace} from "../utils/create"
export default createNamespace("row")({
	props: {
		tag: {
			type: String,
			default: "div"
		},
		gutter: {
			type: [Number, String],
			default: () => 10
		}
	},
	render(h) {
		const listeners = {}
		if (this.$listeners) {
			Object.keys(this.$listeners).forEach(e => {
				listeners["!" + e] = this.$listeners[e]
			})
		}
		return h("div", {
			class: ["box-row"],
			style: {
				"padding-left": this.gutter + "px",
				"padding-right": this.gutter + "px"
			},
			on: listeners
		}, this.$slots.default)
	}
});