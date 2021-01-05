
export const directivemMousedown = {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding, vnode, oldVnode) {
    const cName = el.className
    var Fragment = document.createDocumentFragment();
    el.className = cName
    const line = document.createElement("div")
    line.className = cName + '-line'
    const bar = document.createElement("div")
    bar.className = cName + "-bar"
    Fragment.appendChild(line)
    Fragment.appendChild(bar)
    el.appendChild(Fragment)
    function _Mousedown(e) {
      if(el.contains(e.target)) {
        if (binding.expression) {
          binding.value(e.offsetX / el.clientWidth  * 100)
          bar.style.width = e.offsetX / el.clientWidth  * 100 + '%'
        }
      }
      function _onMousemove(event) {
        console.log("mousemove")
        if (binding.expression) {
          if(event.offsetX / el.clientWidth  * 100 + '%')
          binding.value(event.offsetX / el.clientWidth  * 100)
          bar.style.width = event.offsetX / el.clientWidth  * 100 + '%'
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
    console.log("update")
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