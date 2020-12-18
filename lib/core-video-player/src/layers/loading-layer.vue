<template>
  <div v-show="show" class="vcp-layer loading-layer">
    <div class="loading-wrap">
      <div class="h5-layer-loading">
        <svg class="spinner" width="100%" height="100%" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" gradientUnits="objectBoundingBox" gradientTransform="rotate(135 0.5 0.5)">
              <stop offset="0%" stop-color="#ff6060" />
              <stop offset="100%" stop-color="#fa3b3b" />
            </linearGradient>
          </defs>
          <circle class="path" stroke="url(#grad)" stroke-width="10" fill="none" stroke-linecap="round" cx="40" cy="40" r="30" />
        </svg>
      </div>
      <p>加载中 ...</p>
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
const showTimeout = 600
export default {
  name: 'LoadingLayer',
  mixins: [coreMixins],
  data() {
    return {
      show: false
    }
  },
  created() {
    // safari trigger canplaythrough
    this.on([EVENTS.CANPLAY, EVENTS.CANPLAYTHROUGH, EVENTS.PLAY, EVENTS.LOADEDMETADATA, EVENTS.SEEKED, EVENTS.ERROR], () => {
      this.hideLoading()
    })
    this.on([EVENTS.SEEKING, EVENTS.STALLED, EVENTS.LOADSTART], (item) => {
      this.showLoading()
    })
    this.on(['playing'], () => {
      this.hideLoading()
    })
  },
  methods: {
    showLoading(isForce) {
      if (isForce) {
        this.show = true
        return
      }
      window.clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        this.show = true
      }, showTimeout)
    },
    hideLoading() {
      window.clearTimeout(this._timeout)
      this.show = false
    }
  }
}
</script>