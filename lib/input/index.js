import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"

let BEM = createBEM("input")
export default createNamespace("input")({
	props: {
		tag: {
			type: String,
			default: "input"
		},
		value: {
			type: [Number, String, Array],
			default: () => ""
		},
		placeholder: {
			type: String,
			default: () => "请输入"
		},
		clearable: { // 清除
			type: Boolean,
			default: () => false
		},
		type: {
			type: String,
			default: () => "text" // text | password | textarea
		},
		labelPosition: { // label
			type: String,
			default: () => "left" //left | right
		},
		labelWidth: {
			type: [String, Number],
			default: () => 100
		},
		label: { // label
			type: String,
			default: () => ""
		},
		disabled: {
			type: Boolean,
			default: () => false
		},
	},
	inject: {
		boxForm: {
			default: ""
		},
		rule: {
			default: []
		},
	},
	data() {
		return {
			validator: null
		}
	},
	methods: {
		getValue() {
			if(!this.value) {
				this.validator = true
				this.boxForm.validator({code: 300, key: this.$attrs.prop})
			} else {
				this.validator = false
			}
		},
		reset() {
			this.validator = null
		}
	},
	render(h) {
		console.log(this.rule)
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
				type: this.type
			},
			attrs: {
				placeholder: this.placeholder,
				disabled: this.disabled,
				type: ["text", "password"].includes(this.type) ? this.type : "text"
			},
			on: {
				input: function (event) {
					vm.$emit("input", event.target.value)
				},
				blur: function (event) {
					console.log("blur")
					console.log(event)
				},
				focus: function (event) {
					console.log("focus")
					vm.$listeners["focus"] && vm.$listeners["focus"]()
				}
			}
		})
		// label
		let label = null
		let style = {
			width: this.labelWidth + "px",
		}
		if (this.label || this.$slots.label) {
			if(["left","right"].includes(this.labelPosition)) {
				style.textAlign = this.labelPosition
			}
			label = h("div",{
				class: [BEM("label")],
				style: style
			}, this.$slots.label ? this.$slots.label : this.label)
		}
		// clear
		// padding-bottom
		let clearable = null
		clearable = h("span", {
			ref: "mySuffix",
			class: [BEM("suffix")],
			on: {
				click: () => {
					vm.$emit("input", "")
				}
			}
		}, "清除")
		let errorHtml = h("div", {
			class: [BEM("error")],
			style: {
				paddingLeft: style.width
			}
		}, "错误")
		return  h("div", {
			class: [BEM(), this.labelPosition ? BEM(this.labelPosition) : null],
			style: {
				paddingBottom: !this.validator ? "22px" : "5px"
			}
		}, [
			label,
			input,
			this.clearable && this.value ? clearable : null,
			this.validator ? errorHtml : null
		])
	}
});