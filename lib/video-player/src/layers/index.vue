<template>
  <transition name = "fade">
    <component :is="componentId"></component>
  </transition>
</template>
<script>
import emptied from "./emptied"
import videoPause from "./video-pause"
export default {
  name: "layers",
  props: {
    value: {
      type: String,
      default: () => "emptied"
    }
  },
  components: {
    // emptied
  },
  computed: {
    componentId() {
      let componentId = null
      switch (this.value) {
        case "emptied":
          componentId = emptied
          break;
        default:
          componentId = videoPause
          break;
      }
      return componentId
    }
  }
}
</script>