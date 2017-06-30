webpackJsonp([126],{

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(375)

	/* script */
	__vue_exports__ = __webpack_require__(377)

	/* template */
	var __vue_template__ = __webpack_require__(378)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\checkout\\detail.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-15d47eb4"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-15d47eb4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-15d47eb4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] detail.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 375:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(376);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-15d47eb4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-15d47eb4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 376:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.order-bar[data-v-15d47eb4] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 14px 0;\n}\n.order-bar .right[data-v-15d47eb4] {\n  font-size: 14px;\n}\n.tabs-bar[data-v-15d47eb4] {\n  padding: 0;\n}\n.el-tabs[data-v-15d47eb4] {\n  display: block;\n}\n.button-bar[data-v-15d47eb4] {\n  border: none !important;\n  padding: 0 0 12px 0 !important;\n}\n.button-bar .form-filter[data-v-15d47eb4] {\n  float: right;\n}\n.button-bar .form-filter .el-form-item[data-v-15d47eb4] {\n  margin-bottom: 0;\n}\n.submit-con[data-v-15d47eb4] {\n  padding: 20px 0;\n  color: #475669;\n}\n.submit-con .orange[data-v-15d47eb4] {\n  color: #ff6600;\n}\n.submit-con .left[data-v-15d47eb4],\n.submit-con .middle[data-v-15d47eb4] {\n  line-height: 36px;\n  height: 36px;\n}\n.submit-con .middle[data-v-15d47eb4] {\n  text-align: center;\n}\n.submit-con .middle .tooltips[data-v-15d47eb4] {\n  padding-left: 10px;\n}\n.submit-con .right[data-v-15d47eb4] {\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 377:
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
									var crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与供应商结算' }];
									var formSearch = {
													status: ''
									};
									var tableData = [];
									var orderData = {};
									var pmsSettlementAmountVo = {};
									return {
													crumbs: crumbs,
													formSearch: formSearch,
													tableData: tableData,
													orderData: orderData,
													pmsSettlementAmountVo: pmsSettlementAmountVo,
													loading: true,
													receiptId: "",
													role: "1"
									};
					},

					methods: {
									/*提交列表查询*/
									onSubmit: function onSubmit() {
													this.fetchData();
									},

									/*TABS页面切换回调*/
									handleChangeTab: function handleChangeTab(tab, event) {
													if (tab.name == 1) {
																	this.$router.push({ name: 'checkoutDetail', params: { id: this.receiptId, role: "1" } });
													}
													if (tab.name == 0) {
																	this.$router.push({ name: 'checkoutDetail', params: { id: this.receiptId, role: "0" } });
													}
													this.receiptId = this.$route.params.id;
													this.role = this.$route.params.role;
													if (this.role == 1) {
																	this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与供应商结算' }];
													} else {
																	this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与采购员结算' }];
													}
													this.fetchData();
									},
									handleExport: function handleExport() {},
									handlePrint: function handlePrint() {
													this.$router.push({ name: 'checkoutPrint', params: { id: this.receiptId } });
									},
									handleView: function handleView(id) {
													this.$router.push({ name: 'checkoutViewMaterial', params: { id: id, role: this.role } });
									},
									handleCheckout: function handleCheckout(id) {
													this.$router.push({ name: 'doCheckout', params: { id: id, role: this.role } });
									},
									handleBackToList: function handleBackToList() {
													this.$router.push({ path: '/checkout' });
									},
									fetchData: function fetchData() {
													var _this = this;

													this.loading = true;
													var requestData = { "receiptId": this.receiptId, "settlementStatus": this.formSearch.status, "settlementReceiver": this.role };
													//获取订单信息
													this.$http({
																	url: '/pms/settlement/order/data.do',
																	method: 'POST',
																	body: { requestData: JSON.stringify(requestData) },
																	emulateJSON: true
													}).then(function (res) {
																	return res.body;
													}).then(function (data) {
																	if (data.code == 200) {
																					_this.orderData = data.result;
																	} else {
																					_this.tableData = [];
																					_this.$message({
																									message: data.message,
																									type: 'warning'
																					});
																	}
													});
													//获取列表信息
													this.$http({
																	url: '/pms/settlement/order/show.do',
																	method: 'POST',
																	body: { requestData: JSON.stringify(requestData) },
																	emulateJSON: true
													}).then(function (res) {
																	return res.body;
													}).then(function (data) {
																	if (data.code == 200) {
																					_this.tableData = data.result.pmsSettlementOrderVos;
																					_this.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
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
									this.receiptId = this.$route.params.id;
									this.role = this.$route.params.role;
									if (this.role == 1) {
													this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与供应商结算' }];
									} else {
													this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与采购员结算' }];
									}
									this.fetchData();
					},

					computed: (0, _vuex.mapState)({
									user: function user(state) {
													return state.user;
									}
					})
	};

/***/ },

/***/ 378:
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
	    staticClass: "table-content"
	  }, [_h('div', {
	    staticClass: "order-bar"
	  }, [_h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["结算"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 16
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["采购单号：" + _vm._s(_vm.orderData.purchaseNo)]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["开单人：" + _vm._s(_vm.orderData.purchaserName)]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["开单时间：" + _vm._s(_vm._f("moment")(_vm.orderData.purchaseTime))])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["收货人：" + _vm._s(_vm.orderData.receiverName)]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["收货时间：" + _vm._s(_vm.orderData.receivedTime)])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["备注：" + _vm._s(_vm.orderData.remark)])])])])])]), " ", _h('div', {
	    staticClass: "tabs-bar"
	  }, [_h('el-tabs', {
	    attrs: {
	      "type": "card",
	      "active-name": _vm.role
	    },
	    on: {
	      "tab-click": _vm.handleChangeTab
	    }
	  }, [_h('el-tab-pane', {
	    attrs: {
	      "label": "与供应商结算",
	      "name": "1"
	    }
	  }), " ", _h('el-tab-pane', {
	    attrs: {
	      "label": "与采购员结算",
	      "name": "0"
	    }
	  })])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    attrs: {
	      "disabled": true
	    },
	    on: {
	      "click": _vm.handleExport
	    }
	  }, ["导出"]), " ", _h('el-button', {
	    attrs: {
	      "disabled": true
	    },
	    on: {
	      "click": _vm.handlePrint
	    }
	  }, ["打印"]), " ", _h('el-form', {
	    staticClass: "form-filter",
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
	  })])]), " ", _h('el-form-item', [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.onSubmit
	    }
	  }, ["查询"])])])]), " ", _h('el-table', {
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
	      "height": "340",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序号",
	      "width": "100"
	    }
	  }), " ", (_vm.role == 1) ? _h('el-table-column', {
	    attrs: {
	      "prop": "name",
	      "label": "供应商名称",
	      "min-width": "120"
	    }
	  }) : _vm._e(), " ", (_vm.role == 0) ? _h('el-table-column', {
	    attrs: {
	      "prop": "name",
	      "label": "采购员姓名",
	      "min-width": "120"
	    }
	  }) : _vm._e(), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "采购项数",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "totalPayment",
	      "label": "合计金额（元）",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm.row.totalPayment)])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "payment",
	      "label": "实付金额（元）",
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
	      "prop": "settlementStatus",
	      "label": "状态",
	      "min-width": "120"
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
	      "min-width": "120"
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
	    staticClass: "submit-con"
	  }, [_h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "space-between"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t总计：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.totalPayment)]), "元\n\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t已付：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.payment)]), "元\n\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t未付：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.nonPayment)]), "元\n\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t数量：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.purchaseCount)]), "项\n\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["返回列表"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["完成结算"])])])])])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-15d47eb4", module.exports)
	  }
	}

/***/ }

});