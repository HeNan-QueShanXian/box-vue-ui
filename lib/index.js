import CoreVideoPlayer from "./core-video-player"
const version = "1.0.5"
function install (app) {
	const components = [CoreVideoPlayer]
	components.forEach(function (item) {
		if (item.install) {
			app.use(item)
		} else if (item.name) {
			app.component(item.name, item)
		}
	})
}
export { install, version, CoreVideoPlayer }
export default {
	install: install,
	version: version
}
