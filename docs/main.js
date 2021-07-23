/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/images/base.jpg":
/*!*****************************!*\
  !*** ./src/images/base.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"878b72c6be43238c420cc7eb32bc44d3.jpg\";\n\n//# sourceURL=webpack://side-scroll-2/./src/images/base.jpg?");

/***/ }),

/***/ "./src/images/miku.png":
/*!*****************************!*\
  !*** ./src/images/miku.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"abdfcf865bc7e89a1cb31668fb402773.png\";\n\n//# sourceURL=webpack://side-scroll-2/./src/images/miku.png?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _images_miku_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/miku.png */ \"./src/images/miku.png\");\n/* harmony import */ var _images_miku_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_miku_png__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Direcion;\n(function (Direcion) {\n    Direcion[\"RIGHT\"] = \"right\";\n    Direcion[\"LEFT\"] = \"left\";\n})(Direcion || (Direcion = {}));\nvar MAX_FRAME_COUNT = 4;\nvar ONE_FRAME_WIDTH = 47;\nvar MAX_GRAVITY = 10;\nvar Player = /** @class */ (function () {\n    function Player(ctx, x, y) {\n        var _this = this;\n        this.img = new Image();\n        this.dx = 2;\n        this.dy = 2;\n        this.offsetX = ONE_FRAME_WIDTH;\n        this.currentFrame = 0;\n        this.isJump = false;\n        this.jumpCnt = 0;\n        this.direction = Direcion.RIGHT;\n        this.ctx = ctx;\n        this.img.src = (_images_miku_png__WEBPACK_IMPORTED_MODULE_0___default());\n        this.img.onload = function () {\n            _this.positionX = x;\n            _this.positionY = y - _this.img.height;\n            _this.groundPositionY = _this.positionY;\n        };\n    }\n    ;\n    Object.defineProperty(Player.prototype, \"height\", {\n        get: function () {\n            return this.img.height;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Player.prototype.draw = function () {\n        //console.log('player draw; ');\n        //console.log(this.positionY)\n        if (this.direction === Direcion.LEFT) {\n            this.ctx.save();\n            this.ctx.transform(-1, 0, 0, 1, 0, 0);\n            this.ctx.drawImage(this.img, this.offsetX, 0, ONE_FRAME_WIDTH, this.height, -this.positionX - this.height, this.positionY, this.height, this.height);\n            this.ctx.restore();\n        }\n        if (this.direction === Direcion.RIGHT) {\n            this.ctx.drawImage(this.img, this.offsetX, 0, ONE_FRAME_WIDTH, this.height, this.positionX, this.positionY, this.height, this.height);\n        }\n    };\n    Player.prototype.move = function (rightPressed, leftPressed, upPressed, downPressed) {\n        if (rightPressed) {\n            this.direction = Direcion.RIGHT;\n            this.positionX += this.dx;\n            this.makeFrameByFrame();\n        }\n        if (leftPressed) {\n            this.direction = Direcion.LEFT;\n            this.positionX -= this.dx;\n            this.makeFrameByFrame();\n        }\n        if (upPressed) {\n            console.log('↑↑↑↑↑↑↑↑ upPressed ↑↑↑↑↑↑↑↑↑');\n            if (!this.isJump) {\n                this.isJump = true;\n                this.dy = 16;\n            }\n            this.makeFrameByFrame();\n        }\n        if (this.isJump) {\n            this.positionY -= this.dy;\n            if (this.jumpCnt++ % 2 === 0) {\n                this.dy -= 2;\n                // タイマーセット\n                if (this.dy < -MAX_GRAVITY) {\n                    this.dy = -MAX_GRAVITY;\n                }\n                // 地面に着いた\n                if (this.positionY >= this.groundPositionY) {\n                    this.dy = 0;\n                    this.positionY = this.groundPositionY;\n                    this.isJump = false;\n                }\n            }\n            this.makeFrameByFrame();\n        }\n        if (downPressed) {\n            console.log('↓↓↓↓↓↓↓↓ upPressed ↓↓↓↓↓↓↓↓↓');\n        }\n    };\n    Player.prototype.makeFrameByFrame = function () {\n        if (this.currentFrame++ >= MAX_FRAME_COUNT) {\n            if (this.offsetX % ONE_FRAME_WIDTH === 0 && this.offsetX !== ONE_FRAME_WIDTH * 5) {\n                this.offsetX += ONE_FRAME_WIDTH;\n            }\n            else {\n                this.offsetX = 0;\n            }\n            this.currentFrame = 0;\n        }\n    };\n    return Player;\n}());\n\n\n\n//# sourceURL=webpack://side-scroll-2/./src/Player.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requestNextAnimationFrame */ \"./src/requestNextAnimationFrame.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _images_base_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/base.jpg */ \"./src/images/base.jpg\");\n/* harmony import */ var _images_base_jpg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_base_jpg__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar canvas = document.getElementById('app');\nvar ctx = canvas.getContext('2d');\n// const STAGE = [\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],\n//   [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],\n//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],\n//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],\n//   [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n// ];\nvar STAGE = [\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],\n    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],\n];\nvar rightPressed = false;\nvar leftPressed = false;\nvar downPressed = false;\nvar upPressed = false;\nvar keyCodes = {\n    space: \"Space\",\n    right: \"ArrowRight\",\n    left: \"ArrowLeft\",\n    up: \"ArrowUp\",\n    down: \"ArrowDown\",\n};\nvar keyDownHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = true;\n            break;\n        case keyCodes.left:\n            leftPressed = true;\n            break;\n        case keyCodes.down:\n            downPressed = true;\n            break;\n        case keyCodes.up:\n            upPressed = true;\n            break;\n        case keyCodes.space:\n            upPressed = true;\n            break;\n        default:\n            break;\n    }\n};\nvar keyUpHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = false;\n            break;\n        case keyCodes.left:\n            leftPressed = false;\n            break;\n        case keyCodes.down:\n            downPressed = false;\n            break;\n        case keyCodes.up:\n            upPressed = false;\n            break;\n        case keyCodes.space:\n            upPressed = false;\n            break;\n        default:\n            break;\n    }\n};\naddEventListener('keydown', keyDownHandler, false);\naddEventListener('keyup', keyUpHandler, false);\nvar fps;\nvar y0 = canvas.height;\nvar x0 = 0;\nvar player = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(ctx, x0, y0);\nvar animate = function (now) {\n    fps = (0,_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__.calculateFps)(now);\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    player.draw();\n    player.move(rightPressed, leftPressed, upPressed, downPressed);\n    var groundImage = new Image();\n    groundImage.src = (_images_base_jpg__WEBPACK_IMPORTED_MODULE_2___default());\n    ctx.drawImage(groundImage, 0, 300 + 32, 640, 32);\n    (0,_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__.requestNextAnimationFrame)(animate);\n};\n(0,_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__.requestNextAnimationFrame)(animate);\n\n\n//# sourceURL=webpack://side-scroll-2/./src/index.ts?");

