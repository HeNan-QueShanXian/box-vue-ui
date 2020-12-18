<template>
  <div class="vue-core-video-player-control settings-control">
    <div class="btn-control btn-settings" @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="31.971" height="31.971" viewBox="0 0 31.971 31.971"><g data-name="7" transform="translate(6.985 6.985)" fill="none" stroke="#fff" stroke-width="5"><circle cx="9" cy="9" r="9" stroke="none" /><circle cx="9" cy="9" r="6.5" /></g><g data-name="15 10" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M13.985 3.985h4v3h-4z" /><path data-name="4" d="M15.985 3.985l3 4h-6z" /></g><g data-name="13 2"><path data-name="17" d="M17.985 27.985h-4v-3h4z" /><path data-name="4" d="M15.985 27.985l-3-4h6z" /></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M23.056 6.085l2.829 2.829-2.122 2.12-2.828-2.828z" /><path data-name="4" d="M24.47 7.5l-.707 4.95-4.242-4.244z" /></g><g data-name="13 2"><path data-name="17" d="M8.914 25.884l-2.828-2.828 2.12-2.122 2.83 2.829z" /><path data-name="4" d="M7.5 24.47l.707-4.95 4.243 4.243z" /></g></g></g><g data-name="15 11" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M23.056 6.086l2.828 2.828-2.12 2.122-2.83-2.829z" /><path data-name="4" d="M24.47 7.5l-.707 4.95-4.242-4.243z" /></g><g data-name="13 2"><path data-name="17" d="M8.914 25.885l-2.828-2.828 2.12-2.122 2.83 2.829z" /><path data-name="4" d="M7.5 24.47l.707-4.949 4.242 4.243z" /></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M27.985 13.985v4h-3v-4z" /><path data-name="4" d="M27.985 15.985l-4 3v-6z" /></g><g data-name="13 2"><path data-name="17" d="M3.985 17.985v-4h3v4z" /><path data-name="4" d="M3.985 15.985l4-3v6z" /></g></g></g><g data-name="15 12" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M27.985 13.985v4h-3v-4z" /><path data-name="4" d="M27.985 15.985l-4 3v-6z" /></g><g data-name="13 2"><path data-name="17" d="M3.985 17.985v-4h3v4z" /><path data-name="4" d="M3.985 15.985l4-3v6z" /></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M25.885 23.056l-2.829 2.829-2.12-2.122 2.828-2.828z" /><path data-name="4" d="M24.47 24.47l-4.95-.707 4.244-4.242z" /></g><g data-name="13 2"><path data-name="17" d="M6.086 8.914l2.828-2.828 2.122 2.12-2.829 2.83z" /><path data-name="4" d="M7.5 7.5l4.95.707-4.243 4.243z" /></g></g></g></svg>
    </div>
    <div v-show="panelShow" class="btn-control-panel" @click="preventHide">
      <ul v-show="currentPanel" class="current-panel">
        <li>
          <span class="item-name">
            自动播放
          </span>
          <div class="item-control">
            <widgets-switch ref="autoplaySwitch" @change="changeAutoplaySettings" />
          </div>
        </li>
        <li>
          <span class="item-name">
            循环播放
          </span>
          <div class="item-control">
            <widgets-switch ref="loopSwitch" @change="changeLoopSettings" />
          </div>
        </li>
        <li>
          <span class="item-name">
            播放速度
          </span>
          <div class="item-control" @click="showSpeedPanel">
            <span>{{ speed }}x</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="5.963" height="11.568" viewBox="0 0 5.963 11.568"><path data-name="4" d="M.809.616l3.9 5-3.9 5.368" fill="none" stroke="#fff" stroke-width="2" /></svg>
          </div>
        </li>
        <li v-show="medias.length > 1">
          <span class="item-name">
            清晰度
          </span>
          <div v-if="resolution" class="item-control" @click="showResolutionPanel">
            <span>{{ resolution }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="5.963" height="11.568" viewBox="0 0 5.963 11.568"><path data-name="4" d="M.809.616l3.9 5-3.9 5.368" fill="none" stroke="#fff" stroke-width="2" /></svg>
          </div>
        </li>
      </ul>
      <ul v-show="resolutionListPanel" class="resolution-list animated fadeInRight">
        <li @click="backCurrentPanel">
          <svg xmlns="http://www.w3.org/2000/svg" width="5.963" height="11.568" viewBox="0 0 5.963 11.568"><path data-name="5" d="M5.154.616l-3.9 5 3.9 5.368" fill="none" stroke="#fff" stroke-width="2" /></svg>
          返回
        </li>
        <li v-for="(item, index) in medias" :key="index" @click="setResolution(item)">{{ item.resolution }}</li>
      </ul>
      <ul v-if="speedListPanel" class="speed-list animated fadeInRight">
        <li @click="backCurrentPanel">
          <svg xmlns="http://www.w3.org/2000/svg" width="5.963" height="11.568" viewBox="0 0 5.963 11.568"><path data-name="5" d="M5.154.616l-3.9 5 3.9 5.368" fill="none" stroke="#fff" stroke-width="2" /></svg>
          返回
        </li>
        <li data-val="0.5" @click="setSpeed">0.5x</li>
        <li data-val="1" @click="setSpeed">1x</li>
        <li data-val="1.25" @click="setSpeed">1.25x</li>
        <li data-val="1.5" @click="setSpeed">1.5x</li>
        <li data-val="2" @click="setSpeed">2x</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import SettingSwitch from '../widgets/setting-switch.vue'
import coreMixins from '../mixins'
export default {
  name: 'Settings',
  components: {
    'widgets-switch': SettingSwitch
  },
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data() {
    return {
      autoplay: false,
      loop: false,
      resolution: '',
      panelShow: false,
      currentPanel: true,
      resolutionListPanel: false,
      speedListPanel: false,
      speed: 1,
      medias: []
    }
  },
  mounted() {
    this.on(EVENTS.SOURCE_UPDATED, () => {
      this.medias = this.$player.medias
      this.resolution = this.$player.resolution
    })
    this.on(EVENTS.LIFECYCLE_INITING, () => {
      const { autoplay, loop } = this.$player.config
      if (autoplay) {
        this.$refs['autoplaySwitch'].open()
      }
      if (loop) {
        this.$refs['loopSwitch'].open()
      }
    })
    document.addEventListener('click', () => {
      if (this.panelShow) {
        this.panelShow = false
        this.speedListPanel = false
        this.resolutionListPanel = false
        this.$container.classList.remove('settings-open')
      }
    })
  },
  methods: {
    toggle(e) {
      e && e.stopPropagation()
      this.panelShow = !this.panelShow
      if (this.panelShow) {
        this.$container.classList.add('settings-open')
      } else {
        this.$container.classList.remove('settings-open')
      }
    },
    preventHide(e) {
      e.stopPropagation()
    },
    showResolutionPanel(e) {
      if (this.medias.length <= 1) {
        return
      }
      this.currentPanel = false
      this.resolutionListPanel = true
    },
    showSpeedPanel(e) {
      this.currentPanel = false
      this.speedListPanel = true
    },
    backCurrentPanel() {
      this.currentPanel = true
      this.speedListPanel = false
      this.resolutionListPanel = false
    },
    setResolution(media) {
      if (this.resolution === media.resolution) {
        this.backCurrentPanel()
        return
      }
      this.$player.setResolution(media.resolution)
      this.backCurrentPanel()
      this.toggle()
    },
    setSpeed(e) {
      const val = +e.target.dataset['val']
      this.speed = val
      this.$player.setSpeed(val)
      this.backCurrentPanel()
    },
    changeAutoplaySettings(status) {
      this.$player.setConfig('autoplay', status)
    },
    changeLoopSettings(status) {
      this.$player.setConfig('loop', status)
    }
  }
}
</script>