webpackJsonp([64],{

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

/***/ 156:
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
	    materialUnitAndTypeList: '/pms/management/materialUnitAndType/list.do',
	    materialSettleTypeList: '/pms/management/materialSettleType/list.do',
	    materialUnitAdd: '/pms/management/materialUnit/add.do',
	    materialTypeAdd: '/pms/management/materialType/add.do',
	    supplierList: '/pms/management/supplier/list.do',
	    supplierDelete: '/pms/management/supplier/delete.do',
	    supplierEdit: '/pms/management/supplier/edit.do',
	    supplierAdd: '/pms/management/supplier/add.do',
	    supplierShow: '/pms/management/supplier/show.do',
	    userList: '/pms/user/list.do',
	    userDelete: '/pms/user/delete.do',
	    userAddView: '/pms/user/addView.do',
	    userEditView: '/pms/user/editView.do',
	    userEdit: '/pms/user/edit.do',
	    userAdd: '/pms/user/add.do',
	    roleList: '/pms/role/list.do',
	    roleDelete: '/pms/role/delete.do',
	    roleAddView: '/pms/role/addView.do',
	    roleEditView: '/pms/role/editView.do',
	    roleEdit: '/pms/role/edit.do',
	    roleAdd: '/pms/role/add.do',
	    /*报表*/
	    settleOrder: '/pms/report/settle/order.do',
	    settleDetail: '/pms/report/settle/order/detail.do',
	    settleType: '/pms/report/type/list.do',
	    settleTypeDetail: '/pms/report/settle/type/list/detail.do',
	    materialReport: '/pms/report/material/list.do',
	    materialReportDetail: '/pms/report/material/list/detail.do',
	    purchaseList: '/pms/report/purchase/list.do',
	    purchaseListDetail: '/pms/report/purchase/list/detail.do',
	    settlement: '/pms/report/settlement/list.do',
	    settlementDetail: '/pms/report/settlement/list/detail.do'
	};

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(260)

	/* script */
	__vue_exports__ = __webpack_require__(262)

	/* template */
	var __vue_template__ = __webpack_require__(263)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\reports\\settleOrder\\settleOrderDetail.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-4b30e8fd"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4b30e8fd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4b30e8fd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] settleOrderDetail.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(261);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b30e8fd&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./settleOrderDetail.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b30e8fd&scoped=true!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./settleOrderDetail.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.rowSpan span[data-v-4b30e8fd] {\n  line-height: 60px;\n}\n", ""]);

	// exports


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils, urls) {'use strict';

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

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '', name: '报表' }, { path: '/reports/settleOrder/settleOrderList', name: '结算单汇总' }, { path: '/reports/settleOrder/settleOrderDetail', name: '结算单详情' }];
	        return {
	            crumbs: crumbs,
	            filter: '',
	            purchaseNo: '',
	            purchaseUserName: '',
	            pmsSettlementAmountVo: {},
	            detail: []
	        };
	    },

	    methods: {
	        refresh: function refresh() {
	            var requestData = {
	                receiptId: this.$route.query.id
	            };
	            utils.post(urls.settleDetail, requestData, this).then(function (data) {
	                if (data.code == 200) {
	                    this.pmsSettlementAmountVo = data.result.pmsSettlementAmountVo;
	                    this.purchaseUserName = data.result.purchaseUserName;
	                    this.purchaseNo = data.result.purchaseNo;
	                    this.detail = data.result.pmsSettlementOrderReportDetailVos;
	                }
	            });
	        },
	        handleExport: function handleExport() {
	            utils.export('/pms/report/settle/order/detail/export.do', { "receiptId": this.$route.query.id });
	        }
	    },
	    created: function created() {
	        this.refresh();
	    },

	    computed: (0, _vuex.mapState)({ user: function user(state) {
	            return state.user;
	        } })
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(155), __webpack_require__(156)))

/***/ },

/***/ 263:
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
	  }, [_h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "end"
	    }
	  }, [_h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["采购单号：" + _vm._s(_vm.purchaseNo)])]), " ", _h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["开单人：" + _vm._s(_vm.purchaseUserName)])]), " ", _h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["结算时间：" + _vm._s(_vm._f("moment")(this.$route.query.time))])]), " ", _h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["结算人：" + _vm._s(this.$route.query.name)])])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleExport
	    }
	  }, ["导出"]), " "]), " ", _h('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.detail,
	      "height": "440",
	      "border": ""
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序号",
	      "width": "70"
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
	      "prop": "materialUnitName",
	      "label": "进货单位",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "purchasePrice",
	      "label": "采购均价",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "totalFee",
	      "label": "采购数量",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "totalFee",
	      "label": "合计金额",
	      "min-width": "80"
	    }
	  })]), " ", _h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "end"
	    }
	  }, [_h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["采购" + _vm._s(_vm.pmsSettlementAmountVo.purchaseCount) + "项"])]), " ", _h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["总计：￥" + _vm._s(_vm.pmsSettlementAmountVo.totalPayment)])]), " ", _h('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_h('span', ["实付：￥" + _vm._s(_vm.pmsSettlementAmountVo.payment)])])])])])]), " ", _h('transition', {
	    on: {
	      "leave": _vm.refresh
	    }
	  }, [_h('router-view')])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4b30e8fd", module.exports)
	  }
	}

/***/ }

});