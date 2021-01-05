import ee from "event-emitter"
import EVENTS from "./constants/EVENTS"
import * as types from "./helper/type"
import { addClass, removeClass, registerFullScreenChangeListener } from "./helper/dom"
// import eventBus from './helper/eve'
// import { getVideoCore } from './core'
const _ee = ee()

const mixins = {
	data() {
		return {
			show: false,
			fullscreen: false,
			isPlaying: false,
			_coreID: "",
			element: ""
		}
	},
	created() {
		this.on(EVENTS.LIFECYCLE_INITING, ($player) => {
			this.$player = $player
			// console.log()
			this.$container = this.$player.$el
		})
		this.on(EVENTS.PLAY, () => {
			this.isPlaying = true
		})
		this.on(EVENTS.PAUSE, () => {
			this.isPlaying = false
		})
		registerFullScreenChangeListener((isFullScreen) => {
			if (isFullScreen) {
				addClass(this.$container, "fullscreen")
				this.emit("fullscreen", true)
			} else {
				removeClass(this.$container, "fullscreen")
				this.emit("fullscreen", false)
			}
		})
	},
	_events: {},
	methods: {
		play() {
			this.$player.play()
		},
		pause() {
			this.$player.pause()
		},
		load() {
			this.$player.load()
			this.play()
		},
		loadSize() {
			let el = document.getElementsByClassName("vcp-container")[0].parentNode
			return {
				clientHeight: el.clientHeight,
				clientWidth: el.clientWidth,
				innerHeight: document.innerHeight,
				innerWidth: document.innerWidth
			}
		},
		enterFullscreen() {
			this.element = this.$player.$el.parentElement
			const el = document.getElementsByClassName("vcp-container")[0]
			el.style.position = "fixed"
			el.style.top = "0px"
			el.style.left = "0px"
			el.style.right = "0px"
			el.style.bottom = "0px"
			el.style.zIndex = 2300
			document.body.appendChild(el)
			this.fullscreen = true
		},
		cancelFullscreen(isManual) {
			// this.element = this.$player.$el.parentElement
			// if (isManual) {
			//   this.emit('fullscreen', false)
			//   removeClass(el, 'fullscreen')
			//   this.fullscreen = false
			//   return
			// }
			// if (document.mozCancelFullScreen) {
			// 	document.mozCancelFullScreen()
			// } else if (document.webkitCancelFullScreen) {
			// 	document.webkitCancelFullScreen()
			// } else if (document.cancelFullScreen) {
			// 	document.cancelFullScreen()
			// }
			// const el = document.getElementsByClassName("vcp-container")[0]
			// console.log(document.getElementsByTagName("body").)
			document.getElementsByTagName("body")[0].childNodes.forEach(element => {
				if (["vcp-container", "vcp-container small"].includes(element.className)) {
					element.style.position = "relative"
					element.style.top = "0px"
					element.style.left = "0px"
					element.style.right = "0px"
					element.style.bottom = "0px"
					element.style.zIndex = 10
					this.fullscreen = false
					this.element.appendChild(element)
				}

			})
		},
		getFullscreen() {
			return (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
		},
		on(event, callback) {
			if (types.isString(event)) {
				this._events[event] = callback
				_ee.on(event, callback)
			} else if (Array.isArray(event)) {
				event.forEach((item) => {
					this._events[item] = callback
					_ee.on(item, callback)
				})
			}
		},
		emit(event, res) {
			_ee.emit(event, res)
		},
		off(event, callback) {
			_ee.off(event, callback)
		},
		removeAllEvents() {
			for (const item in this._events) {
				_ee.off(item, this._events[item])
			}
		},
		addClass(cls) {
			this.$container.classList.remove(cls)
		},
		removeClass(cls) {
			this.$container.classList.remove(cls)
		}
	},
	beforeDestroy() {
		this.removeAllEvents()
	}
}

export default mixins
