/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mooz"] = factory();
	else
		root["Mooz"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar wrapper_1 = __webpack_require__(/*! ./wrapper */ \"./src/wrapper.ts\");\nvar defaultOptions = {\n    bgColor: \"black\",\n    bgOpacity: 0,\n};\n/**\n * A class to create an instance of mooz and\n * do the image zooming and stuff\n */\nvar Mooz = /** @class */ (function () {\n    function Mooz(options) {\n        if (options === void 0) { options = defaultOptions; }\n        this._elements = [];\n        this.options = options;\n        this._handle_click_bound = this._handle_click.bind(this);\n        this._wrapper = new wrapper_1.default();\n    }\n    Mooz.prototype.listen = function (selector) {\n        var els = [];\n        if (typeof selector === \"string\") {\n            els = Array.from(document.querySelectorAll(selector));\n        }\n        else if (typeof selector === \"object\") {\n            if (selector instanceof HTMLElement)\n                els = [selector];\n            else if (selector instanceof Array || selector instanceof NodeList) {\n                for (var i = 0; i < selector.length; i++) {\n                    if (selector[i] instanceof HTMLElement)\n                        els.push(selector[i]);\n                }\n            }\n        }\n        this._elements = els;\n        for (var i = 0; i < els.length; i++) {\n            els[i].addEventListener(\"click\", this._handle_click_bound);\n        }\n    };\n    Mooz.prototype.destroy = function () {\n        for (var i = 0; i < this._elements.length; i++) {\n            this._elements[i].removeEventListener(\"click\", this._handle_click_bound);\n        }\n        this._elements = [];\n        // TODO: remove the wrapper\n    };\n    Mooz.prototype._handle_click = function (event) {\n        this._wrapper.attach(event.srcElement);\n    };\n    return Mooz;\n}());\nexports[\"default\"] = Mooz;\n\n\n//# sourceURL=webpack://Mooz/./src/index.ts?");

/***/ }),

/***/ "./src/styles.ts":
/*!***********************!*\
  !*** ./src/styles.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Styles = {\n    wrapper: {\n        \"position\": \"absolute\",\n        \"left\": \"0\",\n        \"top\": \"0\",\n        \"width\": \"100vw\",\n        \"height\": \"100vh\",\n        \"display\": \"flex\",\n        \"justify-content\": \"center\",\n        \"align-items\": \"center\",\n        \"flex-wrap\": \"wrap\",\n        \"background-color\": \"rgba(0, 0, 0, 0.3)\",\n        \"overflow\": \"hidden\"\n    },\n    get: function (key) {\n        if (Styles.hasOwnProperty(key) && key !== 'get') {\n            var res = \"\";\n            for (var prop in Styles[key]) {\n                res += prop + \":\" + Styles[key][prop] + \";\";\n            }\n            return res;\n        }\n        return \"\";\n    }\n};\nexports[\"default\"] = Styles;\n\n\n//# sourceURL=webpack://Mooz/./src/styles.ts?");

/***/ }),

/***/ "./src/wrapper.ts":
/*!************************!*\
  !*** ./src/wrapper.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar styles_1 = __webpack_require__(/*! ./styles */ \"./src/styles.ts\");\nvar Wrapper = /** @class */ (function () {\n    function Wrapper() {\n        this._element = this._createElement();\n        this._img = null;\n        this._dragging = false;\n        this._prev_pos = { x: 0, y: 0 };\n        this._img_pos = { x: 0, y: 0 };\n        this._img_scale = 1;\n        this._wheel_sens = 0.7;\n        this._max_zoom = 3;\n        this._min_zoom = 0.8;\n        this._handle_window_keydown_bound = this._handle_window_keydown.bind(this);\n    }\n    Wrapper.prototype.attach = function (element) {\n        var el = element.cloneNode(true);\n        this._element.appendChild(el);\n        this._img = el;\n        document.body.appendChild(this._element);\n        window.addEventListener('keydown', this._handle_window_keydown_bound);\n    };\n    Wrapper.prototype.deattach = function () {\n        while (this._element.firstChild)\n            this._element.removeChild(this._element.firstChild);\n        document.body.removeChild(this._element);\n        window.removeEventListener('keydown', this._handle_window_keydown_bound);\n    };\n    Wrapper.prototype._createElement = function () {\n        var div = document.createElement(\"div\");\n        div.classList.add(\"mooz-wrapper\");\n        div.setAttribute(\"style\", styles_1.default.get(\"wrapper\"));\n        div.addEventListener(\"mousedown\", this._handle_mousedown.bind(this));\n        div.addEventListener(\"mouseup\", this._handle_mouseup.bind(this));\n        div.addEventListener(\"mousemove\", this._handle_mousemove.bind(this));\n        div.addEventListener(\"mousewheel\", this._handle_mousewheel.bind(this));\n        return div;\n    };\n    Wrapper.prototype._handle_mousedown = function (event) {\n        event.preventDefault();\n        this._dragging = true;\n        this._prev_pos = {\n            x: event.clientX,\n            y: event.clientY,\n        };\n        this._img.style.cursor = \"grab\";\n    };\n    Wrapper.prototype._handle_mousemove = function (event) {\n        if (this._dragging) {\n            var dx = event.clientX - this._prev_pos.x;\n            var dy = event.clientY - this._prev_pos.y;\n            this._prev_pos = {\n                x: event.clientX,\n                y: event.clientY,\n            };\n            this._img_pos.x += dx;\n            this._img_pos.y += dy;\n            this._img.style.cursor = \"grabbing\";\n            this._apply_transform();\n        }\n    };\n    Wrapper.prototype._handle_mousewheel = function (event) {\n        event.preventDefault();\n        var value = -event.deltaY / 200 * this._wheel_sens;\n        this._img_scale += value;\n        this._img_scale = Math.min(this._img_scale, this._max_zoom);\n        this._img_scale = Math.max(this._img_scale, this._min_zoom);\n        this._apply_transform();\n    };\n    Wrapper.prototype._handle_mouseup = function (event) {\n        this._img.style.cursor = \"grab\";\n        if (event.target === this._element) {\n            // this.deattach();\n        }\n        this._dragging = false;\n    };\n    Wrapper.prototype._apply_transform = function () {\n        var _a = this._img_pos, x = _a.x, y = _a.y;\n        var scale = this._img_scale;\n        this._img.style.transform = \"translate(\".concat(x, \"px, \").concat(y, \"px) scale(\").concat(scale, \")\");\n    };\n    Wrapper.prototype._handle_window_keydown = function (event) {\n        if (event.keyCode === 27) {\n            this.deattach();\n        }\n    };\n    return Wrapper;\n}());\nexports[\"default\"] = Wrapper;\n\n\n//# sourceURL=webpack://Mooz/./src/wrapper.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});