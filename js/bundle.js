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
	  var game = _game2.default.instance;
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
	  _createClass(Game, [{
	    key: 'phaser',
	    get: function get() {
	      return this.game;
	    }
	  }]);
	
	  function Game() {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.grid_size = [15, 9];
	    this.grid = [];
	    this.game = new Phaser.Game(this.grid_size[0] * _gem2.default.width, this.grid_size[1] * _gem2.default.height, Phaser.AUTO, 'game-canvas', {
	      preload: function preload() {
	        return _this.preload();
	      },
	      create: function create() {
	        return _this.create();
	      },
	      update: function update() {
	        return _this.update();
	      },
	      enableDebug: false
	    });
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
	          var xPos = x * _gem2.default.width - _gem2.default.width,
	              yPos = y * _gem2.default.height - _gem2.default.height,
	              gem = new _gem2.default(null, null, null, null, xPos, yPos);
	        } while (y++ < this.grid_size[1]);
	      } while (x++ < this.grid_size[0]);
	    }
	  }, {
	    key: 'update',
	    value: function update() {}
	  }]);
	
	  return Game;
	}();
	
	var instance = null;
	
	var GameSingleton = function () {
	  function GameSingleton() {
	    _classCallCheck(this, GameSingleton);
	  }
	
	  _createClass(GameSingleton, null, [{
	    key: 'instance',
	    get: function get() {
	      if (!instance) {
	        instance = new Game();
	      }
	
	      return instance;
	    }
	  }]);
	
	  return GameSingleton;
	}();
	
	exports.default = GameSingleton;

/***/ }),
/* 2 */
/*!********************!*\
  !*** ./js/gem.jsx ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(/*! ./game.jsx */ 1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var gem_prefixs = ['yellow', 'blue', 'green', 'red', 'purple', 'pink'];
	
	var gem_size = {
	  w: 55,
	  h: 82,
	  m: 5
	};
	
	var Gem = function () {
	  _createClass(Gem, null, [{
	    key: 'width',
	    get: function get() {
	      return gem_size.w;
	    }
	  }, {
	    key: 'height',
	    get: function get() {
	      return gem_size.h;
	    }
	  }, {
	    key: 'margin',
	    get: function get() {
	      return gem_size.m;
	    }
	  }]);
	
	  function Gem(left, right, up, down, xPos, yPos) {
	    _classCallCheck(this, Gem);
	
	    this.game = _game2.default.instance;
	    this.left = left;
	    this.right = right;
	    this.up = up;
	    this.down = down;
	
	    this.gemType = this.game.phaser.rnd.integerInRange(0, gem_prefixs.length - 1);
	    this.name = gem_prefixs[this.gemType] + '_gem_1';
	    this.sprite = this.game.phaser.add.sprite(xPos, yPos, 'gems', this.name);
	  }
	
	  return Gem;
	}();
	
	var gem = function gem(left, right, up, down) {
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
	
	exports.default = Gem;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map