import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"
let BEM = createBEM("form")
export default createNamespace("form")({
	props: {
		tag: {
			type: String,
			default: "form"
		},
		model: {
			type: Object,
			default: () => {}
		},
		rules: {
			type: Object,
			default: () => []
		}
	},
	provide() {
		return {
			boxForm: this,
			rule: this.rules
		};
	},
	methods: {
		isArray(obj) {
			return (typeof obj === "object" && obj.constructor === Array)
		},
		// submit() {
		
		// },
		validator(callback) {
			// getValue
			this.$slots.default.forEach(element => {
				element.componentInstance.getValue((e) => {
					if(e) {
						return callback(true)
					} else {
						return callback(false)
					}
				})
			})
		},
		resetFields() {
			Object.keys(this.model).forEach(element => {
				this.model[element] = this.isArray(this.model[element]) ? [] : ""
			})
			this.$slots.default.forEach(element => {
				element.componentInstance.reset()
			})
			this.$emit("update:model", this.model)
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
			class: [BEM()],
			on: {
				resetFields: () => {
					console.log(11)
				}
			}
			// listeners
		}, this.$slots.default)
	}
});