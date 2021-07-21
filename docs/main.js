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

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\nvar image = __webpack_require__(/*! ./images/miku.png */ \"./src/images/miku.png\");\n//const image = require('./images/sMario.png');\nvar Direcion;\n(function (Direcion) {\n    Direcion[\"RIGHT\"] = \"right\";\n    Direcion[\"LEFT\"] = \"left\";\n})(Direcion || (Direcion = {}));\nvar MAX_FRAME_COUNT = 4;\nvar ONE_FRAME_WIDTH = 47;\nvar JUST_JUMP_TIME = 20; // ジャストジャンプの有効時間\nvar MAX_GRAVITY = 10; // 最大落下速度\nvar Player = /** @class */ (function () {\n    function Player(ctx, x, y) {\n        var _this = this;\n        this.img = new Image();\n        this.dx = 2;\n        this.dy = 2;\n        this.offsetX = ONE_FRAME_WIDTH;\n        this.currentFrame = 0;\n        this.isJump = false;\n        this.jumpCnt = 0;\n        this.direction = Direcion.RIGHT;\n        this.ctx = ctx;\n        this.img.src = image;\n        this.img.onload = function () {\n            _this.positionX = x;\n            _this.positionY = y - _this.img.height;\n            _this.groundPositionY = _this.positionY;\n        };\n    }\n    ;\n    Object.defineProperty(Player.prototype, \"height\", {\n        get: function () {\n            return this.img.height;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Player.prototype.draw = function () {\n        //console.log('player draw; ');\n        //console.log(this.positionY)\n        if (this.direction === Direcion.LEFT) {\n            this.ctx.save();\n            this.ctx.transform(-1, 0, 0, 1, 0, 0);\n            this.ctx.drawImage(this.img, this.offsetX, 0, ONE_FRAME_WIDTH, this.height, -this.positionX - this.height, this.positionY, this.height, this.height);\n            this.ctx.restore();\n        }\n        if (this.direction === Direcion.RIGHT) {\n            this.ctx.drawImage(this.img, this.offsetX, 0, ONE_FRAME_WIDTH, this.height, this.positionX, this.positionY, this.height, this.height);\n        }\n    };\n    Player.prototype.move = function (rightPressed, leftPressed, upPressed, downPressed) {\n        if (rightPressed) {\n            this.direction = Direcion.RIGHT;\n            this.positionX += this.dx;\n            this.makeFrameByFrame();\n        }\n        if (leftPressed) {\n            this.direction = Direcion.LEFT;\n            this.positionX -= this.dx;\n            this.makeFrameByFrame();\n        }\n        if (upPressed) {\n            console.log('↑↑↑↑↑↑↑↑ upPressed ↑↑↑↑↑↑↑↑↑');\n            if (!this.isJump) {\n                this.isJump = true;\n                this.dy = 16;\n            }\n            this.makeFrameByFrame();\n        }\n        if (this.isJump) {\n            this.positionY -= this.dy;\n            if (this.jumpCnt++ % 2 === 0) {\n                this.dy -= 2;\n                // タイマーセット\n                if (this.dy < -MAX_GRAVITY) {\n                    this.dy = -MAX_GRAVITY;\n                }\n                // 地面に着いた\n                if (this.positionY >= this.groundPositionY) {\n                    this.dy = 0;\n                    this.positionY = this.groundPositionY;\n                    this.isJump = false;\n                }\n            }\n            this.makeFrameByFrame();\n        }\n        if (downPressed) {\n            console.log('↓↓↓↓↓↓↓↓ upPressed ↓↓↓↓↓↓↓↓↓');\n        }\n    };\n    Player.prototype.makeFrameByFrame = function () {\n        if (this.currentFrame++ >= MAX_FRAME_COUNT) {\n            if (this.offsetX % ONE_FRAME_WIDTH === 0 && this.offsetX !== ONE_FRAME_WIDTH * 5) {\n                this.offsetX += ONE_FRAME_WIDTH;\n            }\n            else {\n                this.offsetX = 0;\n            }\n            this.currentFrame = 0;\n        }\n    };\n    return Player;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Player.ts?");

/***/ }),

