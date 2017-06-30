webpackJsonp([110],{

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(189)

	/* script */
	__vue_exports__ = __webpack_require__(191)

	/* template */
	var __vue_template__ = __webpack_require__(192)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\receives\\print.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-ab2855dc"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-ab2855dc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-ab2855dc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] print.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(190);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-ab2855dc&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./print.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-ab2855dc&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./print.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.table-content[data-v-ab2855dc] {\n  width: 1200px;\n  margin: 0 auto;\n}\n.order-bar[data-v-ab2855dc] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 20px 0;\n}\n.order-bar .right[data-v-ab2855dc] {\n  font-size: 14px;\n}\n", ""]);

	// exports


/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(137);

	exports.default = {
	    data: function data() {
	        var tableData = [];
	        var orderData = {};
	        return {
	            tableData: tableData,
	            orderData: orderData,
	            loading: true
	        };
	    },

	    methods: {
	        fetchData: function fetchData() {
	            var _this = this;

	            this.loading = true;
	            var receiptId = this.$route.params.id;
	            var requestData = { "receiptId": receiptId };
	            this.$http({
	                url: '/pms/receipt/order/detail.do',
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.tableData = data.result.pmsReceiptVo.pmsReceiptDetailVos;
	                    _this.orderData.createUserName = data.result.pmsReceiptVo.createUserName;
	                    _this.orderData.purchaseNo = data.result.pmsReceiptVo.purchaseNo;
	                    _this.orderData.purchaseRemark = data.result.pmsReceiptVo.purchaseRemark;
	                    _this.orderData.createTime = data.result.pmsReceiptVo.createTime;
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
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ path: '/receives' });
	        },
	        handlePrint: function handlePrint() {
	            window.print();
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

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "content"
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
	  }, ["收货单"])]), " ", _h('el-col', {
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
	  }, ["开单时间：" + _vm._s(_vm._f("moment")(_vm.orderData.createTime))])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["收货时间：" + _vm._s(_vm.orderData.createTime)])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["开单人：" + _vm._s(_vm.orderData.createUserName)])])])])])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["返回"]), " ", _h('el-button', {
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
	      "height": "380",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序",
	      "width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialName",
	      "label": "物料名称",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "类别",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "进价",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "采购数量",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "收货数量",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "单位",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaseCount",
	      "label": "合计",
	      "min-width": "120"
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
	          }, [_vm._s(_vm.row.payStatus == 0 ? '未付款' : '已付款')])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchaserName",
	      "label": "采购员",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "supplierName",
	      "label": "供应商",
	      "min-width": "120"
	    }
	  })])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-ab2855dc", module.exports)
	  }
	}

/***/ }

});