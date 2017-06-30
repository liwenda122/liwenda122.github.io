webpackJsonp([61],{

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(245)

	/* script */
	__vue_exports__ = __webpack_require__(247)

	/* template */
	var __vue_template__ = __webpack_require__(248)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\checkout\\settle.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-3735aca0"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3735aca0", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3735aca0", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] settle.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(246);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3735aca0&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./settle.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3735aca0&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./settle.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.order-bar[data-v-3735aca0] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 14px 0;\n}\n.order-bar .right[data-v-3735aca0] {\n  font-size: 14px;\n}\n.payment-con[data-v-3735aca0] {\n  padding: 20px 0;\n  border-bottom: 1px solid #e5e5e5;\n  color: #475669;\n}\n.payment-con .orange[data-v-3735aca0] {\n  color: #ff6600;\n}\n.payment-con .el-form-item[data-v-3735aca0] {\n  margin-bottom: 0;\n}\n.payment-con .el-select[data-v-3735aca0] {\n  width: 110px;\n}\n.payment-con .right[data-v-3735aca0] {\n  text-align: right;\n}\n.submit-con[data-v-3735aca0] {\n  padding: 20px 0;\n  color: #475669;\n}\n.submit-con .right[data-v-3735aca0] {\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 247:
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

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail', name: '与供应商结算' }, { path: '/checkout/settle/', name: '结算' }];
	        var tableData = [];
	        var orderData = {};
	        var pmsSettlementAmountVo = {};
	        var pmsSupplierVo = {
	            "supplierAddress": "",
	            "supplierContact": "",
	            "supplierId": "",
	            "supplierMobile": "",
	            "supplierName": "",
	            "supplierUseStatus": 1
	        };
	        var pmsPurchaserVo = {
	            mobile: "",
	            purchaserId: "",
	            purchaserName: ""
	        };
	        var pmsSettlementTypeVos = [];
	        //验证用户输入值 将来考虑实现一个check.js库 如何复用?
	        var checkNumber = function checkNumber(rule, value, callback) {
	            if (value === '') {
	                return callback(new Error('实付金额不能为空'));
	            }
	            if (isNaN(value)) {
	                callback(new Error('请输入数字值'));
	            } else {
	                if (parseFloat(value) < 0) {
	                    callback(new Error('实付金额必须大于0'));
	                } else {
	                    callback();
	                }
	            }
	        };
	        return {
	            crumbs: crumbs,
	            tableData: tableData,
	            orderData: orderData,
	            pmsSettlementAmountVo: pmsSettlementAmountVo,
	            pmsSupplierVo: pmsSupplierVo,
	            pmsPurchaserVo: pmsPurchaserVo,
	            pmsSettlementTypeVos: pmsSettlementTypeVos,
	            loading: true,
	            receiptId: "",
	            role: "1",
	            userid: "",
	            paymentForm: {
	                amount: "",
	                payType: ""
	            },
	            rules: { //验证规则
	                amount: [{ validator: checkNumber, trigger: 'blur' }],
	                payType: [{ required: true, message: '必须选择支付方式', trigger: 'change' }]
	            }
	        };
	    },

	    methods: {
	        handleExport: function handleExport() {},
	        handlePrint: function handlePrint() {
	            this.$router.push({ name: 'checkoutViewMaterialPrint', params: { id: this.receiptId, role: this.role, userid: this.userid } });
	        },
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ name: 'checkoutDetail', params: { id: this.receiptId, role: this.role } });
	        },
	        handleSettle: function handleSettle() {
	            var _this = this;

	            this.$refs.paymentForm.validate(function (valid) {
	                if (valid) {
	                    var requestData = {
	                        "receiptId": _this.receiptId,
	                        "id": _this.userid,
	                        "settlementReceiver": _this.role,
	                        "payment": _this.paymentForm.amount,
	                        "settlementTypeId": _this.paymentForm.payType
	                    };
	                    //获取订单信息
	                    _this.$http({
	                        url: '/pms/settlement/detail/settle.do',
	                        method: 'POST',
	                        body: { requestData: JSON.stringify(requestData) },
	                        emulateJSON: true
	                    }).then(function (res) {
	                        return res.body;
	                    }).then(function (data) {
	                        if (data.code == 200) {
	                            _this.$message({
	                                message: '结算成功',
	                                type: 'success'
	                            });
	                            _this.handleBackToList();
	                        } else {
	                            _this.$message({
	                                message: data.message,
	                                type: 'warning'
	                            });
	                        }
	                    });
	                }
	            });
	        },
	        fetchData: function fetchData() {
	            var _this2 = this;

	            this.loading = true;
	            var requestData = { "receiptId": this.receiptId, "id": this.userid, "settlementReceiver": this.role };
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
	                    _this2.orderData = data.result;
	                } else {
	                    _this2.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	            //获取do结算页面列表信息
	            this.$http({
	                url: '/pms/settlement/detail/show.do',
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this2.tableData = data.result.pmsSettlementOrderDetailVos;
	                    if (data.result.pmsSupplierVo) {
	                        _this2.pmsSupplierVo = data.result.pmsSupplierVo;
	                    }
	                    if (data.result.pmsPurchaserVo) {
	                        _this2.pmsPurchaserVo = data.result.pmsPurchaserVo;
	                    }
	                    _this2.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
	                    if (data.result.pmsSettlementAmountVo && data.result.pmsSettlementAmountVo.payment && parseFloat(data.result.pmsSettlementAmountVo.payment) > 0) {
	                        _this2.paymentForm.amount = data.result.pmsSettlementAmountVo.payment;
	                    }
	                    _this2.pmsSettlementTypeVos = data.result.pmsSettlementTypeVos;
	                    if (_this2.role == 0) {
	                        _this2.paymentForm.payType = "1";
	                        _this2.pmsSettlementTypeVos = [{ settlementId: "1", settlementName: "现金" }];
	                    }
	                } else {
	                    _this2.tableData = [];
	                    _this2.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	                _this2.loading = false;
	            });
	        }
	    },
	    created: function created() {
	        this.receiptId = this.$route.params.id;
	        this.role = this.$route.params.role;
	        this.userid = this.$route.params.userid;
	        if (this.role == 1) {
	            this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail/' + this.receiptId + '/role/1', name: '与供应商结算' }, { path: '/checkout/settle/' + this.receiptId + '/role/1/user/' + this.userid, name: '结算' }];
	        } else {
	            this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail/' + this.receiptId + '/role/0', name: '与采购员结算' }, { path: '/checkout/settle/' + this.receiptId + '/role/0/user/' + this.userid, name: '结算' }];
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

/***/ 248:
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
	  }, ["采购单号：" + _vm._s(_vm.orderData.purchaseNo)]), " ", (_vm.role == 0) ? _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["采购员：" + _vm._s(_vm.pmsPurchaserVo.purchaserName)]) : _vm._e(), " ", (_vm.role == 1) ? _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["供应商：" + _vm._s(_vm.pmsSupplierVo.supplierName)]) : _vm._e()]), " ", _h('el-row', [(_vm.role == 1) ? _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["联系人：" + _vm._s(_vm.pmsSupplierVo.supplierContact)]) : _vm._e(), " ", (_vm.role == 0) ? _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["联系电话：" + _vm._s(_vm.pmsPurchaserVo.mobile)]) : _vm._e(), " ", (_vm.role == 1) ? _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["联系电话：" + _vm._s(_vm.pmsSupplierVo.supplierMobile)]) : _vm._e()]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["备注：" + _vm._s(_vm.orderData.remark)])])])])])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    attrs: {
	      "disabled": true
	    },
	    on: {
	      "click": _vm.handleExport
	    }
	  }, ["导出"]), " "]), " ", _h('el-table', {
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
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialName",
	      "label": "物料名称",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "类别",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "receivedCount",
	      "label": "收货数量",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchasePrice",
	      "label": "单价（元）",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm.row.purchasePrice)])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "单位",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "totalPayment",
	      "label": "合计金额（元）",
	      "min-width": "140"
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
	      "prop": "payStatus",
	      "label": "是否付款",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('el-tag', {
	            attrs: {
	              "type": _vm.row.payStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._s(_vm.row.payStatus == 0 ? '否' : '是')])
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('div', {
	    staticClass: "payment-con"
	  }, [_h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "space-between"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t总计：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.totalPayment)]), "元\n\t\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t已付：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.payment)]), "元\n\t\t\t\t\t\t\t\t"])])]), " ", _h('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t需付：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.nonPayment)]), "元\n\t\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t数量：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.purchaseCount)]), "项\n\t\t\t\t\t\t\t\t"])])])]), " ", _h('el-col', {
	    staticClass: "right",
	    attrs: {
	      "span": 12
	    }
	  }, [_h('el-form', {
	    ref: "paymentForm",
	    attrs: {
	      "inline": true,
	      "model": _vm.paymentForm,
	      "rules": _vm.rules
	    }
	  }, [_h('el-form-item', {
	    attrs: {
	      "label": "实付金额",
	      "prop": "amount",
	      "label-width": "80px"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model.number",
	      value: (_vm.paymentForm.amount),
	      expression: "paymentForm.amount",
	      modifiers: {
	        "number": true
	      }
	    }],
	    attrs: {
	      "placeholder": "实付金额"
	    },
	    domProps: {
	      "value": (_vm.paymentForm.amount)
	    },
	    on: {
	      "input": function($event) {
	        _vm.paymentForm.amount = _vm._n($event)
	      }
	    }
	  })]), " ", _h('el-form-item', {
	    attrs: {
	      "prop": "payType"
	    }
	  }, [_h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.paymentForm.payType),
	      expression: "paymentForm.payType"
	    }],
	    attrs: {
	      "placeholder": "支付方式",
	      "disabled": _vm.role == 0
	    },
	    domProps: {
	      "value": (_vm.paymentForm.payType)
	    },
	    on: {
	      "input": function($event) {
	        _vm.paymentForm.payType = $event
	      }
	    }
	  }, [_vm._l((_vm.pmsSettlementTypeVos), function(item) {
	    return _h('el-option', {
	      attrs: {
	        "label": item.settlementName,
	        "value": item.settlementId
	      }
	    })
	  })])])])])])]), " ", _h('div', {
	    staticClass: "submit-con"
	  }, [_h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "end"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["取消"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary",
	      "loading": _vm.user.lock
	    },
	    on: {
	      "click": _vm.handleSettle
	    }
	  }, ["完成结算"])])])])])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3735aca0", module.exports)
	  }
	}

/***/ }

});