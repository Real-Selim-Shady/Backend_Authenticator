/* eslint-disable no-undef */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src/tests"],
	testRegex: "(/src/tests/.*\\.(test|spec))\\.ts$",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	verbose: true,
	forceExit: true,
	moduleNameMapper: {
		"^bcrypt$": "<rootDir>/node_modules/bcrypt"
	}
    
};