import video from "./video"
import col from "./col"
import row from "./row"
import input from "./input"
const version = "1.3.1"
function install (app) {
	const components = [video, col, row, input]
	components.forEach(function (item) {
		if (item.install) {
			app.use(item)
		} else if (item.name) {
			app.component(item.name, item)
		}
	})
}
export { install, version, video, col, row, input }
export default {
	install: install,
	version: version
}
