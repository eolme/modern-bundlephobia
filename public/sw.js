/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/sw/index.ts":
/*!*************************!*\
  !*** ./src/sw/index.ts ***!
  \*************************/
/***/ (() => {

eval("self.addEventListener(\"install\",()=>{self.skipWaiting()});self.addEventListener(\"activate\",()=>{self.registration.unregister().then(()=>self.clients.matchAll()).then(clients=>clients.forEach(client=>client.navigate(client.url)))})\n\n//# sourceURL=webpack://bundlephobia/./src/sw/index.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__["./src/sw/index.ts"]();
/******/ 
