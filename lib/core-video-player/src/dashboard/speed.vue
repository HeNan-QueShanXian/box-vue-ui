<template>
  <div class="box-video-player-speed">
    <span @click="setSpeed(item.value)" :class="{active: speed === item.value }" data-val="0.5" :key="item.value" v-for="item in speedData">{{item.label }}</span>
    <!-- <span @click="setload" class="box-video-player-reload">重新播放</span> -->
  </div>
</template>
<script>
import coreMixins from '../mixins'
export default {
  mixins: [coreMixins],
  data() {
    return {
      speed: 1,
      speedData: [
        { value: 0.5, label: '0.5x' },
        { value: 1, label: '1x' },
        { value: 1.25, label: '1.25x' },
        { value: 1.5, label: '1.5x' },
        { value: 2, label: '2x' }
      ]
    }
  },
  methods: {
    setSpeed(e) {
      this.speed = e
      this.$player.setSpeed(e)
    },
    setload() {
      this.load()
    }
  }
}
</script>