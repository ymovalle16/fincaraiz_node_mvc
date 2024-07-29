/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = document.querySelector('#lat').value || 4.8367424;  //se valida si el campo \"tiempo\", \"valores\", en caso contrario coloca latitud por defecto.\r\n    const lng = document.querySelector('#lng').value || -75.6808774;\r\n    const mapa = L.map('mapa').setView([lat, lng ], 13);\r\n    let marker;\r\n    \r\n    //Utilizar Provider y Geocoder\r\n    const geocodeService = L.esri.Geocoding.geocodeService();//permite obtener la direción de la clle\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n     //Pin para poder dar la ubicación y poder mover\r\n      marker = new L.marker([lat, lng], {\r\n        draggable: true,\r\n        autoPan: true  //mueve el pin y se mueve el mapa\r\n        })\r\n        .addTo(mapa)\r\n\r\n        //detectar moviemiento del Pin para leer latitud y longitud\r\n    marker.on('moveend', function(e){\r\n        marker = e.target\r\n        const posicion = marker.getLatLng();\r\n            mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)) //panTo-permite centrar la posición en el mapa\r\n    //obtener la información de las calles donde se suelte el Pin\r\n    geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado) {\r\n    //console.log(resultado)\r\n    marker.bindPopup(resultado.address.LongLabel) //imprime en el globo toda la información\r\n\r\n    //llenar los campos para luego almacenarlos en la BF.\r\n    document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\r\n    document.querySelector('#calle').value = resultado?.address?.Address ?? '';\r\n    document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\r\n    document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\r\n\r\n        })\r\n    })           \r\n\r\n})()\n\n//# sourceURL=webpack://afincaraiz/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;