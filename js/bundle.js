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
	
	var _grid = __webpack_require__(/*! ./grid.jsx */ 4);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _options = __webpack_require__(/*! ./options.js */ 3);
	
	var _options2 = _interopRequireDefault(_options);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var debug = _options2.default.debug && _options2.default.ignore_debug.game !== true;
	
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
	
	    //this.grid_size = [15, 9];
	    this.grid_size = [3, 3];
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
	  }, {
	    key: 'checkForMatch',
	    value: function checkForMatch(firstEl, secondEl) {
	      var _arguments = arguments,
	          _this2 = this;
	
	      if (debug) console.log('checkForMatch called', arguments, this);
	      //this.getYAxisScore(startEl);
	
	      var getScore = function getScore(funcName, startEl, matchArr, lastEl) {
	        if (debug) console.log('getScore called', _arguments, _this2);
	        matchArr = matchArr || [startEl];
	        lastEl = lastEl || startEl;
	
	        var nextPos = _this2.grid[funcName](lastEl.gridPos);
	
	        if (debug) console.log('getScore nextPos', nextPos, nextPos === null);
	
	        if (nextPos === null) {
	          return matchArr;
	        }
	
	        var nextEl = _this2.grid.getElementAt(nextPos);
	
	        if (lastEl.gem.isMatch(nextEl.gem)) {
	          matchArr.push(nextEl);
	          getScore(funcName, startEl, matchArr, nextEl);
	        }
	
	        return matchArr;
	      };
	
	      Object.keys(arguments).map(function (key, idx) {
	        var xMatches = getScore('left', _arguments[key]),
	            yMatches = getScore('up', _arguments[key]);
	
	        getScore('right', _arguments[key], xMatches);
	        getScore('down', _arguments[key], yMatches);
	
	        if (yMatches.length + xMatches.length > 2) {
	          if (debug) console.log('matches found', xMatches, yMatches);
	
	          if (xMatches.length > 3) {
	            //TODO something
	          }
	
	          if (yMatches.length > 3) {
	            //TODO something
	          }
	        } else {
	          if (debug) console.log('no matches found', _arguments, _this2);
	        }
	      });
	    }
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
	
	var _options = __webpack_require__(/*! ./options.js */ 3);
	
	var _options2 = _interopRequireDefault(_options);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var debug = _options2.default.debug && _options2.default.ignore_debug.gem !== true;
	
	var gem_prefixs = ['yellow', 'blue', 'green', 'red', 'purple', 'pink'];
	
	var gem_size = {
	  w: 55,
	  h: 82,
	  m: 5
	};
	
	var Gem = function () {
	  _createClass(Gem, [{
	    key: 'gemType',
	    get: function get() {
	      return this._gemType;
	    },
	    set: function set(a) {
	      return;
	    }
	  }, {
	    key: 'clickCallback',
	    set: function set(clickCallback) {
	      this._clickCallback = clickCallback;
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
	
	  function Gem(xPos, yPos, clickCallback) {
	    _classCallCheck(this, Gem);
	
	    this._clickCallback = clickCallback;
	    this._gemType = _game2.default.instance.phaser.rnd.integerInRange(0, gem_prefixs.length - 1);
	    this.name = gem_prefixs[this.gemType] + '_gem_1';
	    this.sprite = _game2.default.instance.phaser.add.sprite(xPos, yPos, 'gems', this.name);
	
	    this.sprite.inputEnabled = true;
	    this.sprite.events.onInputDown.add(this.onClick, this);
	  }
	
	  _createClass(Gem, [{
	    key: 'isMatch',
	    value: function isMatch(otherGem) {
	      return this.gemType === otherGem.gemType;
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(sprite, ptr) {
	      if (debug) console.log('onClick called', arguments, this);
	
	      this._clickCallback.apply(this, arguments);
	    }
	  }, {
	    key: 'reposition',
	    value: function reposition(x, y) {
	      if (debug) console.log('reposition called', arguments, this);
	
	      this.sprite.x = x;
	      this.sprite.y = y;
	    }
	  }]);
	
	  return Gem;
	}();
	
	exports.default = Gem;

/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./js/options.js ***!
  \***********************/
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Object.freeze({
	  debug: true,
	  ignore_debug: {
	    gem: true,
	    game: false
	  }
	});

/***/ }),
/* 4 */
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
	
	var _game = __webpack_require__(/*! ./game.jsx */ 1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _options = __webpack_require__(/*! ./options.js */ 3);
	
	var _options2 = _interopRequireDefault(_options);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var debug = _options2.default.debug;
	
	/*
	  Grid position is going from top to bottom and left to right
	  ie a 2x2 grid would have the positions like so
	  -----
	  |1|3|
	  |2|4|
	  ----
	*/
	
	var GridElement = function () {
	  _createClass(GridElement, [{
	    key: 'gridPos',
	    get: function get() {
	      return this._gridPos;
	    },
	    set: function set(v) {
	      return;
	    } //dont want this settable externally
	
	  }, {
	    key: 'gem',
	    get: function get() {
	      return this._gem;
	    },
	    set: function set(newGem) {
	      this._gem = newGem;
	      this._gem.reposition(this.xPos, this.yPos);
	      this._gem.clickCallback = this.onGemClick.bind(this);
	    }
	  }]);
	
	  function GridElement(xPos, yPos, gridPos, gridClickCallback) {
	    _classCallCheck(this, GridElement);
	
	    this.xPos = xPos;
	    this.yPos = yPos;
	    this._gridPos = gridPos;
	    this.gridClickCallback = gridClickCallback;
	
	    this.gem = new _gem2.default(this.xPos, this.yPos, this.onGemClick.bind(this));
	  }
	
	  _createClass(GridElement, [{
	    key: 'onGemClick',
	    value: function onGemClick(sprite, ptr) {
	      if (debug) console.log('onGemClick called', arguments, this);
	      this.gridClickCallback.apply(this, Array.prototype.slice.call(arguments).concat([this]));
	    }
	  }, {
	    key: 'swapGems',
	    value: function swapGems(otherGridEl) {
	      var oldGem = this.gem;
	      this.gem = otherGridEl.gem;
	      otherGridEl.gem = oldGem;
	    }
	  }]);
	
	  return GridElement;
	}();
	
	var Grid = function () {
	  function Grid(x, y) {
	    var _this = this;
	
	    _classCallCheck(this, Grid);
	
	    this.currentSelected = null;
	    this.width = x;
	    this.height = y;
	
	    var i = 1;
	    this.grid = Array(x).fill().map(function (xVal, xIdx, xArr) {
	      return Array(y).fill().map(function (yVal, yIdx, yArr) {
	        var xPos = (xIdx + 1) * _gem2.default.width - _gem2.default.width,
	            yPos = (yIdx + 1) * _gem2.default.height - _gem2.default.height;
	
	        return new GridElement(xPos, yPos, i++, _this.onGridElementClick.bind(_this));
	      });
	    });
	  }
	
	  _createClass(Grid, [{
	    key: 'onGridElementClick',
	    value: function onGridElementClick(sprite, ptr, gridEl) {
	      if (debug) console.log('onGridElementClick called', arguments, this);
	
	      if (this.currentSelected === null) {
	        //selected an intial gem to move
	        if (debug) console.log('select');
	        this.currentSelected = gridEl;
	      } else if (this.currentSelected === gridEl) {
	        //deselected intial gem
	        if (debug) console.log('deselect');
	        this.currentSelected = null;
	      } else if (this.canSwap(this.currentSelected, gridEl)) {
	        if (debug) console.log('swap');
	        this.currentSelected.swapGems(gridEl);
	        _game2.default.instance.checkForMatch(this.currentSelected, gridEl);
	        this.currentSelected = null;
	      } else {
	        if (debug) console.log('illegal move');
	        this.currentSelected = null;
	      }
	    }
	  }, {
	    key: 'getElementAt',
	    value: function getElementAt(gridPos) {
	      if (debug) console.log('getElementAt called', arguments, this);
	
	      var xPos = this.getXIndex(gridPos),
	          yPos = this.getYindex(gridPos);
	
	      if (debug) console.log('getElementAt', xPos, yPos);
	
	      return this.grid[xPos][yPos];
	    }
	
	    /*
	    * Get the grid element position above the current position
	    * @return {number} the grid position of the element or null if at the bounds of the grid
	    */
	
	  }, {
	    key: 'up',
	    value: function up(currentPos) {
	      var retPos = currentPos - 1,
	          bounds = this.getBounds(currentPos);
	
	      if (bounds.top === currentPos) {
	        return null;
	      }
	
	      return retPos;
	    }
	
	    /*
	    * Get the grid element position below the current position
	    * @return {number} the grid position of the element or null if at the bounds of the grid
	    */
	
	  }, {
	    key: 'down',
	    value: function down(currentPos) {
	      var retPos = currentPos + 1,
	          bounds = this.getBounds(currentPos);
	
	      if (bounds.bottom === currentPos) {
	        return null;
	      }
	
	      return retPos;
	    }
	
	    /*
	    * Get the grid element position to the left the current position
	    * @return {number} the grid position of the element or null if at the bounds of the grid
	    */
	
	  }, {
	    key: 'left',
	    value: function left(currentPos) {
	      var retPos = currentPos - this.height,
	          bounds = this.getBounds(currentPos);
	
	      if (debug) console.log('left called', retPos, arguments, this);
	
	      if (bounds.left === currentPos) {
	        return null;
	      }
	
	      return retPos;
	    }
	
	    /*
	    * Get the grid element position to the right the current position
	    * @return {number} the grid position of the element or null if at the bounds of the grid
	    */
	
	  }, {
	    key: 'right',
	    value: function right(currentPos) {
	      var retPos = currentPos + this.height,
	          bounds = this.getBounds(currentPos);
	
	      if (debug) console.log('right called', retPos, arguments, this);
	
	      if (bounds.right === currentPos) {
	        return null;
	      }
	
	      return retPos;
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds(gridPos) {
	      var _this2 = this;
	
	      var currentX = this.getXIndex(gridPos),
	          currentY = this.getYindex(gridPos),
	          ret = { //FIXME this might be better breaking across lines as there is brackets and arrows everywhere :S
	        'top': gridPos - currentY,
	        'bottom': gridPos + (this.height - (currentY + 1)),
	        'left': function (pos) {
	          return pos <= 0 ? gridPos : pos;
	        }(gridPos - this.height),
	        'right': function (pos) {
	          return pos > _this2.width * _this2.height ? gridPos : pos;
	        }(gridPos + this.height)
	      };
	
	      if (debug) console.log('getBounds called', ret, arguments, this);
	
	      return ret;
	    }
	  }, {
	    key: 'getXIndex',
	    value: function getXIndex(gridPos) {
	      if (debug) console.log('getXIndex called', arguments, this);
	      return Math.ceil(gridPos / this.width) - 1;
	    }
	  }, {
	    key: 'getYindex',
	    value: function getYindex(gridPos) {
	      var _this3 = this;
	
	      if (debug) console.log('getYindex called', arguments, this);
	
	      return function (pos) {
	        return pos || _this3.height;
	      }(gridPos % this.height) - 1;
	    }
	  }, {
	    key: 'canSwap',
	    value: function canSwap(gridEl, otherGridEl) {
	      if (debug) console.log('onGridElementClick canSwap', arguments, this, gridEl.gridPos, otherGridEl.gridPos);
	
	      return gridEl.gridPos + this.height === otherGridEl.gridPos || gridEl.gridPos - this.height === otherGridEl.gridPos || gridEl.gridPos + 1 === otherGridEl.gridPos || gridEl.gridPos - 1 === otherGridEl.gridPos;
	    }
	  }]);
	
	  return Grid;
	}();
	
	exports.default = Grid;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map