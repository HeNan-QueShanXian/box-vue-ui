<template>
  <div class="box-video-player-dashboard">
    <div ref="progress" class="box-video-player-progress">
      <div class="line" ref="lineProgress" :style="{width: progressBar + '%'}"></div>
      <div class="zline" :style="{width: buffered + '%'}"></div>
    </div>
    <div class="box-video-player-panel">
      <div class="panel-buttom">
        <i v-if="isPlaying" @click="play" class="iconfont icon-kaishi" />
        <i v-else @click="pause()" class="iconfont icon-zanting" />
      </div>
      <div class="date">{{currentTime}}-{{duration}}</div>
      <div class="setting">
        <span class="playSpeed" @click="handPlaybackRate(item.value)" :class="{active: playSpeed === item.value}" :key="item.value" v-for="item in speedData">{{item.label}}</span>
        <!-- <span v-if="!muted" @click="handEar(true)" class="ear">
          <span class="earline">
            <span class="line"></span>
            <span class="bin"></span>
          </span>
          开启声音
        </span>
        <span v-else @click="handEar(false)" class="ear">关闭声音</span> -->
        <earline @handEar="handEar" @handCallback="handCallback" :volume="volume" v-model="muted" />
        <i class="icon iconfont icon-shezhi"></i>
        <i @click="requestPictureInPicture" class="icon iconfont icon-huazhonghua-miaobianpx"></i>
      </div>
    </div>
  </div>
</template>
<script>
import earline from "./earline"
export default {
  components: {
    earline
  },
  name: "setting",
  data() {
    return {
      video: null, // dom
      isPlaying: true, // 开启/关闭
      muted: false, // 声音
      progressBar: 0, // 进度
      volume: 1, // 音量
      playSpeed: 1, // 速度
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
  mounted() {
    this.video = this.$parent.$refs['video']
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.timeupdate()
      this.loadeddata()
      this.handPause()
      this.handPlay()
      this.waiting()
      this.errors()
      this.seeking()
      this.volumechange()
      this.mousedown(this.$refs.progress)
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
    },
    handPause() {
      this.video.addEventListener("pause", () => {
        console.log("暂停")
        this.isPlaying = true
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
      })
    },
    loadeddata() {
      this.video.addEventListener("loadeddata", () => {
        console.log("loadeddata")
        this.duration = this.resetTime(this.video.duration) // 总时间
        this.currentTime = this.resetTime(this.video.currentTime) // 开始时间
        this.muted = this.video.muted // 获取声音状态
        this.volume = this.video.volume // 获取音量大小
        console.log(this.volume)
        this.getBuffered() // 获取缓存数据 
      })
    },
    timeupdate() { // 运行时触发进度条
      let count = 0
      this.video.addEventListener("timeupdate", () => {
        console.log("timeupdate")
        this.progressBar = parseInt(this.video.currentTime / this.video.duration * 100)
        this.currentTime = this.resetTime(this.video.currentTime)
        // if (count === 0) {
        //   if (this.video.buffered.end(0) === this.video.duration) {
        //     count = 1
        //   }
        // }
        this.getBuffered()
      })
    },
    errors() {
      this.video.addEventListener("error", () => {
        this.load()
        this.isPlaying = true
      })
    },
    waiting() {
      this.video.addEventListener("waiting", () => {
        this.getBuffered()
      })
    },
    volumechange() {
      this.video.addEventListener("volumechange", () => {
        console.log(this.video.volume)
      })
    },
    getBuffered() {
      try {
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
        this.progressBar = parseInt(this.video.currentTime / this.video.duration * 100)
        this.getBuffered()
      })
    },
    mousedown(element) {
      let mDown = false
      let vm = this
      const offsetWidth = element.offsetWidth
      element.addEventListener("mousedown", (event) => {
        console.log("mousedown")
        if(event.button === 0) {
          vm.video && vm.pause()
          vm.video.currentTime = vm.video.duration *(event.offsetX / offsetWidth)
          mDown = true
        }
        document.addEventListener("mousemove", (event) => {
          if (mDown) {
            vm.video.currentTime = vm.video.duration *(event.offsetX / offsetWidth)
            vm.getBuffered()
          }
        })
        document.addEventListener("mouseup", (event) => {
          console.log("mouseup")
          if(mDown) {
            vm.video && vm.play()
          }
          mDown = false
          document.removeEventListener("mousemove", () => {}, false)
        })
      })
      
    }
  }
}
</script>