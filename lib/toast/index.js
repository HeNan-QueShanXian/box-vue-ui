
import Main from "./Toast"
import Vue from "vue";
var queue = [];
function createInstance(text) {
	if(Vue.prototype.$isServer) {
		return {}
	}
	queue = queue.filter(item => {
		return !item.$el.parentNode || isInDocument(item.$el);
	})
	if(!queue.length) {
		var toast = new (Vue.extend(Main))({
			el: document.createElement("div"),
			data() {
				return {
					message: "123456",
				}
			}
		});
		queue.push(toast)
	}
	return queue[queue.length - 1]
}
function isInDocument(element) {
	return document.body.contains(element);
}
function Toast (options) {
	if (options === void 0) {
		options = {}
	}
	var toast = createInstance("123456")
	toast.$mount()
	document.body.appendChild(toast.$el)
	toast.timer = setTimeout(() => {
		toast.close()
	}, 2500)
	return toast;
}
Toast.clear = function (all) {
	if (queue.length) {
		if (all) {
			queue.forEach(function (toast) {
				toast.close();
			});
			queue = [];
		} else {
			queue.shift().clear();
		}
	}
};
// const ToastConstructor = Vue.extend(Main)
// function ShowToast(text, duration = 2000) {
//   if (Vue.prototype.$isServer) return;
// 	const Toast = new ToastConstructor({
// 		el: document.createElement("div"),
// 		data() {
// 			return {
// 				message: text
// 			}
// 		}
//   })
//   document.body.appendChild(Toast.$el)
//   Vue.prototype.$toast = Toast;
// }
// // Toast.install = function (app) {
// //   app.use(Toast)
// //   app.config.globalProperties.$toast = Toast
// // }
// let instance;
// const Toast = {}
// Toast.install  = function (app) {
// 	if (Vue.prototype.$isServer) return;
// 	instance = new ToastConstructor({
// 		data: {
// 			message: "123456798"
// 		}
// 	})
// 	instance.$mount()
// 	document.body.appendChild(instance.$el)
// 	app.prototype.$toast = instance;
// 	// app.config.globalProperties.$toast = instance
// }
Toast.install = function () {
	Vue.use(Main);
};
Vue.prototype.$toast = Toast;
export default Toast
// import {createNamespace} from "../utils/create"
// export default createNamespace("toast")({
// 	props: {
// 		tag: {
// 			type: String,
// 			default: "div"
// 		},
// 		defaultType: {
//       type: String,
//       default: "center"
//     },
//     duration: {
//       type: Number,
//       default: 2500
//     },
//     message: {
//       type: String,
//       default: '提示'
//     }
// 	},
// 	render(h) {
// 		const listeners = {}
// 		if (this.$listeners) {
// 			Object.keys(this.$listeners).forEach(e => {
// 				listeners["!" + e] = this.$listeners[e]
// 			})
// 		}
// 		return h("div", {
// 			class: ["box-row"],
// 			style: {
// 				"padding-left": this.gutter + "px",
// 				"padding-right": this.gutter + "px"
// 			},
// 			on: listeners
// 		}, this.$slots.default)
// 	}
// });