/***/ }),

/***/ "./src/requestNextAnimationFrame.ts":
/*!******************************************!*\
  !*** ./src/requestNextAnimationFrame.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateFps\": () => (/* binding */ calculateFps),\n/* harmony export */   \"requestNextAnimationFrame\": () => (/* binding */ requestNextAnimationFrame)\n/* harmony export */ });\nvar lastAnimationFrameTime = 0;\nvar lastFpsUpdateTime = 0;\nvar fpsElement = document.getElementById('fps');\nvar calculateFps = function (now) {\n    var fps = 1000 / (now - lastAnimationFrameTime);\n    lastAnimationFrameTime = now;\n    if (now - lastFpsUpdateTime > 1000) {\n        lastFpsUpdateTime = now;\n        fpsElement.innerHTML = fps.toFixed(0) + ' fps';\n    }\n    return fps;\n};\nvar requestNextAnimationFrame = (function () {\n    var originalWebkitMethod;\n    var wrapper;\n    var geckoVersion;\n    var userAgent = navigator.userAgent;\n    var index = 0;\n    var self = this;\n    if (window.webkitRequestAnimationFrame) {\n        wrapper = function (time) {\n            if (time === undefined) {\n                time = +new Date();\n            }\n            ;\n            self.callback(time);\n        };\n        originalWebkitMethod = window.webkitRequestAnimationFrame;\n        window.webkitRequestAnimationFrame = function (callback, element) {\n            ;\n            self.callback = callback;\n            originalWebkitMethod.call(null, wrapper, element);\n        };\n    }\n    if (window.mozRequestAnimationFrame) {\n        index = userAgent.indexOf('rv:');\n        if (userAgent.indexOf('Gecko') !== -1) {\n            geckoVersion = userAgent.substr(index + 3, 3);\n            if (geckoVersion === '2.0') {\n                ;\n                window.mozRequestAnimationFrame = undefined;\n            }\n        }\n    }\n    return (window.requestAnimationFrame ||\n        window.webkitRequestAnimationFrame ||\n        window.mozRequestAnimationFrame ||\n        window.oRequestAnimationFrame ||\n        window.msRequestAnimationFrame ||\n        function (callback) {\n            var start = 0;\n            var finish = 0;\n            window.setTimeout(function () {\n                start = +new Date();\n                callback(start);\n                finish = +new Date();\n                self.timeout = 1000 / 60 - (finish - start);\n            }, self.timeout);\n        });\n})();\n\n\n//# sourceURL=webpack://side-scroll-2/./src/requestNextAnimationFrame.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;