<template>
  <div ref="input" class="vcp-progress-hover" @click="seek">
    <div ref="container" class="vcp-progress">
      <div class="vcp-progress-loaded" :style="{width: bufferProgress + '%'}" />
      <div class="vcp-progress-played" :style="{width: progress + '%'}">
        <div ref="thumb" class="thumb-drag" @touchstart="startDrag" @mousedown="startDrag" />
      </div>
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { getElementOffsets, isMobile } from '../helper/util'
import { drag } from '../helper/dom'
export default {
  name: 'Progress',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data() {
    return {
      progress: 0.00,
      bufferProgress: 0.00
    }
  },
  created() {
    this.on(EVENTS.TIMEUPDATE, () => {
      if (this._dragEl) {
        return
      }
      const time = this.$player.getCurrentTime()
      const duration = this.$player.getDuration()
      // this.setProgressPlayedPercent();
      this.progress = (time / duration * 100).toFixed(2)
      // this.setRangeValue((time / duration * 100).toFixed(1));
    })
    this.on(EVENTS.PROGRESS, () => {
      const bufferTime = this.$player.getBufferTime()
      const duration = this.$player.getDuration()
      if (bufferTime > 0 && duration > 0) {
        this.bufferProgress = (bufferTime / duration * 100).toFixed(2)
      }
    })
    this.on(EVENTS.LOADSTART, () => {
      const bufferTime = this.$player.getBufferTime()
      const duration = this.$player.getDuration()
      this.bufferProgress = (bufferTime / duration * 100).toFixed(2)
    })
  },
  methods: {
    seek(e) {
      const offsets = getElementOffsets(e.currentTarget)
      if (this.getFullscreen()) {
        offsets.left = 0
      }
      const _clientRect = e.currentTarget.getBoundingClientRect()
      const left = e.pageX - _clientRect.left
      const maxVal = e.currentTarget.offsetWidth
      const val = (left / maxVal * 100).toFixed(2)
      this.progress = val
      const duration = this.$player.getDuration()
      this.$player.seek(left / maxVal * duration)
    },
    startDrag(e) {
      this.initDrag(e)
      this.startSeek = true
    },
    initDrag(e) {
      e.preventDefault()
      const self = this
      this._dragEl = this.$refs['thumb']
      const maxVal = this.$refs['input'].offsetWidth
      let marginLeft = getComputedStyle(this._dragEl, null).marginLeft
      if (marginLeft) {
        marginLeft = parseFloat(marginLeft)
      }
      const coor = {
        x: (isMobile ? e.touches[0].clientX : e.pageX) - this._dragEl.offsetLeft + marginLeft,
        y: (isMobile ? e.touches[0].clientX : e.clientY) - this._dragEl.offsetTop,
        maxLeft: maxVal
      }
      if (this.getFullscreen()) {
        coor.x = e.pageX - this._dragEl.offsetLeft
      }
      const move = function(ev) {
        if (!self._dragEl) {
          return
        }
        const newCoor = drag(ev, self._dragEl, coor)
        if (newCoor) {
          const left = newCoor.left
          const val = (left / maxVal * 100).toFixed(2)
          self.progress = val
          const duration = self.$player.getDuration()
          self.$player.seek(left / maxVal * duration)
        }
      }
      const stopMove = function() {
        self._dragEl = null
        if (isMobile) {
          self.$refs['container'].removeEventListener('touchmove', move, false)
          document.removeEventListener('touchend', stopMove, false)
          return
        }
        document.removeEventListener('mousemove', move, false)
        document.removeEventListener('mouseup', stopMove, false)
      }
      if (isMobile) {
        self.$refs['container'].addEventListener('touchmove', move, false)
        document.addEventListener('touchend', stopMove, false)
        return
      }
      document.addEventListener('mousemove', move, false)
      document.addEventListener('mouseup', stopMove, false)
    }
  }
}
</script>
