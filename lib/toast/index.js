/**
 * 自定义 提示框( Toast )组件
 */
// let Toast = {};
// let showToast = false, // 存储toast显示状态
//   showLoad = false, // 存储loading显示状态
//   toastVM = null, // 存储toast vm
//   loadNode = null; // 存储loading节点元素
 
// Toast.install = function (Vue, options) {
//   // 参数
//   var opt = {
//     defaultType: 'bottom',
//     duration: '2500',
//     wordWrap: false
//   };
//   for (var property in options) {
//     opt[property] = options[property];
//   }
 
//   Vue.prototype.$toast = function (tips, type) {
 
//     var curType = type ? type : opt.defaultType;
//     var wordWrap = opt.wordWrap ? 'box-word-wrap' : '';
//     var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
//     var tmp = '<div v-show="show" :class="type" class="box-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>';
 
//     if (showToast) {
//       // 如果toast还在，则不再执行
//       return;
//     }
//     if (!toastVM) {
//       var toastTpl = Vue.extend({
//         data: function () {
//           return {
//             show: showToast,
//             tip: tips,
//             type: 'box-toast-' + curType
//           }
//         },
//         template: tmp
//       });
//       toastVM = new toastTpl()
//       var tpl = toastVM.$mount().$el;
//       document.body.appendChild(tpl);
//     }
//     toastVM.type = 'box-toast-' + curType;
//     toastVM.tip = tips;
//     toastVM.show = showToast = true;
 
//     setTimeout(function () {
//       toastVM.show = showToast = false;
//     }, opt.duration)
//   };
 
//   ['bottom', 'center', 'top'].forEach(function (type) {
//     Vue.prototype.$toast[type] = function (tips) {
//       return Vue.prototype.$toast(tips, type)
//     }
//   });
 
//   Vue.prototype.$loading = function (tips, type) {
//     if (type == 'close') {
//       loadNode.show = showLoad = false;
//     } else {
//       if (showLoad) {
//         // 如果loading还在，则不再执行
//         return;
//       }
//       var loadTpl = Vue.extend({
//         data: function () {
//           return {
//             show: showLoad
//           }
//         },
//         template: '<div v-show="show" class="box-load-mark"><div class="box-load-box"><div class="box-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="box-load-content">' + tips + '</div></div></div>'
//       });
//       loadNode = new loadTpl();
//       var tpl = loadNode.$mount().$el;
 
//       document.body.appendChild(tpl);
//       loadNode.show = showLoad = true;
//     }
//   };
 
//   ['open', 'close'].forEach(function (type) {
//     Vue.prototype.$loading[type] = function (tips) {
//       return Vue.prototype.$loading(tips, type)
//     }
//   });
// }
 
// // 向外暴露接口
// module.exports = Toast;
import Toast from "./Toast"
// Toast.install = function (app) {
//   app.use(Toast)
//   app.config.globalProperties.$toast = Toast
// }
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