/***/ "./src/images/miku.png":
/*!*****************************!*\
  !*** ./src/images/miku.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"abdfcf865bc7e89a1cb31668fb402773.png\";\n\n//# sourceURL=webpack:///./src/images/miku.png?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requestNextAnimationFrame */ \"./src/requestNextAnimationFrame.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n\n\nvar canvas = document.getElementById('app');\nvar ctx = canvas.getContext('2d');\nvar t = 0;\nvar dt = 1;\nvar g = 0.4;\nvar dx = 5;\nvar dy = 7;\nvar f = 1;\n// const STAGE = [\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],\n//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],\n//   [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],\n//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],\n//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],\n//   [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n// ];\nvar STAGE = [\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],\n    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],\n];\nvar blockRowCount = STAGE.length;\nvar blockColumnCount = STAGE[0].length;\nvar blockWidth = 30;\n//let y = h - blockWidth;\n// yには常に +1 下向きに力が加わっているので\n//const y0 = h - f\n///let y = y0 - blockWidth;\nvar rightPressed = false;\nvar leftPressed = false;\nvar downPressed = false;\nvar upPressed = false;\nvar keyCodes = {\n    space: \"Space\",\n    right: \"ArrowRight\",\n    left: \"ArrowLeft\",\n    up: \"ArrowUp\",\n    down: \"ArrowDown\",\n};\nvar isJump = false;\nvar keyDownHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = true;\n            break;\n        case keyCodes.left:\n            leftPressed = true;\n            break;\n        case keyCodes.down:\n            downPressed = true;\n            break;\n        case keyCodes.up:\n            upPressed = true;\n            break;\n        case keyCodes.space:\n            upPressed = true;\n            break;\n        default:\n            break;\n    }\n};\nvar keyUpHandler = function (e) {\n    var pressed = e.code;\n    switch (pressed) {\n        case keyCodes.right:\n            rightPressed = false;\n            break;\n        case keyCodes.left:\n            leftPressed = false;\n            break;\n        case keyCodes.down:\n            downPressed = false;\n            break;\n        case keyCodes.up:\n            upPressed = false;\n            break;\n        case keyCodes.space:\n            upPressed = false;\n            break;\n        default:\n            break;\n    }\n};\naddEventListener('keydown', keyDownHandler, false);\naddEventListener('keyup', keyUpHandler, false);\n// const drawBall = () => {\n//   ctx.beginPath();\n//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);\n//   ctx.fillStyle = \"#0095DDbb\";\n//   ctx.fill();\n//   ctx.closePath();\n// }\n// const drawBlock = () => {\n//   for (let c = 0; c < blockColumnCount; c++) {\n//     for (let r = 0; r < blockRowCount; r++) {\n//       const blockX = c * blockWidth;\n//       const blockY = r * blockWidth;\n//       // FOR DBUG\n//       ctx.beginPath();\n//       ctx.rect(blockX, blockY, blockWidth, blockWidth)\n//       //ctx.fillStyle = \"#8B4513\";\n//       ctx.strokeStyle = \"blue\";\n//       //ctx.fill();\n//       ctx.stroke();\n//       ctx.closePath();\n//       if (STAGE[r][c] === 1) {\n//         // const blockX = c * blockWidth;\n//         // const blockY = r * blockWidth;\n//         ctx.beginPath();\n//         ctx.rect(blockX, blockY, blockWidth, blockWidth)\n//         ctx.fillStyle = \"rgba(55, 27, 7, 0.5)\";\n//         //ctx.strokeStyle = \"black\";\n//         ctx.fill();\n//         //ctx.stroke();\n//         ctx.closePath();\n//       }\n//     }\n//   }\n// }\n// const getPositionFloor = (x: number, y: number): number => {\n//   if (0 > y) return;\n//   // const posX = Math.round(x / blockWidth);\n//   // const posY = Math.round(y / blockWidth);\n//   const posX = Math.floor(x / blockWidth);\n//   const tempY = Math.floor(y / blockWidth);\n//   const posY = tempY >= 10 ? 10 : tempY;\n//   /* FOR DEBUG\n//   ctx.beginPath();\n//   ctx.rect(posX * blockWidth, posY * blockWidth, blockWidth, blockWidth)\n//   ctx.fillStyle = \"red\";\n//   //ctx.strokeStyle = \"#8B4513\";\n//   ctx.fill();\n//   */\n//   //console.log(posX, posY);\n//   //console.log(`STAGE_0[${posY}][${posX}]`);\n//   return STAGE[posY][posX];\n// }\n// const isCollision = (x: number, y: number): boolean => {\n//   //console.log(getPositionFloor(x, y) === 1)\n//   return getPositionFloor(x, y) === 1;\n// }\n/*\nconst draw = () => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  drawBall();\n  drawBlock();\n\n  f = 1;\n\n  if (rightPressed && x + dx <= w) {\n    const nextX = x + dx + ballRadius - 1; // 1 は調整用の数値\n    if (!isCollision(nextX, y)) {\n      x += dx;\n    }\n  }\n\n  if (leftPressed && x - dx >= ballRadius) {\n    const nextX = x - dx - ballRadius;\n    if (!isCollision(nextX, y)) {\n      x -= dx;\n    }\n  }\n\n  if (upPressed && (ballRadius < y) && !isJump) {\n    isJump = true;\n    f = -10;\n  }\n\n  const tempY = y;\n  const tempNextY = y + (y - prevY) + f;\n  const nextY = isJump ? tempNextY : tempNextY + ballRadius;\n  if (isCollision(x, nextY)) {\n    y = prevY;\n    isJump = false;\n    f = 0;\n  } else {\n    y += (y - prevY) + f;\n    prevY = tempY;\n  }\n\n  if (h <= y + f) {\n    y = h;\n    isJump = false;\n  }\n\n  if (y < ballRadius) {\n    y = ballRadius;\n  }\n\n  if (w < x + dx) {\n    x = w;\n  }\n\n  if (x - dx < 0) {\n    x = ballRadius;\n  }\n\n\n  //requestAnimationFrame(draw);\n}\n*/\nvar fps;\nvar ballRadius = 15;\nvar y0 = canvas.height;\nvar x0 = 0;\nvar prevY = 0;\nvar player = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"Player\"](ctx, x0, y0);\n//ctx.fillStyle = 'rgb(0,0,0)';\n//ctx.fillRect(0, 0, canvas.width, canvas.height);\nvar animate = function (now) {\n    fps = Object(_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__[\"calculateFps\"])(now);\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    player.draw();\n    player.move(rightPressed, leftPressed, upPressed, downPressed);\n    //console.log('right pressed', rightPressed)\n    // console.log('left pressed', leftPressed)\n    //console.log(player.direction);\n    Object(_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__[\"requestNextAnimationFrame\"])(animate);\n    //requestAnimationFrame(animate);\n};\nObject(_requestNextAnimationFrame__WEBPACK_IMPORTED_MODULE_0__[\"requestNextAnimationFrame\"])(animate);\n//animate(fps);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/requestNextAnimationFrame.ts":
