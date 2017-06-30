webpackJsonp([19],{

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(549)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(551),
	  /* template */
	  __webpack_require__(552),
	  /* scopeId */
	  "data-v-416b02ea",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(550);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("6657afec", content, true);

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".table-content[data-v-416b02ea]{width:1000px;margin:0 auto}.order-bar[data-v-416b02ea]{color:#99a9bf;font-size:18px;padding:14px 0}.order-bar .right[data-v-416b02ea]{font-size:14px}.payment-con[data-v-416b02ea]{padding:20px 0;color:#475669}.payment-con .orange[data-v-416b02ea]{color:#f60}.payment-con .right[data-v-416b02ea]{text-align:right}", ""]);

	// exports


/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

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

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail/' + this.receiptId + '/role/1', name: '与供应商结算' }, { path: '/checkout/viewMaterial/' + this.receiptId + '/role/1/user/' + this.userid, name: '结算记录' }];
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
	        var pmsSettlementTypeVo = {
	            settlementName: '',
	            settlementAccountName: '',
	            settlementAccountNumber: ''
	        };
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
	            pmsSettlementTypeVo: pmsSettlementTypeVo,
	            loading: true,
	            receiptId: "",
	            role: "1",
	            userid: "",
	            paymentForm: {
	                amount: "",
	                payType: "1"
	            },
	            rules: { //验证规则
	                amount: [{ validator: checkNumber, trigger: 'blur' }],
	                payType: [{ required: true, message: '必须选择支付方式', trigger: 'change' }]
	            }
	        };
	    },

	    methods: {
	        handlePrint: function handlePrint() {
	            window.print();
	        },
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ name: 'checkoutViewMaterial', params: { id: this.receiptId, role: this.role, userid: this.userid } });
	        },
	        fetchData: function fetchData() {
	            var _this = this;

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
	                    _this.orderData = data.result;
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	            //获取do结算页面列表信息
	            this.$http({
	                url: '/pms/settlement/settle/show.do',
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.tableData = data.result.pmsSettlementOrderDetailVos;
	                    if (data.result.pmsSupplierVo) {
	                        _this.pmsSupplierVo = data.result.pmsSupplierVo;
	                    }
	                    if (data.result.pmsPurchaserVo) {
	                        _this.pmsPurchaserVo = data.result.pmsPurchaserVo;
	                    }
	                    _this.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
	                    if (data.result.pmsSettlementTypeVo) {
	                        _this.pmsSettlementTypeVo = data.result.pmsSettlementTypeVo;
	                    }
	                } else {
	                    _this.tableData = [];
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	                _this.loading = false;
	            });
	            //here 还得根据供应商获取 结算方式列表
	        }
	    },
	    created: function created() {
	        this.receiptId = this.$route.params.id;
	        this.role = this.$route.params.role;
	        this.userid = this.$route.params.userid;
	        this.fetchData();
	    },

	    computed: (0, _vuex.mapState)({
	        user: function user(state) {
	            return state.user;
	        }
	    })
	};

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
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
	  }, [_vm._v("结算记录-查看物料详情")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 16
	    }
	  }, [_c('div', {
	    staticClass: "grid-content right"
	  }, [_c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("采购单号：" + _vm._s(_vm.orderData.purchaseNo))]), _vm._v(" "), (_vm.role == 0) ? _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("采购员：" + _vm._s(_vm.pmsPurchaserVo.purchaserName))]) : _vm._e(), _vm._v(" "), (_vm.role == 1) ? _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("供应商：" + _vm._s(_vm.pmsSupplierVo.supplierName))]) : _vm._e()], 1), _vm._v(" "), _c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("开单人：" + _vm._s(_vm.orderData.purchaserName))]), _vm._v(" "), (_vm.role == 0) ? _c('el-col', {
	    attrs: {
	      "span": 8
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
	      "click": _vm.handleBackToList
	    }
	  }, [_vm._v("返回")]), _vm._v(" "), _c('el-button', {
	    on: {
	      "click": _vm.handlePrint
	    }
	  }, [_vm._v("打印")])], 1), _vm._v(" "), _c('el-table', {
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
	      "border": ""
	    }
	  }, [_c('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序号",
	      "width": "70"
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
	          return _c('span', [_vm._v(_vm._s(_vm._f("number")(_vm.row.purchasePrice)))])
	        
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
	          return _c('span', [_vm._v(_vm._s(_vm._f("number")(_vm.row.totalPayment)))])
	        
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
	      "span": 12
	    }
	  }, [_c('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t数量："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.purchaseCount))]), _vm._v("项\n\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t总计："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.totalPayment))]), _vm._v("元\n\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t已付："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.payment))]), _vm._v("元\n\t\t\t\t\t\t\t")])])], 1), _vm._v(" "), _c('el-row', {
	    attrs: {
	      "type": "flex"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("\n\t\t\t\t\t\t\t\t支付信息：\n\t\t\t\t\t\t\t\t"), _c('span', [_vm._v(_vm._s(_vm.pmsSettlementTypeVo.settlementName))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.pmsSettlementTypeVo.settlementAccountName))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.pmsSettlementTypeVo.settlementAccountNumber))])])])], 1)], 1)], 1)], 1)], 1)])
	},staticRenderFns: []}

/***/ })

});