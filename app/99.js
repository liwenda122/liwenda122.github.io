webpackJsonp([99],{

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(258)

	/* script */
	__vue_exports__ = __webpack_require__(260)

	/* template */
	var __vue_template__ = __webpack_require__(261)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\settings\\handleUser\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-4f681321"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4f681321", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4f681321", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(259);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f681321&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f681321&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(137);

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/settings', name: '基础管理' }, { path: '/handleUser', name: '员工管理' }];
	        return {
	            crumbs: crumbs,
	            userData: []
	        };
	    },

	    methods: {
	        addUser: function addUser() {},
	        onSubmit: function onSubmit() {},

	        /*分页回调*/
	        handleSizeChange: function handleSizeChange(val) {
	            console.log('\u6BCF\u9875 ' + val + ' \u6761');
	        },
	        handleCurrentChange: function handleCurrentChange(val) {
	            console.log('\u5F53\u524D\u9875: ' + val);
	        },

	        /*删除供应商*/
	        deleteUser: function deleteUser(userId) {
	            var that = this;
	            this.$confirm('确认删除吗').then(function () {
	                var requestData = { "userId": userId };
	                that.$http.get('/pms/management/material/delete.do', {
	                    params: { requestData: JSON.stringify(requestData) }
	                }).then(function (res) {
	                    return res.body;
	                }).then(function (data) {
	                    if (data.code == 200) {
	                        that.$message({
	                            message: "删除成功",
	                            type: 'success'
	                        });
	                        that.refresh();
	                    } else {
	                        that.$message({
	                            message: data.message,
	                            type: 'warning'
	                        });
	                    }
	                });
	            }, function () {});
	        },
	        refresh: function refresh() {
	            var requestData = { "filter": "", "pageNo": 1, "pageSize": 10 };
	            this.$http.get('/pms/management/material/list.do', {
	                params: { requestData: JSON.stringify(requestData) }
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    this.userData = data.result.pmsMaterialVos;
	                }
	            });
	        }
	    },
	    created: function created() {
	        this.refresh();
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', [_h('common-layout', {
	    attrs: {
	      "crumbs": _vm.crumbs
	    }
	  }, [_h('div', {
	    staticClass: "content",
	    slot: "content"
	  }, [_h('div', {
	    staticClass: "search-bar"
	  }, [_h('el-form', {
	    staticClass: "demo-form-inline",
	    attrs: {
	      "inline": true
	    }
	  }, [_h('el-form-item', [_h('el-input', {
	    attrs: {
	      "placeholder": "请输入姓名/账号/手机号"
	    }
	  })]), " ", _h('el-form-item', [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.onSubmit
	    }
	  }, ["查询"])])])]), " ", _h('div', {
	    staticClass: "table-content"
	  }, [_h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.addUser
	    }
	  }, ["添加"])]), " ", _h('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.userData,
	      "height": "440",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "prop": "no",
	      "label": "序号",
	      "width": "70"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "",
	      "label": "员工账号",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "",
	      "label": "员工姓名",
	      "min-width": "60"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "",
	      "label": "员工岗位",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "",
	      "label": "手机号码",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "80"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            }
	          }, ["编辑"]), " ", _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.deleteUser(_vm.row.userId)
	              }
	            }
	          }, ["删除"])])
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('div', {
	    staticClass: "pagination"
	  }, [_h('el-pagination', {
	    attrs: {
	      "current-page": 1,
	      "page-sizes": [10, 20, 30, 40],
	      "page-size": 10,
	      "layout": "total, sizes, prev, pager, next, jumper",
	      "total": 1200
	    },
	    on: {
	      "size-change": _vm.handleSizeChange,
	      "current-change": _vm.handleCurrentChange
	    }
	  })])])])]), " ", _h('router-view')])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4f681321", module.exports)
	  }
	}

/***/ }

});