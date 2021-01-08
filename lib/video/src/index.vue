<template>
  <div ref="player" :tabIndex='1' class="box-video-player" @keyup.enter="changeBorder($event)" @keyup.space="changeBorder($event)" @focus="focus" @blur="blur">
    <div class="box-video-player-container">
			<video ref="video" :playbackRate="playbackRate" :muted="muted" :src="src">
				您的浏览器不支持Video标签。
			</video>
			<layers v-model="layersChange" v-if="islayers" />
			<transition name = "fade">
				<setting ref="setting" v-show="mask" @handcallback="handcallback" v-model="playbackRate" :muted="muted" />
			</transition>
		</div>
  </div>
</template>
<script>
import setting from "./controls/setting"
import layers from "./layers"
let mDown = false
let elementArray = []
export default {
  props: {
    loop: { // 如果出现该属性，则当媒介文件完成播放后再次开始播放。
			type: Boolean,
			default: false
		},
		muted: { // 如果出现该属性，视频的音频输出为静音。
			type: Boolean,
			default: () => false
		},
		autoplay: { // 如果出现该属性，则视频在就绪后马上播放。
			type: Boolean,
			default: false
		},
		preload: {
			type: String,
			default: () => "auto" // auto | metadata | none
		},
		src: {
			type: String,
			default: () => ""
		}
	},
	components: {
		setting,
		layers
	},
	data() {
		return {
			playbackRate: 1, // 播放速度
			mask: false,
			islayers: false,
			layersChange: '', // videoPause(暂停) | emptied(空链接)
			dashboardHideDelay: 1500
		}
	},
	
	mounted() {
		this.$nextTick(() => {
			if(!this.src) {
				this.islayers = true
				this.layersChange = "emptied"
			} else {
				this.islayers = false
				this.init()
			}
		})
	},
	methods: {
		init() {
			this.$refs.player.addEventListener("mousedown", (event) => { // 点击屏幕触发开启/关闭视频
				this.changeBorder()
			})
			mDown = true
			this.showDashboard(this.dashboardHideDelay)
			this.ChangelayersPage() // 初始化
		},
		focus(e) {
			console.log("在")
			this.$refs.player.addEventListener("mousemove", this._mousemove.bind(this))
			this.$refs.player.addEventListener("mouseleave", this._mouseleave.bind(this))
		},
		_mousemove() {
			this.showDashboard(this.dashboardHideDelay)
		},
		_mouseleave() {
			this.showDashboard(100)
		},
		ChangelayersPage() { // 切换暂停按钮
			if(this.$refs.video.paused) {
				this.islayers = true
				this.layersChange = "videoPause"
			} else {
				this.islayers = false
			}
		},
		blur() {
			console.log("离开")
			this.$refs.player.removeEventListener("mousemove", this._mousemove)
			this.$refs.player.removeEventListener("mouseleave", this._mouseleave)
		},
		changeBorder(e) {
			this.serachELement(document.getElementsByClassName("box-video-player-dashboard")[0])
			if(!elementArray.includes(event.target)) {
				if (this.$refs.video.paused) {
					this.play()
				} else {
					this.pause()
				}
			}
		},
		serachELement(el) {
			[...el.children].forEach(element => {
				elementArray.push(element)
				this.serachELement(element)
			})
		},
		showDashboard(delay) {
			mDown = true
      window.clearTimeout(this._hideTimeout)
			this.mask = true
      if (delay === 0) {
				console.log('no')
      } else {
        this._hideTimeout = setTimeout(() => {
          this.hideDashboard()
        }, delay || 2500)
      }
		},
		hideDashboard() {
			this.mask = false
			mDown = false
    },
		pause() { // 暂停播放
			this.$refs.video.pause()
		},
		play() { // 开始播放
			this.$refs.video.play()
		},
		destroy() {
			this.$refs.video.pause()
		},
		handcallback({key, value}) {
			if(key === 'playbackRate') {
				console.log(value)
			}
			if (key === 'layersChange') {
				this.ChangelayersPage()
			}
		},
		// 设置倍数
		handPlaybackRate(e) {
			this.playbackRate = e
		},
		handIsStart(e) {}
	},
	beforeDestroy() {
		this.destroy()
		// mouseleave
	}
}
</script>