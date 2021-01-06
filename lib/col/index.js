import {createNamespace} from "../utils/create"
// videoPlayer.install = (Vue) => {
// 	Vue.component(videoPlayer.name, videoPlayer);
// };
export default createNamespace("col")({
  functional: true,
  props: {
    span: {
      type: Number,
      default: () => 24
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  render(h, context) {
    // const {} = context
    // console.log("context", context)
    // console.log(context.scopedSlots['rignt'])
    return h("div", {
      class: ['box-col-' + 12]
    }, context.children)
  }
});