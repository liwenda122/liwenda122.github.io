webpackJsonp([90],{

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(370)

	/* script */
	__vue_exports__ = __webpack_require__(372)

	/* template */
	var __vue_template__ = __webpack_require__(373)
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

/***/ 370:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(371);
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

/***/ 371:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.order-bar[data-v-e061dffe] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 20px 0;\n}\n.order-bar .right[data-v-e061dffe] {\n  font-size: 14px;\n}\n.submit-con[data-v-e061dffe] {\n  padding: 20px 0;\n  color: #475669;\n}\n.submit-con .orange[data-v-e061dffe] {\n  color: #ff6600;\n}\n.submit-con .left[data-v-e061dffe],\n.submit-con .middle[data-v-e061dffe] {\n  line-height: 36px;\n  height: 36px;\n}\n.submit-con .middle[data-v-e061dffe] {\n  text-align: center;\n}\n.submit-con .middle .tooltips[data-v-e061dffe] {\n  padding-left: 10px;\n}\n.submit-con .right[data-v-e061dffe] {\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _methods;

	var _vuex = __webpack_require__(137);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/checkout', name: '结算单' }, { path: '/checkout/view/', name: '结算记录' }];
	        var tableData = [];
	        var orderData = {};
	        var pmsSettlementAmountVo = {};
	        var receiptId = '';
	        return {
	            crumbs: crumbs,
	            tableData: tableData,
	            orderData: orderData,
	            pmsSettlementAmountVo: pmsSettlementAmountVo,
	            receiptId: receiptId
	        };
	    },

	    methods: (_methods = {
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ path: '/checkout' });
	        },
	        handleExport: function handleExport() {},
	        handlePrint: function handlePrint() {
	            this.$router.push({ name: 'checkoutPrint', params: { id: this.receiptId } });
	        }
	    }, _defineProperty(_methods, 'handlePrint', function handlePrint() {
	        this.$router.push({ name: 'checkoutViewMaterial', params: { id: this.receiptId } });
	    }), _defineProperty(_methods, 'fetchData', function fetchData() {
	        var _this = this;

	        var requestData = { "receiptId": this.receiptId };
	        this.$http({
	            url: '/pms/settlement/order/data.do',
	            method: 'POST',
	            body: { requestData: JSON.stringify(requestData) },
	            emulateJSON: true
	        }).then(function (res) {
	            return res.body;
	        }).then(function (data) {
	            if (data.code == 200) {
	                _this.orderData.purchaseTime = data.result.purchaseTime;
	                _this.orderData.purchaseNo = data.result.purchaseNo;
	                _this.orderData.purchaserName = data.result.purchaserName;
	                _this.orderData.receivedTime = data.result.receivedTime;
	                _this.orderData.receiverName = data.result.receiverName;
	            } else {
	                _this.$message({
	                    message: data.message,
	                    type: 'warning'
	                });
	            }
	        });
	        this.$http({
	            url: '/pms/settlement/detail/show.do',
	            method: 'POST',
	            body: { requestData: JSON.stringify(requestData) },
	            emulateJSON: true
	        }).then(function (res) {
	            return res.body;
	        }).then(function (data) {
	            if (data.code == 200) {
	                _this.tableData = data.result.pmsSettlementOrderDetailVos;
	                _this.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
	            } else {
	                _this.tableData = [];
	                _this.$message({
	                    message: data.message,
	                    type: 'warning'
	                });
	            }
	        });
	    }), _methods),
	    created: function created() {
	        this.receiptId = this.$route.params.id;
	        this.fetchData();
	    },

	    computed: (0, _vuex.mapState)({
	        user: function user(state) {
	            return state.user;
	        }
	    })
	};

/***/ },

/***/ 373:
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
	    staticClass: "table-content"
	  }, [_h('div', {
	    staticClass: "order-bar"
	  }, [_h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["结算记录"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, ["采购单号：" + _vm._s(_vm.orderData.purchaseNo)]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, ["结清时间：" + _vm._s(_vm._f("moment")(_vm.orderData.receivedTime))])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["结算人：" + _vm._s(_vm.orderData.receiverName)])])])])])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleExport
	    }
	  }, ["导出"]), " ", _h('el-button', {
	    on: {
	      "click": _vm.handlePrint
	    }
	  }, ["打印"])]), " ", _h('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.tableData,
	      "height": "380",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序",
	      "width": "55"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialName",
	      "label": "供应商名称",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "采购员",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "需付金额",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "实付金额",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "支付方式",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "结算对象",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "实付金额",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "结算时间",
	      "min-width": "100"
	    }
	  }, [_h('span', [_vm._s(_vm._f("moment")(_vm.materialUnitName))])]), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return (_vm.row.settlementStatus == 0) ? _h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleView(_vm.row.receiptId)
	              }
	            }
	          }, ["查看"]) : _vm._e()
	        
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
	  }, ["\n\t\t\t\t\t\t\t\t总计：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.totalPayment)]), "元\n\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t实付：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.payment)]), "元\n\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t数量：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.pmsSettlementAmountVo.purchaseCount)]), "项\n\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["返回列表"]), " ", _h('el-button', ["上一条"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary"
	    }
	  }, ["下一条"])])])])])])])])])
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