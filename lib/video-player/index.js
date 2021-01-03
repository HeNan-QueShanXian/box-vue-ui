import videoPlayer from "./src";

import {createNamespace} from "../utils/create"
// videoPlayer.install = (Vue) => {
// 	Vue.component(videoPlayer.name, videoPlayer);
// };
export default createNamespace("video")(videoPlayer);
