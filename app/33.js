webpackJsonp([33],{

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(619)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(621),
	  /* template */
	  __webpack_require__(622),
	  /* scopeId */
	  "data-v-1b862d4e",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(620);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("7b269960", content, true);

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vuex = __webpack_require__(443);

	exports.default = {
	  data: function data() {
	    var crumbs = [{ path: '/', name: '首页' }, { path: '/settings', name: '基础管理' }];
	    return {
	      crumbs: crumbs
	    };
	  },

	  computed: (0, _vuex.mapState)({ user: function user(state) {
	      return state.user;
	    } })
	}; //
	//
	//
	//
	//
	//
	//
	//

/***/ }),

/***/ 622:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('common-layout', {
	    attrs: {
	      "crumbs": _vm.crumbs
	    }
	  }, [_c('div', {
	    staticClass: "content",
	    slot: "content"
	  })])
	},staticRenderFns: []}

/***/ })

});