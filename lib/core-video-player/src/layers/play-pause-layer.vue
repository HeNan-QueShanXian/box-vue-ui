<template>
  <div v-show="show" class="vcp-layer play-pause-layer">
    <a v-if="!isPlaying" href="javascript:;" class="btn-control btn-play" @click="play">
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="35" viewBox="0 0 41 47"><path d="M23.5,0,47,41H0Z" transform="translate(41) rotate(90)" fill="#ff6060" /></svg>
    </a>
    <a v-if="isPlaying" href="javascript:;" class="btn-control btn-pause" @click="pause">
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="36" viewBox="0 0 36 48"><g transform="translate(-950 -398)"><rect width="12" height="48" transform="translate(950 398)" fill="#ff6060" /><rect width="12" height="48" transform="translate(974 398)" fill="#ff6060" /></g></svg>
    </a>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import { isMobile } from '../helper/util.js'
import coreMixins from '../mixins'
export default {
  name: 'PlayPauseLayer',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data() {
    return {
      show: isMobile
    }
  },
  mounted() {
    this.on(EVENTS.UI_DASHBOARD_SHOW, () => {
      this.show = true
    })
    this.on(EVENTS.UI_DASHBOARD_HIDE, () => {
      this.show = false
    })
  }
}
</script>