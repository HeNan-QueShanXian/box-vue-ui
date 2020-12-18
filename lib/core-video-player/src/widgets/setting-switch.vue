<template>
  <div class="vcp-switch" :class="{ open: isOpen}" @click="toggle" />
</template>

<script>
export default {
  name: 'SettingSwitch',
  props: {
    openStatus: Boolean
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    },
    open() {
      this.isOpen = true
    }
  }
}
</script>