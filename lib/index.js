import CoreVideoPlayer from "./core-video-player"
import videoPlayer from "./video-player"
const version = "1.3.1"
function install (app) {
	const components = [videoPlayer, CoreVideoPlayer]
	components.forEach(function (item) {
		if (item.install) {
			app.use(item)
		} else if (item.name) {
			app.component(item.name, item)
		}
	})
}
export { install, version, videoPlayer, CoreVideoPlayer }
export default {
	install: install,
	version: version
}
