// 横
export const directivemMousedown = {
	// eslint-disable-next-line no-unused-vars
	bind(el, binding, vnode, oldVnode) {
		const cName = el.className
		var Fragment = document.createDocumentFragment();
		el.className = cName
		const line = document.createElement("div")
		line.className = cName + "-line"
		const bar = document.createElement("div")
		bar.className = cName + "-bar"
		Fragment.appendChild(line)
		Fragment.appendChild(bar)
		el.appendChild(Fragment)
		function _Mousedown(e) {
			if(el.contains(e.target)) {
				if (vnode.context.changeProgress) {
					vnode.context.changeProgress({key: "pause" , value: e.offsetX / el.clientWidth  * 100})
					bar.style.width = e.offsetX / el.clientWidth  * 100 + "%"
				}
			}
			function _onMousemove(event) {
				if (vnode.context.changeProgress) {
					if (event.offsetX / el.clientWidth  * 100) {
						vnode.context.changeProgress({key: "pause" , value: event.offsetX / el.clientWidth  * 100})
						bar.style.width = event.offsetX / el.clientWidth  * 100 + "%"
					}
				}
			}
			function _onMouseup() {
				vnode.context.changeProgress({key: "play"})
				document.removeEventListener("mousemove", _onMousemove)
				document.removeEventListener("mouseup", _onMouseup)
			}
			document.addEventListener("mousemove", _onMousemove)
			document.addEventListener("mouseup", _onMouseup)
		}
		el._Mousedown = _Mousedown
		el.addEventListener("mousedown", _Mousedown)
	},
	// eslint-disable-next-line no-unused-vars
	update(el, binding, vnode, oldVnode) {
		const buffered = el.getAttribute("data-buffered")
		const progress = el.getAttribute("data-progress")
		if (buffered) {
			el.firstElementChild.style.width = Number(buffered) + "%"
		}
		if(progress) {
			el.lastElementChild.style.width = Number(progress) + "%"
		}
	},
	// eslint-disable-next-line no-unused-vars
	componentUpdate(el, binding, vnode, oldVnode) {
		console.log("componentUpdate")
	},
	unbind(el) {
		el.removeEventListener("mousedown", el._Mousedown)
		delete el._Mousedown
	}
	// inserted: function (el) {}
}
// 竖
export const directivemVerticalMousedown = {
	// eslint-disable-next-line no-unused-vars
	bind(el, binding, vnode, oldVnode) {
		const cName = el.className
		var Fragment = document.createDocumentFragment();
		el.className = cName
		const line = document.createElement("div")
		line.className = cName + "-line"
		const bar = document.createElement("div")
		bar.className = cName + "-bar"
		Fragment.appendChild(line)
		Fragment.appendChild(bar)
		el.appendChild(Fragment)
		function _Mousedown(e) {
			if(el.contains(e.target)) {
				if (binding.expression) {
					bar.style.height = e.offsetY / el.clientHeight  * 100 + "%"
					binding.value({key: "" , value: e.offsetY / el.clientHeight})
				}
			}
			function _onMousemove(event) {
				if (binding.expression) {
					if(event.offsetY / el.clientHeight >1) return
					if(event.offsetY / el.clientHeight < 0) return
					bar.style.height = event.offsetY / el.clientHeight  * 100 + "%"
					binding.value({key: "" , value: event.offsetY / el.clientHeight})
				}
			}
			function _onMouseup() {
				document.removeEventListener("mousemove", _onMousemove)
				document.removeEventListener("mouseup", _onMouseup)
			}
			document.addEventListener("mousemove", _onMousemove)
			document.addEventListener("mouseup", _onMouseup)
		}
		el._Mousedown = _Mousedown
		el.addEventListener("mousedown", _Mousedown)
	},
	// eslint-disable-next-line no-unused-vars
	update(el, binding, vnode, oldVnode) {
		const volume = el.getAttribute("data-volume")
		if(volume) {
			el.lastElementChild.style.height = Number(volume) + "%"
		}
	},
	// eslint-disable-next-line no-unused-vars
	componentUpdate(el, binding, vnode, oldVnode) {
		console.log("componentUpdate")
	},
	unbind(el) {
		el.removeEventListener("mousedown", el._Mousedown)
		delete el._Mousedown
	}
}
export const Formvalidator = {
	bind(el, binding, vnode, oldVnode) {
		if(el.contains(el.target)) {
			console.log(el)
		}
	},
	update(el, binding, vnode, oldVnode) {
		console.log(el)
	},
	componentUpdate(el, binding, vnode, oldVnode) {
		console.log(el)
	},
	unbind() {}
}