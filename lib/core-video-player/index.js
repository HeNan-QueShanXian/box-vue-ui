import videoPlayer from "./src";
videoPlayer.install = (Vue) => {
	Vue.component(videoPlayer.name, videoPlayer);
};
export default videoPlayer;