module.exports = {
	"env": {
		"browser": true,
		// "es2021": true,
		"node": true,
		es6: true,
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		// "ecmaVersion": 12
		parser: "babel-eslint",
		sourceType: "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [0],
		"no-unused-vars": [2, {
			"vars": "all",
			"args": "none"
		}]
		// "semi": [
		// 	"error",
		// 	"always"
		// ]
	}
};
