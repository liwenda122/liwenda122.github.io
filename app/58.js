webpackJsonp([58],{

/***/ 155:
/***/ function(module, exports) {

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

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(230)

	/* script */
	__vue_exports__ = __webpack_require__(232)

	/* template */
	var __vue_template__ = __webpack_require__(233)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\checkout\\viewMaterial.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-e061dffe"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e061dffe", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e061dffe", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] viewMaterial.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(231);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e061dffe&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./viewMaterial.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e061dffe&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./viewMaterial.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.order-bar[data-v-e061dffe] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 14px 0;\n}\n.order-bar .right[data-v-e061dffe] {\n  font-size: 14px;\n}\n.payment-con[data-v-e061dffe] {\n  padding: 20px 0;\n  color: #475669;\n}\n.payment-con .orange[data-v-e061dffe] {\n  color: #ff6600;\n}\n.payment-con .right[data-v-e061dffe] {\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils) {'use strict';

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
	        handleExport: function handleExport() {
	            utils.export('/pms/settlement/order/detail/export.do', { receiptId: this.receiptId, settlementReceiver: this.role, id: this.userid });
	        },
	        handlePrint: function handlePrint() {
	            this.$router.push({ name: 'checkoutViewMaterialPrint', params: { id: this.receiptId, role: this.role, userid: this.userid } });
	        },
	        handleEdit: function handleEdit() {
	            this.$router.push({ name: 'doCheckout', params: { id: this.receiptId, role: this.role, userid: this.userid } });
	        },
	        handleBackToList: function handleBackToList() {
	            this.$router.go(-1);
	            //this.$router.push({name: 'checkoutDetail',params: { id: this.receiptId,role:this.role}});
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
	        if (this.role == 1) {
	            this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail/' + this.receiptId + '/role/1', name: '与供应商结算' }, { path: '/checkout/viewMaterial/' + this.receiptId + '/role/1/user/' + this.userid, name: '结算记录' }];
	        } else {
	            this.crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/detail/' + this.receiptId + '/role/0', name: '与采购员结算' }, { path: '/checkout/viewMaterial/' + this.receiptId + '/role/0/user/' + this.userid, name: '结算记录' }];
	        }
	        this.fetchData();
	    },

	    computed: (0, _vuex.mapState)({
	        user: function user(state) {
	            return state.user;
	        }
	    })
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(155)))

/***/ },

/***/ 233:
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
	  }, ["结算记录"])]), " ", _h('el-col', {
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
	  }, ["供应商：" + _vm._s(_vm.pmsSupplierVo.supplierName)]) : _vm._e()]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, ["开单人：" + _vm._s(_vm.orderData.purchaserName)]), " ", (_vm.role == 0) ? _h('el-col', {
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
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleEdit
	    }
	  }, ["编辑"]), " ", _h('el-button', {
	    on: {
	      "click": _vm.handleExport
	    }
	  }, ["导出"]), " ", _h('el-button', {
	    on: {
	      "click": _vm.handlePrint
	    }
	  }, ["打印"])]), " ", _h('el-table', {
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
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t数量：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.purchaseCount)]), "项\n\t\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t总计：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.totalPayment)]), "元\n\t\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
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
	      "span": 24
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t\t支付信息：\n\t\t\t\t\t\t\t\t\t", _h('span', [_vm._s(_vm.pmsSettlementTypeVo.settlementName)]), " ", _h('span', [_vm._s(_vm.pmsSettlementTypeVo.settlementAccountName)]), " ", _h('span', [_vm._s(_vm.pmsSettlementTypeVo.settlementAccountNumber)])])])])]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["返回列表"])])])])])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e061dffe", module.exports)
	  }
	}

/***/ }

});