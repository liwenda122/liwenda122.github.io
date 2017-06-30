webpackJsonp([87],{

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(206)

	/* script */
	__vue_exports__ = __webpack_require__(208)

	/* template */
	var __vue_template__ = __webpack_require__(209)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\checkout\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-9f2d3ee6"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9f2d3ee6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9f2d3ee6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(207);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9f2d3ee6&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9f2d3ee6&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.button-bar[data-v-9f2d3ee6] {\n  font-size: 14px;\n  color: #475669;\n}\n.button-bar .orange[data-v-9f2d3ee6] {\n  color: #ff6600;\n  padding-left: 3px;\n}\n", ""]);

	// exports


/***/ },

/***/ 208:
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
	//
	//

	exports.default = {
		data: function data() {
			var crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }];
			var formSearch = {
				date: [],
				status: '',
				purchaseno: ''
			};
			var tableData = [];
			var pmsSettlementAmountVo = {};
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
				pmsSettlementAmountVo: pmsSettlementAmountVo,
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
			onCreatePO: function onCreatePO() {
				this.$router.push({ path: '/purchase/create' });
			},
			handleView: function handleView(id) {
				this.$router.push({ name: 'checkoutView', params: { id: id } });
			},
			handleCheckout: function handleCheckout(id) {
				this.$router.push({ name: 'checkoutDetail', params: { id: id, role: "1" } });
			},

			/*分页回调*/
			handleSizeChange: function handleSizeChange(val) {
				console.log('\u6BCF\u9875 ' + val + ' \u6761');
				this.pageData.pageSize = val;
				this.fetchData();
			},
			handleCurrentChange: function handleCurrentChange(val) {
				console.log('\u5F53\u524D\u9875: ' + val);
				this.pageData.pageNo = val;
				this.fetchData();
			},

			/*表格过滤列回调*/
			filterStatus: function filterStatus(value, row) {
				return row.settlementStatus === value;
			},
			fetchData: function fetchData() {
				var _this = this;

				this.loading = true;
				var requestData = { "settlementStatus": this.formSearch.status, "filter": this.formSearch.purchaseno, "pageNo": this.pageData.pageNo, "pageSize": this.pageData.pageSize };
				requestData.startTime = this.formSearch.date.length > 0 && this.formSearch.date[0] ? (0, _moment2.default)(this.formSearch.date[0]).format('YYYY-MM-DD') : '';
				requestData.endTime = this.formSearch.date.length > 1 && this.formSearch.date[1] ? (0, _moment2.default)(this.formSearch.date[1]).format('YYYY-MM-DD') : '';
				this.$http({
					url: '/pms/settlement/order/list.do',
					method: 'POST',
					body: { requestData: JSON.stringify(requestData) },
					emulateJSON: true
				}).then(function (res) {
					return res.body;
				}).then(function (data) {
					if (data.code == 200) {
						_this.tableData = data.result.pmsSettlementVos;
						_this.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
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
			}
		},
		created: function created() {
			this.fetchData();
		},

		computed: (0, _vuex.mapState)({
			user: function user(state) {
				return state.user;
			}
		})
	};

/***/ },

/***/ 209:
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
	    staticClass: "search-bar"
	  }, [_h('el-form', {
	    staticClass: "demo-form-inline",
	    attrs: {
	      "inline": true,
	      "model": _vm.formSearch
	    }
	  }, [_h('el-form-item', [_h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.formSearch.status),
	      expression: "formSearch.status"
	    }],
	    attrs: {
	      "placeholder": "状态"
	    },
	    domProps: {
	      "value": (_vm.formSearch.status)
	    },
	    on: {
	      "input": function($event) {
	        _vm.formSearch.status = $event
	      }
	    }
	  }, [_h('el-option', {
	    attrs: {
	      "label": "未结清",
	      "value": "0"
	    }
	  }), " ", _h('el-option', {
	    attrs: {
	      "label": "已结清",
	      "value": "1"
	    }
	  })])]), " ", _h('el-form-item', [_h('el-date-picker', {
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
	  }, [_h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, ["总计金额：", _h('span', {
	    staticClass: "orange"
	  }, ["¥" + _vm._s(_vm.pmsSettlementAmountVo.totalPayment)])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, ["已付金额：", _h('span', {
	    staticClass: "orange"
	  }, ["¥" + _vm._s(_vm.pmsSettlementAmountVo.payment)])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, ["未付金额：", _h('span', {
	    staticClass: "orange"
	  }, ["¥" + _vm._s(_vm.pmsSettlementAmountVo.nonPayment)])])])]), " ", _h('el-table', {
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
	      "prop": "payment",
	      "label": "已付金额（元）",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm.row.payment)])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "sortable": "",
	      "prop": "nonPayment",
	      "label": "未付金额（元）",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm.row.nonPayment)])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "settlementStatus",
	      "label": "状态",
	      "min-width": "120",
	      "filters": [{
	        text: '未结清',
	        value: 0
	      }, {
	        text: '已结清',
	        value: 1
	      }],
	      "filter-method": _vm.filterStatus
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('el-tag', {
	            attrs: {
	              "type": _vm.row.settlementStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._s(_vm.row.settlementStatus == 0 ? '未结清' : '已结清')])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [(_vm.row.settlementStatus == 0) ? _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleCheckout(_vm.row.receiptId)
	              }
	            }
	          }, ["结算"]) : _vm._e(), " ", (_vm.row.settlementStatus == 1) ? _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleView(_vm.row.receiptId)
	              }
	            }
	          }, ["查看"]) : _vm._e()])
	        
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
	     require("vue-hot-reload-api").rerender("data-v-9f2d3ee6", module.exports)
	  }
	}

/***/ }

});