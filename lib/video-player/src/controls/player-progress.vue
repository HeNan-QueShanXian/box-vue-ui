<template>
  <div :data-buffered="buffered" :data-progress="progress" v-directivemMousedown="changeProgress" class="box-video-player-progress" />
</template>
<script>
import { directivemMousedown } from "../../../utils/directive"
export default {
  name: "player-progress",
  directives: {
    directivemMousedown
  },
  props: {
    buffered: { // 缓冲
      type: Number,
      default: () => 0
    },
    progress: { // 播放时间
      type: Number,
      default: () => 0
    }
  },
  methods: {
    changeProgress({key, value}) {
      if(key === 'pause') {
        this.$emit("handCallback", { key: 'changeProgress', value: value})
        this.$parent.pause()
      }
      if(key === 'play') {
        this.$parent.play()
      }
    }
  }
}
</script>