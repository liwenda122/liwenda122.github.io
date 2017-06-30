webpackJsonp([21],{

/***/ 464:
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Created by zhaochengtao on 2016/12/14.
	 */
	module.exports = {
	    post: function post(url, params, _this) {
	        var http = _this.$http || this.$http;
	        var message = _this.$message || this.$message;
	        var requestData = params ? { requestData: JSON.stringify(params) } : null;
	        return http({
	            method: 'POST',
	            url: url,
	            body: requestData,
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
	    },
	    postJSON: function postJSON(url, params, _this) {
	        var http = _this.$http || this.$http;
	        var message = _this.$message || this.$message;
	        var requestData = params ? params : null;
	        return http({
	            method: 'POST',
	            url: url,
	            body: requestData,
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
	    },

	    /*
	    * {url} String 请求的报表导出URL
	    * {params} Object 请求参数
	    * */
	    export: function _export(url, params) {
	        var requestUrl = url;
	        for (var key in params) {
	            if (requestUrl.indexOf("?") == -1) {
	                requestUrl = requestUrl + '?' + key + '=' + params[key];
	            } else {
	                requestUrl = requestUrl + '&' + key + '=' + params[key];
	            }
	        }
	        window.location.href = requestUrl;
	    },
	    message: function message() {}
	};

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(559)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(561),
	  /* template */
	  __webpack_require__(562),
	  /* scopeId */
	  "data-v-d2a0af5e",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(560);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("2d4f52f2", content, true);

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".order-bar[data-v-d2a0af5e]{color:#99a9bf;font-size:18px;padding:14px 0}.order-bar .right[data-v-d2a0af5e]{font-size:14px}.payment-con[data-v-d2a0af5e]{padding:20px 0;border-bottom:1px solid #e5e5e5;color:#475669}.payment-con .orange[data-v-d2a0af5e]{color:#f60}.payment-con .el-form-item[data-v-d2a0af5e]{margin-bottom:0}.payment-con .el-select[data-v-d2a0af5e]{width:110px}.payment-con .right[data-v-d2a0af5e]{text-align:right}.payment-con .account-info[data-v-d2a0af5e]{font-size:14px}.payment-con .account-info .account-num[data-v-d2a0af5e]{padding-left:15px}.submit-con[data-v-d2a0af5e]{padding:20px 0;color:#475669}.submit-con .right[data-v-d2a0af5e]{text-align:right}", ""]);

	// exports


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(443);

	var _moment = __webpack_require__(307);

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
	            },
	            settlementAccountName: '', //户名
	            settlementAccountNumber: '' //户号
	        };
	    },

	    methods: {
	        handleExport: function handleExport() {
	            utils.export('/pms/settlement/order/detail/export.do', { id: this.userid, receiptId: this.receiptId, settlementReceiver: this.role });
	        },
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
	                    if (data.result.pmsSettlementAmountVo && data.result.pmsSettlementAmountVo.nonPayment && parseFloat(data.result.pmsSettlementAmountVo.nonPayment) > 0) {
	                        _this2.paymentForm.amount = data.result.pmsSettlementAmountVo.nonPayment;
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
	        },
	        handleChangePayType: function handleChangePayType(item) {
	            if (item && item != '') {
	                var index = this.pmsSettlementTypeVos.findIndex(function (el, index, arr) {
	                    return el.settlementId == item;
	                });
	                if (index != -1) {
	                    this.settlementAccountName = this.pmsSettlementTypeVos[index].settlementAccountName;
	                    this.settlementAccountNumber = this.pmsSettlementTypeVos[index].settlementAccountNumber;
	                }
	            }
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(464)))

/***/ }),

