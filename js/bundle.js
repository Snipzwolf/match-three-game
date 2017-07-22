/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(/*! ./game.jsx */ 1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(document).ready(function () {
	  var game = new _game2.default();
	});

/***/ }),
/* 1 */
/*!*********************!*\
  !*** ./js/game.jsx ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gem = __webpack_require__(/*! ./gem.jsx */ 2);
	
	var _gem2 = _interopRequireDefault(_gem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.grid = [15, 9];
	
	    this.gem_prefixs = ['yellow', 'blue', 'green', 'red', 'purple', 'pink'];
	
	    this.gem_size = {
	      w: 55,
	      h: 82,
	      m: 5
	    };
	
	    this.game = new Phaser.Game(this.grid[0] * this.gem_size.w, this.grid[1] * this.gem_size.h, Phaser.AUTO, 'game-canvas', { preload: this.preload, create: this.create, update: this.update, enableDebug: false });
	  }
	
	  _createClass(Game, [{
	    key: 'preload',
	    value: function preload() {
	      this.game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      var x = 1,
	          y;
	      do {
	        y = 1;
	        do {
	          var xPos = x * gem_size.w - gem_size.w,
	              yPos = y * gem_size.h - gem_size.h,
	              gemName = gem_prefixs[game.rnd.integerInRange(0, gem_prefixs.length - 1)] + '_gem_1',
	              gemSprite = game.add.sprite(xPos, yPos, 'gems', gemName);
	
	          //TODO use gem class
	
	          console.log({
	            x: x,
	            y: y,
	            xPos: xPos,
	            yPos: yPos,
	            gemName: gemName,
	            gemSprite: gemSprite
	          });
	        } while (y++ < grid[1]);
	      } while (x++ < grid[0]);
	    }
	  }, {
	    key: 'update',
	    value: function update() {}
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ }),
/* 2 */
/*!********************!*\
  !*** ./js/gem.jsx ***!
  \********************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gem = function gem(left, right, up, down) {
	  this.left = left;
	  this.right = right;
	  this.up = up;
	  this.down = down;
	
	  this.gemType = game.rnd.integerInRange(0, gem_prefixs.length - 1);
	  var name = gem_prefixs[gemIdx] + '_gem_1',
	      sprite = game.add.sprite(xPos, yPos, 'gems', gemName);
	
	  this.isMatch = function (gem) {
	    return this.gemType === gem.gemType;
	  };
	
	  this.hasMatch = function (direction) {
	    if (typeof direction !== 'undefined') {
	      return this.isMatch(this[direction]) ? this[direction].hasMatch(direction) + 1 : 0;
	    } else {
	      var matches = 0;
	      for (var next in ['up', 'down', 'left', 'right']) {
	        if (this.isMatch(this[next])) {
	          var currMatches = this[next].hasMatch(next);
	          if (currMatches > 3) {
	            matches += currMatches;
	          }
	        }
	      }
	
	      return matches;
	    }
	  };
	};
	
	exports.default = gem;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map