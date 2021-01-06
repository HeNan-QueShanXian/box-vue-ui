<template>
  <div class="box-video-player-dashboard">
    <player-progress @handCallback="handCallback" :buffered="buffered" :progress="progressBar" />
    <div class="box-video-player-panel">
      <div class="panel-buttom">
        <i v-if="isPlaying" @click="play" class="iconfont icon-kaishi" />
        <i v-else @click="pause()" class="iconfont icon-zanting" />
      </div>
      <div class="date">{{currentTime}}/{{duration}}</div>
      <div class="setting">
        <earline @handEar="handEar" @handCallback="handCallback" :volume="volume" v-model="muted" />
        <i @click="requestPictureInPicture" class="icon iconfont icon-huazhonghua-miaobianpx"></i>
        <playSpeed @handCallback="handCallback" v-model="setPlaybackRate"/>
        <box-fullscreen />
      </div>
    </div>
  </div>
</template>
<script>
import earline from "./earline"
import playSpeed from "./playSpeed"
import boxFullscreen from "./Fullscreen"
import playerProgress from "./player-progress"
let mDown = false;
export default {
  components: {
    earline,
    boxFullscreen,
    playSpeed,
    playerProgress
  },
  props: {
    value: {
      type: Number,
      default: () => 1
    }
  },
  name: "setting",
  data() {
    return {
      video: null, // dom
      isPlaying: true, // 开启/关闭
      muted: false, // 声音
      progressBar: 0, // 进度
      volume: 1, // 音量
      // playSpeed: 1, // 速度
      buffered: 0, // 缓冲时间
      speedData: [
        { value: 0.5, label: '0.5x' },
        { value: 1, label: '1x' },
        { value: 1.25, label: '1.25x' },
        { value: 1.5, label: '1.5x' },
        { value: 2, label: '2x' }
      ],
      currentTime: '00:00',
      duration: '00:00:00'
    }
  },
  computed: {
     setPlaybackRate: {
       get() {
         return this.value
       },
       set(val) {
         this.video.playbackRate = val
         this.$emit("input", val)
       }
     }
  },
  mounted() {
    this.video = this.$parent.$refs['video']
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.errors()
      this.loadstart() // 1
      this.durationchange() // 2
      this.loadedmetadata() // 3
      this.loadeddata() // 4
      this.progress() // 5
      this.canplay() // 6
      this.canplaythrough() // 7
      this.stalled()
      this.timeupdate()
      this.handPause()
      this.handPlay()
      this.waiting()
      this.seeking()
      this.volumechange()
    },
    pause() { // 暂停播放
			this.video.pause()
		},
		play() { // 开始播放
			this.video.play()
    },
    load() { // 开始播放
			this.video.load()
    },
    handEar(e) { // 开启关闭声音
      this.video.muted = e
      this.muted = e
    },
    handCallback({key, value}) {
      if (key === 'volume') {
        this.volume = value
        this.video.volume = this.volume
      }
      if (key === 'playbackRate') {
        console.log(value)
      }
      if (key === 'changeProgress') {
        this.video.currentTime = this.video.duration * (value / 100)
        this.getBuffered()
      }
    },
    handPause() {
      this.video.addEventListener("pause", () => {
        console.log("暂停")
        this.isPlaying = true
        this.$emit("handcallback", { key: 'layersChange' })
      })
    },
    handPlaybackRate(e) {
      this.video.playbackRate = e
      this.playSpeed = e
    },
    handPlay() {
      this.video.addEventListener("play", () => {
        console.log("开始")
        this.isPlaying = false
        this.$emit("handcallback", { key: 'layersChange' })
      })
    },
    // 当浏览器开始查找音频/视频时触发。
    loadstart() {
      this.video.addEventListener('loadstart', (e) => {
        console.log("loadstart", e)
        console.log(this.video.networkState)
      })
    },
    // 当音频/视频的时长已更改时触发。
    durationchange() {
      this.video.addEventListener("durationchange", () => {
        console.log("durationchange")
      })
    },
    // 当浏览器已加载音频/视频的元数据时触发。
    loadedmetadata() {
      this.video.addEventListener("loadedmetadata", () => {
        console.log("loadedmetadata")
      })
    },
    // 当浏览器已加载音频/视频的当前帧时触发。
    loadeddata() {
      this.video.addEventListener("loadeddata", () => {
        console.log("loadeddata")
        this.duration = this.resetTime(this.video.duration) // 总时间
        this.currentTime = this.resetTime(this.video.currentTime) // 开始时间
        this.muted = this.video.muted // 获取声音状态
        this.volume = this.video.volume // 获取音量大小
        // this.getBuffered() // 获取缓存数据 
      })
    },
    // 当浏览器正在下载音频/视频时触发。
    progress() {
      this.video.addEventListener("progress", (e) => {
        console.log("progress", this.video.readyState)
        this.getBuffered()
        // console.log(this.video.readyState)
      })
    },
    // 当浏览器可以开始播放音频/视频时触发。
    canplay() {
      this.video.addEventListener("canplay", () => {
        console.log("canplay", this.video.readyState)
      })
    },
    // 当浏览器可在不因缓冲而停顿的情况下进行播放时触发。
    canplaythrough() {
      this.video.addEventListener("canplaythrough", () => {
        console.log("canplaythrough")
        // 
      })
    },
    // 当目前的播放位置已更改时触发。
    timeupdate() {
      let count = 0
      this.video.addEventListener("timeupdate", () => {
        console.log("timeupdate")
        this.progressBar = parseInt(this.video.currentTime / this.video.duration * 100)
        this.currentTime = this.resetTime(this.video.currentTime)
        // this.getBuffered()
      })
    },
    stalled() {
      this.video.addEventListener("stalled", () => {
        // alert("媒体数据不可用");
      })
    },
    //返回表示音频/视频错误状态的 MediaError 对象。
    errors() {
      this.video.addEventListener("error", (e) => {
        this.isPlaying = true
        if(this.video.currentSrc)  {
          this.load()
        }
      })
    },
    // 当浏览器尝试获取媒体数据，但数据不可用时触发。
    waiting() {
      this.video.addEventListener("waiting", () => {
        console.log("waiting")
        // this.getBuffered()
      })
    },
    volumechange() {
      this.video.addEventListener("volumechange", () => {
        console.log(this.video.volume)
      })
    },
    getBuffered() {
      try {
        this.progressBar = parseInt(this.video.currentTime / this.video.duration * 100)
        this.buffered = this.video.buffered.end(0) / this.video.duration * 100
      } catch(e){
        console.log(e)
      }
    },
    resetTime(time) {
      if (!time ) return "00:00:00"
      var day = Math.floor( time/ (24*3600) ); // Math.floor()向下取整 
      var hour = Math.floor( (time - day*24*3600) / 3600); 
      var minute = Math.floor( (time - day*24*3600 - hour*3600) /60 ); 
      var second = time - day*24*3600 - hour*3600 - minute*60;
      let str = ""
      if (day > 0) {
        str += this.str(day) + ":"
      }
      str += this.str(hour) + ":"
      str += this.str(minute) + ":"
      str += this.str(parseInt(second))
      return str; 
    },
    str(t) {
      return t === 0 ? '00' : t < 10 ? '0' + t : t
    },
    requestPictureInPicture() {
      try {
        if (this.video !== document.pictureInPictureElement) {
          this.video.requestPictureInPicture()
        } else {
          document.exitPictureInPicture()
        }
      } catch (err) {
        console.error(err)
      }
    },
    seeking() {
      this.video.addEventListener('seeking',() => {
        this.currentTime = this.resetTime(this.video.currentTime)
        this.getBuffered()
      })
    },
  },
  beforeDestroy() {
  }
}
</script>