<template>
  <div class="vcp-controls">
    <div class="playback-control">
      <time-span />
    </div>
    <div class="setting-control">
      <picture-in-picture />
      <settings-control />
      <fullscreen-control />
    </div>
  </div>
</template>

<script>
import TimeSpan from './time-span'
import Fullscreen from './fullscreen'
import Settings from './settings'
import PictureInPicture from './picture-in-picture'
export default {
  name: 'Controls',
  components: {
    'time-span': TimeSpan,
    'fullscreen-control': Fullscreen,
    'settings-control': Settings,
    'picture-in-picture': PictureInPicture
  },
  props: {
    visible: Boolean,
    muted: Boolean
  }
}
</script>