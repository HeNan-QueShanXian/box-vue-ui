<template>
  <div class="vcp-controls">
    <div class="playback-control">
      <play-pause-cntrol />
      <time-span />
    </div>
    <div class="setting-control">
      <volume-control :muted="muted" />
      <picture-in-picture />
      <speed />
      <settings-control />
      <fullscreen-control />
    </div>
  </div>
</template>

<script>
import PlayPauseControl from './play-pause-control'
import TimeSpan from './time-span'
import VolumeControl from './volume'
import Fullscreen from './fullscreen'
import Settings from './settings'
import PictureInPicture from './picture-in-picture'
import speed from './speed'
export default {
  name: 'Controls',
  components: {
    'play-pause-cntrol': PlayPauseControl,
    'time-span': TimeSpan,
    'volume-control': VolumeControl,
    'fullscreen-control': Fullscreen,
    'settings-control': Settings,
    'picture-in-picture': PictureInPicture,
    speed
  },
  props: {
    visible: Boolean,
    muted: Boolean
  },
}
</script>