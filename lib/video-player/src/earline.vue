<template>
  <div class="ear">
    <span v-show="!value" class="ear-line">
      <div ref="earbox" class="ear-volume">
        <div ref="bar" :style="{top: getVolume - 2 + 'px'}" class="ear-line-bar"></div>
        <div class="ear-line-box" :style="{height: getVolume + 'px'}"></div>
      </div>
    </span>
    <i v-if="!value" @click="handEar(true)" class="icon ear-icon iconfont icon-yinliang"></i>
    <i v-else  @click="handEar(false)" class="icon ear-icon iconfont icon-yinliang1"></i>
  </div>
</template>
<script>
export default {
  name: "earline",
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    volume: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      line: 0
    }
  },
  computed: {
    getVolume: {
      get() {
        return this.volume * 100
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      console.log(this.getVolume)
    })
  },
  methods: {
    handEar(e) {
      this.$emit("handEar", e)
    },
    init() {
      const offsetHeight = this.$refs.earbox.offsetHeight
      let vm = this
      this.$refs.earbox
      this.$refs.bar.addEventListener("mousedown", function (event){
        let mDown = false
        let volume = 0
        var event = event || window.event;
        let top = this.offsetTop
        if(event.button === 0) {
          mDown = true
        }
        document.addEventListener("mousemove", (t) => {
          if (mDown) {
            if(['ear-line-box', 'ear-volume'].includes(t.target.className)) {
              vm.$emit("handCallback", {key: "volume", value: t.offsetY / 100})
            }
          }
        })
        document.addEventListener("mouseup", (event) => {
          mDown = false
          document.removeEventListener("mousemove", () => {}, false)
        })
      })
    }
  }
}
</script>