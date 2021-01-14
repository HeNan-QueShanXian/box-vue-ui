
<script>
import { directivemMousedown } from "../../../utils/directive"
export default {
  name: "player-progress",
  directives: {
    directivemMousedown
  },
  props: {
    buffered: { // 缓冲
      type: Number,
      default: () => 0
    },
    progress: { // 播放时间
      type: Number,
      default: () => 0
    }
  },
  render: function (h) {
    return h("div", {
      class: ["box-video-player-progress"],
      attrs: {
        'data-buffered': this.buffered,
        'data-progress': this.progress
      },
      directives: [
        {
          name: "directivemMousedown",
          arg: this.changeProgress
        }
      ]
    })
  },
  methods: {
    changeProgress({key, value}) {
      if(key === 'pause') {
        this.$emit("handCallback", { key: 'changeProgress', value: value})
        this.$parent.pause()
      }
      if(key === 'play') {
        this.$parent.play()
      }
    }
  }
}
</script>