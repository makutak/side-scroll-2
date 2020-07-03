/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('app');\nvar ctx = canvas.getContext('2d');\nvar ballRadius = 10;\nvar h = canvas.height - ballRadius;\nvar w = canvas.width - ballRadius;\nvar t = 0;\nvar dt = 1;\nvar g = 0.4;\nvar dx = 5;\nvar dy = 7;\nvar rightPressed = false;\nvar leftPressed = false;\nvar downPressed = false;\nvar upPressed = false;\nvar keyCodes = {\n    space: \"Space\",\n    right: \"ArrowRight\",\n    left: \"ArrowLeft\",\n    up: \"ArrowUp\",\n    down: \"ArrowDown\",\n};\nvar isJump = false;\nvar STAGE = [\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],\n    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],\n    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],\n    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n];\nvar blockRowCount = STAGE.length;\nvar blockColumnCount = STAGE[0].length;\nvar blockWidth = 30;\n//let y = h - blockWidth;\nvar y = h;\nvar x = ballRadius;\nvar keyDownHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = true;\n            break;\n        case keyCodes.left:\n            leftPressed = true;\n            break;\n        case keyCodes.down:\n            downPressed = true;\n            break;\n        case keyCodes.up:\n            upPressed = true;\n            break;\n        case keyCodes.space:\n            upPressed = true;\n            break;\n        default:\n            break;\n    }\n};\nvar keyUpHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = false;\n            break;\n        case keyCodes.left:\n            leftPressed = false;\n            break;\n        case keyCodes.down:\n            downPressed = false;\n            break;\n        case keyCodes.up:\n            upPressed = false;\n            break;\n        case keyCodes.space:\n            upPressed = false;\n            break;\n        default:\n            break;\n    }\n};\nvar drawBall = function () {\n    ctx.beginPath();\n    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);\n    ctx.fillStyle = \"#0095DD\";\n    ctx.fill();\n    ctx.closePath();\n};\nvar drawBlock = function () {\n    for (var c = 0; c < blockColumnCount; c++) {\n        for (var r = 0; r < blockRowCount; r++) {\n            if (STAGE[r][c] === 1) {\n                var blockX = c * blockWidth;\n                var blockY = r * blockWidth;\n                ctx.beginPath();\n                ctx.rect(blockX, blockY, blockWidth, blockWidth);\n                ctx.fillStyle = \"#8B4513\";\n                ctx.fill();\n                ctx.closePath();\n            }\n        }\n    }\n};\nvar draw = function () {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    drawBall();\n    //drawBlock();\n    if (y < ballRadius) {\n        y = ballRadius;\n    }\n    if (h < y) {\n        y = h;\n        isJump = false;\n    }\n    if (w < x + dx) {\n        x = w;\n    }\n    if (x - dx < 0) {\n        x = ballRadius;\n    }\n    if (rightPressed && x + dx <= w) {\n        x += dx;\n    }\n    if (leftPressed && x - dx >= ballRadius) {\n        x -= dx;\n    }\n    if (upPressed && !isJump && (ballRadius < y)) {\n        t = 0;\n        isJump = true;\n    }\n    if (isJump) {\n        y = 1 / 2 * g * (t * t) - (dy * t) + (h - blockWidth);\n    }\n    t += dt;\n    requestAnimationFrame(draw);\n};\naddEventListener('keydown', keyDownHandler, false);\naddEventListener('keyup', keyUpHandler, false);\ndraw();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });