<template>
  <div v-if="logo" class="vcp-layer logo-layer">
    <div class="logo-wrap">
      <img alt="logo" :src="logo">
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data() {
    return {
      logo: ''
    }
  },
  mounted() {
    this.on(EVENTS.LIFECYCLE_INITING, () => {
      const { logo } = this.$player.config
      if (logo) {
        this.logo = logo
      }
    })
  }
}
</script>