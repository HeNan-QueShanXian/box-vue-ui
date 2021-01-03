<template>
  <div ref="player" class="box-video-player">
    <div class="box-video-player-container">
			<video ref="video" :playbackRate="playbackRate" :muted="muted" src="https://conan-online.fbcontent.cn/conan-english/230182790/zebraMoment/android/-810628769--25339213.mp4">
				您的浏览器不支持Video标签。
			</video>
			<setting @handcallback="handcallback" :muted="muted" />
		</div>
  </div>
</template>
<script>
import setting from "./setting"
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
	},
	components: {
		setting
	},
	data() {
		return {
			playbackRate: 1, // 播放速度
		}
	},
	methods: {
		pause() { // 暂停播放
			this.$refs.video.pause()
		},
		play() { // 开始播放
			this.$refs.video.play()
		},
		handcallback({value, key}) {
			if(value === 'ear') {
				console.log()
			}
		},
		// 设置倍数
		handPlaybackRate(e) {
			this.playbackRate = e
			// this.$refs.video.playbackRate = e
		},
		handIsStart(e) {}
	}
}
</script>