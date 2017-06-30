webpackJsonp([48],{

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(174)

	/* script */
	__vue_exports__ = __webpack_require__(176)

	/* template */
	var __vue_template__ = __webpack_require__(177)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\receives\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-35349e92"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-35349e92", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-35349e92", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(175);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-35349e92&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-35349e92&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.el-tabs[data-v-35349e92] {\n  display: block;\n}\n.search-bar[data-v-35349e92] {\n  padding-top: 0;\n}\n.search-bar .el-button[data-v-35349e92] {\n  float: left;\n}\n.search-bar .form-inline[data-v-35349e92] {\n  float: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vuex = __webpack_require__(137);

	var _moment = __webpack_require__(9);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	exports.default = {
		data: function data() {
			var crumbs = [{ path: '/', name: '首页' }, { path: '/receives', name: '收货单' }];
			var formSearch = {
				date: '',
				status: '',
				purchaseno: ''
			};
			var tableData = [];
			var pickerOptions = {
				shortcuts: [{
					text: '最近一周',
					onClick: function onClick(picker) {
						var end = new Date();
						var start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick: function onClick(picker) {
						var end = new Date();
						var start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick: function onClick(picker) {
						var end = new Date();
						var start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			};
			var pageData = {
				pageNo: 1,
				pageSize: 10,
				totalCount: 0,
				totalPage: 1
			};
			return {
				crumbs: crumbs,
				formSearch: formSearch,
				tableData: tableData,
				pickerOptions: pickerOptions,
				pageData: pageData,
				loading: true
			};
		},

		methods: {
			/*提交列表查询*/
			onSubmit: function onSubmit() {
				this.fetchData();
			},
			handleView: function handleView(id) {
				this.$router.push({ name: 'receivesView', params: { id: id, source: 1 } });
			},
			handleReceive: function handleReceive(id) {
				this.$router.push({ name: 'receivesPO', params: { id: id } });
			},

			/*分页回调*/
			handleSizeChange: function handleSizeChange(val) {
				this.pageData.pageSize = val;
				this.fetchData();
			},
			handleCurrentChange: function handleCurrentChange(val) {
				this.pageData.pageNo = val;
				this.fetchData();
			},

			/*表格过滤列回调*/
			filterStatus: function filterStatus(value, row) {
				return row.receiptStatus === value;
			},
			fetchData: function fetchData() {
				var _this = this;

				this.loading = true;
				var requestData = { "filter": this.formSearch.purchaseno, "pageNo": this.pageData.pageNo, "pageSize": this.pageData.pageSize };
				requestData.startTime = this.formSearch.date.length > 0 && this.formSearch.date[0] ? (0, _moment2.default)(this.formSearch.date[0]).format('YYYY-MM-DD') : '';
				requestData.endTime = this.formSearch.date.length > 1 && this.formSearch.date[1] ? (0, _moment2.default)(this.formSearch.date[1]).format('YYYY-MM-DD') : '';
				this.$http({
					url: '/pms/receipt/order/list.do',
					method: 'POST',
					body: { requestData: JSON.stringify(requestData) },
					emulateJSON: true
				}).then(function (res) {
					return res.body;
				}).then(function (data) {
					if (data.code == 200) {
						_this.tableData = data.result.pmsReceiptOrderVos;
						_this.pageData.pageNo = data.result.pageNo;
						_this.pageData.pageSize = data.result.pageSize;
						_this.pageData.totalCount = data.result.totalCount;
						_this.pageData.totalPage = data.result.totalPage;
					} else {
						_this.tableData = [];
						_this.$message({
							message: data.message,
							type: 'warning'
						});
					}
					_this.loading = false;
				});
			},

			/*TABS页面切换回调*/
			handleChangeTab: function handleChangeTab(tab, event) {
				if (tab.name == 2) {
					this.$router.push({ path: '/receives/direct' });
				}
			}
		},
		created: function created() {
			this.fetchData();
		},

		computed: (0, _vuex.mapState)({ user: function user(state) {
				return state.user;
			} })
	};

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('common-layout', {
	    attrs: {
	      "crumbs": _vm.crumbs
	    }
	  }, [_h('div', {
	    staticClass: "content",
	    slot: "content"
	  }, [_h('div', {
	    staticClass: "tabs-bar"
	  }, [_h('el-tabs', {
	    attrs: {
	      "type": "card",
	      "active-name": "1"
	    },
	    on: {
	      "tab-click": _vm.handleChangeTab
	    }
	  }, [_h('el-tab-pane', {
	    attrs: {
	      "label": "根据采购单收货",
	      "name": "1"
	    }
	  }), " ", _h('el-tab-pane', {
	    attrs: {
	      "label": "直接新增收货单",
	      "name": "2"
	    }
	  })])]), " ", _h('div', {
	    staticClass: "search-bar clearfix"
	  }, [_h('el-form', {
	    staticClass: "demo-form-inline",
	    attrs: {
	      "inline": true,
	      "model": _vm.formSearch
	    }
	  }, [_h('el-form-item', [_h('el-date-picker', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.formSearch.date),
	      expression: "formSearch.date"
	    }],
	    staticStyle: {
	      "width": "220px"
	    },
	    attrs: {
	      "type": "daterange",
	      "align": "right",
	      "placeholder": "选择日期范围",
	      "picker-options": _vm.pickerOptions
	    },
	    domProps: {
	      "value": (_vm.formSearch.date)
	    },
	    on: {
	      "input": function($event) {
	        _vm.formSearch.date = $event
	      }
	    }
	  })]), " ", _h('el-form-item', [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.formSearch.purchaseno),
	      expression: "formSearch.purchaseno"
	    }],
	    attrs: {
	      "placeholder": "请输入采购单号"
	    },
	    domProps: {
	      "value": (_vm.formSearch.purchaseno)
	    },
	    on: {
	      "input": function($event) {
	        _vm.formSearch.purchaseno = $event
	      }
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
	  }, [_h('el-table', {
	    directives: [{
	      name: "loading",
	      rawName: "v-loading",
	      value: (_vm.loading),
	      expression: "loading"
	    }],
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "element-loading-text": "玩命加载中",
	      "data": _vm.tableData,
	      "height": "440",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序号",
	      "width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "sortable": "",
	      "prop": "purchaseNo",
	      "label": "采购单号",
	      "min-width": "150"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "sortable": "",
	      "prop": "createTime",
	      "label": "开单日期",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm._f("moment")(_vm.row.createTime))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "createUserName",
	      "label": "开单人",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "sortable": "",
	      "prop": "receiveTime",
	      "label": "收货日期",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm._f("moment")(_vm.row.receiveTime))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "receiptStatus",
	      "label": "状态",
	      "min-width": "100",
	      "filters": [{
	        text: '未收货',
	        value: 0
	      }, {
	        text: '已收货',
	        value: 2
	      }, {
	        text: '已发货未收货',
	        value: 1
	      }],
	      "filter-method": _vm.filterStatus
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('el-tag', {
	            attrs: {
	              "type": _vm.row.receiptStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._s(_vm.row.receiptStatus == 0 ? '未收货' : _vm.row.status == 1 ? '已发货未收货' : '已收货')])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [(_vm.row.receiptStatus == 2) ? _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleView(_vm.row.receiptId)
	              }
	            }
	          }, ["查看"]) : _vm._e(), " ", (_vm.row.receiptStatus == 0 || _vm.row.receiptStatus == 1) ? _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleReceive(_vm.row.purchaseId)
	              }
	            }
	          }, ["收货"]) : _vm._e()])
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('div', {
	    staticClass: "pagination"
	  }, [_h('el-pagination', {
	    attrs: {
	      "current-page": _vm.pageData.pageNo,
	      "page-sizes": [10, 20, 30, 40],
	      "page-size": _vm.pageData.pageSize,
	      "layout": "total, sizes, prev, pager, next, jumper",
	      "total": _vm.pageData.totalCount
	    },
	    on: {
	      "size-change": _vm.handleSizeChange,
	      "current-change": _vm.handleCurrentChange
	    }
	  })])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-35349e92", module.exports)
	  }
	}

/***/ }

});