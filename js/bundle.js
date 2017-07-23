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
	
	var _grid = __webpack_require__(/*! ./grid.jsx */ 3);
	
	var _grid2 = _interopRequireDefault(_grid);
	
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
	    this.grid = null;
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
	      this.grid = new _grid2.default(this.grid_size[0], this.grid_size[1]);
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
	  _createClass(Gem, [{
	    key: 'margin',
	    get: function get() {
	      return this.gemType;
	    }
	  }], [{
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
	
	  function Gem(xPos, yPos) {
	    _classCallCheck(this, Gem);
	
	    this.gemType = _game2.default.instance.phaser.rnd.integerInRange(0, gem_prefixs.length - 1);
	    this.name = gem_prefixs[this.gemType] + '_gem_1';
	    this.sprite = _game2.default.instance.phaser.add.sprite(xPos, yPos, 'gems', this.name);
	  }
	
	  _createClass(Gem, [{
	    key: 'isMatch',
	    value: function isMatch(otherGem) {
	      return this.gemType === otherGem.gemType;
	    }
	  }]);
	
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

/***/ }),
/* 3 */
/*!*********************!*\
  !*** ./js/grid.jsx ***!
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
	
	/*
	  Grid position is going from left to right and top to bottom
	  ie a 2x2 grid would have the positions like so
	  -----
	  |1|2|
	  |3|4|
	  ----
	*/
	
	var GridElement = function () {
	  function GridElement(xPos, yPos, gridPos) {
	    _classCallCheck(this, GridElement);
	
	    this.xPos = xPos;
	    this.yPos = yPos;
	    this.gridPos = gridPos;
	
	    this.gem = new _gem2.default(this.xPos, this.yPos);
	  }
	
	  _createClass(GridElement, [{
	    key: 'swap',
	    value: function swap(otherGridEl) {}
	  }]);
	
	  return GridElement;
	}();
	
	var Grid = function Grid(x, y) {
	  _classCallCheck(this, Grid);
	
	  this.width = x;
	  this.height = y;
	
	  var i = 1;
	  this.grid = Array(x).fill().map(function (xV, xI, xArr) {
	    return Array(y).fill().map(function (yV, yI, yArr) {
	      var xPos = (xI + 1) * _gem2.default.width - _gem2.default.width,
	          yPos = (yI + 1) * _gem2.default.height - _gem2.default.height;
	
	      return new GridElement(xPos, yPos, i++);
	    });
	  });
	
	  console.log(this, i);
	};
	
	exports.default = Grid;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map