/*!******************************************!*\
  !*** ./src/requestNextAnimationFrame.ts ***!
  \******************************************/
/*! exports provided: calculateFps, requestNextAnimationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateFps\", function() { return calculateFps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestNextAnimationFrame\", function() { return requestNextAnimationFrame; });\nvar lastAnimationFrameTime = 0;\nvar lastFpsUpdateTime = 0;\nvar fpsElement = document.getElementById('fps');\nvar calculateFps = function (now) {\n    var fps = 1000 / (now - lastAnimationFrameTime);\n    lastAnimationFrameTime = now;\n    if (now - lastFpsUpdateTime > 1000) {\n        lastFpsUpdateTime = now;\n        fpsElement.innerHTML = fps.toFixed(0) + ' fps';\n    }\n    return fps;\n};\nvar requestNextAnimationFrame = (function () {\n    var originalWebkitMethod;\n    var wrapper;\n    var geckoVersion;\n    var userAgent = navigator.userAgent;\n    var index = 0;\n    var self = this;\n    if (window.webkitRequestAnimationFrame) {\n        wrapper = function (time) {\n            if (time === undefined) {\n                time = +new Date();\n            }\n            ;\n            self.callback(time);\n        };\n        originalWebkitMethod = window.webkitRequestAnimationFrame;\n        window.webkitRequestAnimationFrame = function (callback, element) {\n            ;\n            self.callback = callback;\n            originalWebkitMethod.call(null, wrapper, element);\n        };\n    }\n    if (window.mozRequestAnimationFrame) {\n        index = userAgent.indexOf('rv:');\n        if (userAgent.indexOf('Gecko') !== -1) {\n            geckoVersion = userAgent.substr(index + 3, 3);\n            if (geckoVersion === '2.0') {\n                ;\n                window.mozRequestAnimationFrame = undefined;\n            }\n        }\n    }\n    return (window.requestAnimationFrame ||\n        window.webkitRequestAnimationFrame ||\n        window.mozRequestAnimationFrame ||\n        window.oRequestAnimationFrame ||\n        window.msRequestAnimationFrame ||\n        function (callback) {\n            var start = 0;\n            var finish = 0;\n            window.setTimeout(function () {\n                start = +new Date();\n                callback(start);\n                finish = +new Date();\n                self.timeout = 1000 / 60 - (finish - start);\n            }, self.timeout);\n        });\n})();\n\n\n//# sourceURL=webpack:///./src/requestNextAnimationFrame.ts?");

/***/ })

/******/ });