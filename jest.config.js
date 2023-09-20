/* eslint-disable no-undef */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/tests"],
	testRegex: "(/tests/.*\\.(test|spec))\\.ts$",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	verbose: true,
	forceExit: true,
    
};