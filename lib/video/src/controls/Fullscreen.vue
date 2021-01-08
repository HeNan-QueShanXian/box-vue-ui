<template>
  <div class="Fullscreen">
    <i @click="handClick" v-if="Fullscreen" class="icon iconfont icon-quanping1"></i>
    <i @click="handClick" v-else class="icon iconfont icon-quanping"></i>
  </div>
</template>
<script>
export default {
  name: "Fullscreen",
  data() {
    return {
      Fullscreen: false
    }
  },
  methods: {
    handClick(e) {
      this.Fullscreen = !this.Fullscreen
      this.changeFullScreen(document.getElementsByClassName("box-video-player")[0])
    },
    changeFullScreen(el) {
      var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      if (!isFullscreen) { //进入全屏,多重短路表达式
        (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());
      } else { //退出全屏,三目运算符
        document.exitFullscreen ? document.exitFullscreen() :
        document.mozCancelFullScreen ? document.mozCancelFullScreen() :
        document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
      }
    }
  }
}
</script>