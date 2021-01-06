<template>
  <div class="ear">
    <span v-show="!value" class="ear-line">
      <div :data-volume="getVolume" class="ear-volume" v-directivemVerticalMousedown="changeVolume"></div>
    </span>
    <i v-if="!value" @click="handEar(true)" class="icon ear-icon iconfont icon-yinliang"></i>
    <i v-else  @click="handEar(false)" class="icon ear-icon iconfont icon-yinliang1"></i>
  </div>
</template>
<script>
import { directivemVerticalMousedown } from "../../../utils/directive"
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
  directives: {
    directivemVerticalMousedown
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
  methods: {
    handEar(e) {
      this.$emit("handEar", e)
    },
    changeVolume({key, value}) {
      this.$emit("handCallback", {key: "volume", value: value})
    }
  }
}
</script>