<template>
  <div v-show="show && title.length" class="vcp-layer title-layer">
    <div class="video-title">{{ title }}</div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  data() {
    return {
      title: '',
      show: false
    }
  },
  mounted() {
    this.on(EVENTS.LIFECYCLE_INITING, () => {
      const { title } = this.$player.config
      if (title) {
        this.title = title
      }
    })
    this.on(EVENTS.UI_DASHBOARD_SHOW, () => {
      this.show = true
    })
    this.on(EVENTS.UI_DASHBOARD_HIDE, () => {
      this.show = false
    })
  }
}
</script>