<template>
  <div class="vue-core-video-player-layers">
    <cover-layer />
    <logo-layer />
    <title-layer />
    <play-pause-layer />
    <loading-layer />
    <error-layer />
  </div>
</template>

<script>
import TitleLayer from './title-layer'
import LogoLayer from './logo-layer'
import PlayPauseLayer from './play-pause-layer.vue'
import CoverLayer from './cover-layer'
import LoadingLayer from './loading-layer'
import ErrorLayer from './error-layer'
export default {
  name: 'Layers',
  components: {
    PlayPauseLayer,
    CoverLayer,
    LogoLayer,
    TitleLayer,
    LoadingLayer,
    ErrorLayer
  },
  props: {
    visible: Boolean
  }
}
</script>