/***/ 562:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('common-layout', {
	    attrs: {
	      "crumbs": _vm.crumbs
	    }
	  }, [_c('div', {
	    staticClass: "content",
	    slot: "content"
	  }, [_c('div', {
	    staticClass: "table-content"
	  }, [_c('div', {
	    staticClass: "order-bar"
	  }, [_c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("结算")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 16
	    }
	  }, [_c('div', {
	    staticClass: "grid-content right"
	  }, [_c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 10
	    }
	  }, [_vm._v("采购单号：" + _vm._s(_vm.orderData.purchaseNo))]), _vm._v(" "), (_vm.role == 0) ? _c('el-col', {
	    attrs: {
	      "span": 6
	    }
	  }, [_vm._v("采购员：" + _vm._s(_vm.pmsPurchaserVo.purchaserName))]) : _vm._e(), _vm._v(" "), (_vm.role == 1) ? _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("供应商：" + _vm._s(_vm.pmsSupplierVo.supplierName))]) : _vm._e()], 1), _vm._v(" "), _c('el-row', [(_vm.role == 1) ? _c('el-col', {
	    attrs: {
	      "span": 10
	    }
	  }, [_vm._v("联系人：" + _vm._s(_vm.pmsSupplierVo.supplierContact))]) : _vm._e(), _vm._v(" "), (_vm.role == 0) ? _c('el-col', {
	    attrs: {
	      "span": 6
	    }
	  }, [_vm._v("联系电话：" + _vm._s(_vm.pmsPurchaserVo.mobile))]) : _vm._e(), _vm._v(" "), (_vm.role == 1) ? _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("联系电话：" + _vm._s(_vm.pmsSupplierVo.supplierMobile))]) : _vm._e()], 1), _vm._v(" "), _c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_vm._v("备注：" + _vm._s(_vm.orderData.remark))])], 1)], 1)])], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "button-bar"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.handleExport
	    }
	  }, [_vm._v("导出")])], 1), _vm._v(" "), _c('el-table', {
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
	      "height": "280",
	      "border": ""
	    }
	  }, [_c('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序号",
	      "width": "100"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "materialName",
	      "label": "物料名称",
	      "min-width": "120"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "类别",
	      "min-width": "100"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "receivedCount",
	      "label": "收货数量",
	      "min-width": "100"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "purchasePrice",
	      "label": "单价（元）",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm.row.purchasePrice))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "单位",
	      "min-width": "100"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "totalPayment",
	      "label": "合计金额（元）",
	      "min-width": "140"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm.row.totalPayment))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "payStatus",
	      "label": "是否付款",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('el-tag', {
	            attrs: {
	              "type": _vm.row.payStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._v(_vm._s(_vm.row.payStatus == 0 ? '否' : '是'))])
	        
	      },
	      staticRenderFns: []
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "payment-con"
	  }, [_c('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "space-between"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t\t总计："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.totalPayment))]), _vm._v("元\n\t\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t\t已付："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.payment))]), _vm._v("元\n\t\t\t\t\t\t\t\t")])])], 1), _vm._v(" "), _c('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t\t需付："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.nonPayment))]), _vm._v("元\n\t\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t\t数量："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.purchaseCount))]), _vm._v("项\n\t\t\t\t\t\t\t\t")])])], 1)], 1), _vm._v(" "), _c('el-col', {
	    staticClass: "right",
	    attrs: {
	      "span": 16
	    }
	  }, [_c('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_c('el-form', {
	    ref: "paymentForm",
	    attrs: {
	      "inline": true,
	      "model": _vm.paymentForm,
	      "rules": _vm.rules
	    }
	  }, [_c('el-form-item', {
	    attrs: {
	      "label": "实付金额",
	      "prop": "amount",
	      "label-width": "80px"
	    }
	  }, [_c('el-input', {
	    attrs: {
	      "placeholder": "实付金额"
	    },
	    model: {
	      value: (_vm.paymentForm.amount),
	      callback: function($$v) {
	        _vm.paymentForm.amount = _vm._n($$v)
	      },
	      expression: "paymentForm.amount"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', {
	    attrs: {
	      "prop": "payType"
	    }
	  }, [_c('el-select', {
	    attrs: {
	      "placeholder": "支付方式",
	      "disabled": _vm.role == 0
	    },
	    on: {
	      "change": _vm.handleChangePayType
	    },
	    model: {
	      value: (_vm.paymentForm.payType),
	      callback: function($$v) {
	        _vm.paymentForm.payType = $$v
	      },
	      expression: "paymentForm.payType"
	    }
	  }, _vm._l((_vm.pmsSettlementTypeVos), function(item) {
	    return _c('el-option', {
	      attrs: {
	        "label": item.settlementName,
	        "value": item.settlementId
	      }
	    })
	  }))], 1)], 1)], 1)], 1), _vm._v(" "), _c('el-row', {
	    staticClass: "account-info",
	    attrs: {
	      "type": "flex",
	      "justify": "start"
	    }
	  }, [(_vm.settlementAccountName != '') ? _c('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_c('span', {
	    staticClass: "account-name"
	  }, [_vm._v("户名：" + _vm._s(_vm.settlementAccountName))]), _vm._v(" "), _c('span', {
	    staticClass: "account-num"
	  }, [_vm._v("户号：" + _vm._s(_vm.settlementAccountNumber))])]) : _vm._e()], 1)], 1)], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "submit-con"
	  }, [_c('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "end"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_c('div', {
	    staticClass: "grid-content right"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
	    attrs: {
	      "type": "orange",
	      "loading": _vm.user.lock
	    },
	    on: {
	      "click": _vm.handleSettle
	    }
	  }, [_vm._v("完成结算")])], 1)])], 1)], 1)], 1)])])
	},staticRenderFns: []}

/***/ })

});