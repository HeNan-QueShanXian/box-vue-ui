import {createNamespace} from "../utils/create"
import {createBEM} from "../utils/bem"
function parseNode(vnode) {
	let type = vnode.type;
	let _node = null;
	if (type === 3) {
		return document.createTextNode(vnode.value);
	} else if (type === 1) {
		_node = document.createElement(vnode.tag);
		let attrs = vnode.data;
		Object.keys(attrs).forEach(key => {
			_node.setAttribute(key, attrs[key]);
		});

		let childrenVNode = vnode.children
		if (childrenVNode) {
			childrenVNode.forEach(sub => {
				_node.appendChild(parseNode(sub));
			});
		}
		return _node;
	}
}
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
		}
	},
	provide() {
		return {
			boxForm: this
		};
	},
	methods: {
		isArray(obj) {
			return (typeof obj === "object" && obj.constructor === Array)
		},
		submit() {
			this.$slots.default.forEach(element => {
				element.componentInstance.getValue()
			})
		},
		validator(e) {
			console.log(e)
		},
		resetFields() {
			Object.keys(this.model).forEach(element => {
				this.model[element] = this.isArray(this.model[element]) ? [] : ""
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