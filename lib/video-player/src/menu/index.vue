<template>
  <div class="box-video-player-dashboard">
    <!-- <div class="box-video-player-menu"></div> -->
    <setting-tip />
    <!-- <div class="box-video-player-dashboard-row">
      <div class="_row-meun">
        <div class="_row-start">
          <i v-if="isPlaying" @click="play()" class="iconfont icon-kaishi" />
          <i v-else @click="pause()" class="iconfont icon-zanting" />
          <span class="time">1</span>
          <i class="">/</i>
          <span class="time">1</span>
        </div>
        <div class="box-video-player-dashboard-setting">
          <span class="icon" :key="item" v-for="item in playbackRateData" @click="handPlaybackRate(item)" :class="{active: item === playbackRate}">{{item}}x</span>
          <i class="icon iconfont icon-shezhi"></i>
          <i class="icon iconfont icon-huazhonghua-miaobianpx"></i>
        </div>
      </div>
    </div> -->
    <progress-tip />
  </div>
</template>
<script>
import moment from 'moment'
import progressTip from '../components/progress'
import settingTip from '../components/setting'
export default {
  props: {
    playbackRate: {
      type: Number,
      defaule: 1
    }
  },
  components: {
    progressTip,
    settingTip
  },
  data() {
    return {
      playbackRateData: [0.5, 1, 1.25, 1.5, 2],
      isPlaying: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$parent.$refs['video'])
    })
    // console.log(this.$parent.$refs['video'].currentTime)
    // console.log(this.$parent.$refs['video'].duration)
    // var x = this.$parent.$refs['video'].duration
    // console.log(moment().second(22))
    // console.log(this.getTimeFromMins(480))
//     console.log(moment.utc(
//     moment.duration(22, "minute")
//     .asMilliseconds()
// ).format("h [hour] mm [minutes]"))
//     var d = moment.duration(x, 'milliseconds');
//     var hours = Math.floor(d.asHours());
//     var mins = Math.floor(d.asMinutes()) - hours * 60;
//     console.log("hours:" + hours + " mins:" + mins)
    // currentTime
  },
  methods: {
    getTimeFromMins(mins) {
      if (mins >= 24 * 60 || mins < 0) { 
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440."); 
      }
      var h = mins/60 | 0, 
      m = mins % 60 | 0; 
      return moment.utc().hours(h).minutes(m).format("hh:mm A"); 
    },
    play() {
      this.isPlaying = false
      this.$parent.play()
    },
    pause() {
      this.$parent.pause()
      this.isPlaying = true
    },
    handPlaybackRate (e) {
      this.$emit('handPlaybackRate', e)
    }
  }
}
</script>