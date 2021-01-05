<template>
  <div v-show="show" class="vcp-layer error-layer">
    <div class="error-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 200 200"><g transform="translate(-963 -1663)"><circle data-name="11" cx="100" cy="100" r="100" transform="translate(963 1663)" fill="#ff5e5c" /><g data-name="46" transform="translate(1006 1727)" fill="#fff" stroke="#fff" stroke-width="3"><rect width="120" height="73" rx="2" stroke="none" /><rect x="1.5" y="1.5" width="117" height="70" rx=".5" fill="none" /></g><g data-name="12" transform="translate(1108 1743)" fill="#fff" stroke="#ff5a52" stroke-width="2"><circle cx="6" cy="6" r="6" stroke="none" /><circle cx="6" cy="6" r="5" fill="none" /></g><path data-name="1" fill="none" stroke="#fff" stroke-width="3" d="M1057.5 1728.5l30-22" /><path data-name="2" fill="none" stroke="#fff" stroke-width="3" d="M1036.5 1697.5l22 30" /><path data-name="48" d="M1018 1737h80a4 4 0 0 1 4 4v45a5 5 0 0 1-5 5h-78a5 5 0 0 1-5-5v-45a4 4 0 0 1 4-4z" fill="#2785f2" /><g data-name="4" fill="#ff584c"><path data-name="49" d="M1108 1757h3v2h-3z" /><path data-name="50" d="M1113 1757h3v2h-3z" /><path data-name="51" d="M1118 1757h3v2h-3z" /></g><g data-name="5" fill="#ff584c"><path data-name="49" d="M1108 1760h3v2h-3z" /><path data-name="50" d="M1113 1760h3v2h-3z" /><path data-name="51" d="M1118 1760h3v2h-3z" /></g></g></svg>
    </div>
    <div class="error-msg-wrap">
      <!-- <h2>"(O_O)?  播放错误!"</h2> -->
      <p class="error-msg" @click="reloads">重新加载</p>
    </div>    
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { i18n } from '../helper'
export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    dsiable: Boolean
  },
  data() {
    return {
      errMsg: '',
      show: false
    }
  },
  mounted() {
    this.on(EVENTS.ERROR, (e) => {
      this.show = false
      this.load()
      setTimeout(() => {
        this.pause()
      },100)
    })
  },
  methods:  {
    reloads() {
      this.show = false
      this.load()
    }
  }
}
</script>
