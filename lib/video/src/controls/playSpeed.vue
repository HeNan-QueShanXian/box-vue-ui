<template>
  <div class="playSpeed">
    <!-- {{ setPlaybackRate }}x
    <div class="playSpeed-row">
      <div class="playSpeed-row-item">
        <span class="item" @click="handClick(item.value)" :key="item.value" :class="{active: item.value === setPlaybackRate}" v-for="item in speed">{{item.label}}</span>
      </div>
    </div> -->
    <span class="item" @click="handClick(item.value)" :key="item.value" :class="{active: item.value === setPlaybackRate}" v-for="item in speed">{{item.label}}</span>
  </div>
</template>
<script>
export default {
  name: "playSpeed",
  props: {
    value: {
      type: Number,
      default: () => 1
    }
  },
  data() {
    return {
      speed: [
        { value: 0.5, label: '0.5x' },
        { value: 1, label: '1x' },
        { value: 1.25, label: '1.25x' },
        { value: 1.5, label: '1.5x' },
        { value: 2, label: '2x' }
      ],
    }
  },
  computed: {
    setPlaybackRate: {
       get() {
         return this.value
       },
       set(val) {
         this.$emit("input", val)
       }
     }
  },
  methods: {
    handClick(e) {
      this.setPlaybackRate = e
      console.log(e)
    }
  }
}
</script>