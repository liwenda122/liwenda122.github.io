webpackJsonp([95],{

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(236)

	/* script */
	__vue_exports__ = __webpack_require__(238)

	/* template */
	var __vue_template__ = __webpack_require__(241)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\settings\\handleMateriel\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-2ba5ca0e"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2ba5ca0e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2ba5ca0e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(237);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ba5ca0e&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ba5ca0e&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.checkType .el-col.paddingLeft[data-v-2ba5ca0e] {\n  padding-left: 10px;\n}\n", ""]);

	// exports


/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils, urls) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vuex = __webpack_require__(137);

	exports.default = {
		data: function data() {
			return {
				crumbs: [{ path: '/', name: '首页' }, { path: '/settings', name: '基础管理' }, { path: '/handleMateriel', name: '物料管理' }],
				pmsMaterialTypeVos: [],
				filter: '',
				pmsMaterialTypeId: '',
				materielData: []
			};
		},

		methods: {
			addMateriel: function addMateriel() {
				this.$router.push({
					path: '/settings/handleMateriel/add',
					query: {
						name: 'add'
					}
				});
			},

			/*导入*/
			template: function template() {
				this.$router.push({
					path: '/settings/handleMateriel/template'
				});
			},

			/*修改物料*/
			materielInfo: function materielInfo(materialId) {
				this.$router.push({
					path: '/settings/handleMateriel/add',
					query: {
						name: 'edit',
						materialId: materialId
					}
				});
			},

			/*分页回调*/
			handleSizeChange: function handleSizeChange(val) {
				console.log('\u6BCF\u9875 ' + val + ' \u6761');
			},
			handleCurrentChange: function handleCurrentChange(val) {
				console.log('\u5F53\u524D\u9875: ' + val);
			},

			/*删除物料*/
			deleteMaterial: function deleteMaterial(materialId) {
				var that = this;
				var requestData = { "materialId": materialId };
				this.$confirm('确认删除吗').then(function () {
					utils.post(urls.materialDelete, requestData, this).then(function (data) {
						if (data.code == 200) {
							that.$message({
								message: "删除成功",
								type: 'success'
							});
							that.refresh();
						}
					});
				}, function () {});
			},
			refresh: function refresh() {
				var requestData = {
					"pageNo": 1,
					"pageSize": 10,
					"filter": this.filter,
					"pmsMaterialTypeId": this.pmsMaterialTypeId
				};
				utils.post(urls.materialList, requestData, this).then(function (data) {
					if (data.code == 200) {
						this.materielData = data.result.pmsMaterialVos;
					}
				});
				utils.post(urls.materialUnitAndTypeList, null, this).then(function (data) {
					if (data.code == 200) {
						this.pmsMaterialTypeVos = data.result.pmsMaterialTypeVos;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(239), __webpack_require__(240)))

/***/ },

/***/ 239:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by zhaochengtao on 2016/12/14.
	 */
	module.exports = {
	    post: function post(url, params, _this) {
	        var http = _this.$http || this.$http;
	        var message = _this.$message || this.$message;
	        return http({
	            method: 'POST',
	            url: url,
	            body: { requestData: JSON.stringify(params) },
	            emulateJSON: true
	        }).then(function (res) {
	            return res.body;
	        }).then(function (data) {
	            if (data.code != 200) {
	                message({
	                    message: data.message,
	                    type: 'warning'
	                });
	            }
	            return data;
	        });
	    }
	};

/***/ },

/***/ 240:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by zhaochengtao on 2016/12/14.
	 */
	module.exports = {
	    materialAdd: '/pms/management/material/add.do',
	    materialDelete: '/pms/management/material/delete.do',
	    materialEdit: '/pms/management/material/edit.do',
	    materialShow: '/pms/management/material/show.do',
	    materialList: '/pms/management/material/list.do',
	    materialUnitAndTypeList: '/pms/management/materialUnitAndType/list.do'
	};

/***/ },

/***/ 241:
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
	      "label-width": "100px",
	      "inline": true
	    }
	  }, [_h('el-form-item', {
	    attrs: {
	      "label": "物料管理"
	    }
	  }, [_h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.pmsMaterialTypeId),
	      expression: "pmsMaterialTypeId"
	    }],
	    attrs: {
	      "placeholder": "物料类别"
	    },
	    domProps: {
	      "value": (_vm.pmsMaterialTypeId)
	    },
	    on: {
	      "input": function($event) {
	        _vm.pmsMaterialTypeId = $event
	      }
	    }
	  }, [_vm._l((_vm.pmsMaterialTypeVos), function(el) {
	    return _h('el-option', {
	      attrs: {
	        "label": el.materialTypeName,
	        "value": el.materialTypeId
	      }
	    })
	  })])]), " ", _h('el-form-item', [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.filter),
	      expression: "filter"
	    }],
	    attrs: {
	      "placeholder": "请输入物料名称/简拼"
	    },
	    domProps: {
	      "value": (_vm.filter)
	    },
	    on: {
	      "input": function($event) {
	        _vm.filter = $event
	      }
	    }
	  })]), " ", _h('el-form-item', [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.refresh
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
	      "click": _vm.addMateriel
	    }
	  }, ["新增物料"]), " ", _h('el-button', {
	    on: {
	      "click": _vm.template
	    }
	  }, ["导入"]), " ", _h('el-button', ["导出"])]), " ", _h('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.materielData,
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
	      "prop": "materialName",
	      "label": "物料名称",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialShortName",
	      "label": "物料简拼",
	      "min-width": "60"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "物料类别",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "进货单位",
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
	            },
	            on: {
	              "click": function($event) {
	                _vm.materielInfo(_vm.row.materialId)
	              }
	            }
	          }, ["修改"]), " ", _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.deleteMaterial(_vm.row.materialId)
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
	     require("vue-hot-reload-api").rerender("data-v-2ba5ca0e", module.exports)
	  }
	}

/***/ }

});