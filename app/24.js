webpackJsonp([24],{

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

/***/ 465:
/***/ (function(module, exports) {

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
	    materialUnitList: '/pms/management/materialUnit/list.do',
	    materialTypeList: '/pms/management/materialType/list.do',
	    materialUnitAndTypeList: '/pms/management/materialUnitAndType/list.do',
	    materialSettleTypeList: '/pms/management/materialSettleType/list.do',
	    materialUnitAdd: '/pms/management/materialUnit/add.do',
	    materialUnitEdit: '/pms/management/materialUnit/edit.do',
	    materialUnitShow: '/pms/management/materialUnit/show.do',
	    materialUnitDelete: '/pms/management/materialUnit/delete.do',
	    materialTypeAdd: '/pms/management/materialType/add.do',
	    materialTypeDelete: '/pms/management/materialType/delete.do',
	    materialTypeShow: '/pms/management/materialType/show.do',
	    materialTypeEdit: '/pms/management/materialType/edit.do',
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

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(574)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(576),
	  /* template */
	  __webpack_require__(577),
	  /* scopeId */
	  "data-v-fb674296",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(575);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("b82e674c", content, true);

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".rowSpan span[data-v-fb674296]{line-height:60px}.order-bar[data-v-fb674296]{color:#99a9bf;font-size:18px;padding:14px 0}.order-bar .el-row[data-v-fb674296]{line-height:32px}.order-bar .right[data-v-fb674296]{font-size:14px}.total-bar[data-v-fb674296]{font-size:14px;color:#475669}.total-bar .orange[data-v-fb674296]{color:#f60;padding-left:3px}", ""]);

	// exports


/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils, urls) {'use strict';

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(464), __webpack_require__(465)))

/***/ }),

/***/ 577:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('common-layout', {
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
	  }, [_c('el-row', {
	    attrs: {
	      "justify": "space-between"
	    }
	  }, [_c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_c('div', {
	    staticClass: "grid-content left"
	  }, [_vm._v("结算单详情")])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 16
	    }
	  }, [_c('div', {
	    staticClass: "grid-content right"
	  }, [_c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_vm._v("采购单号：" + _vm._s(_vm.purchaseNo))]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("开单人：" + _vm._s(_vm.purchaseUserName))])], 1), _vm._v(" "), _c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 12
	    }
	  }, [_vm._v("结算时间：" + _vm._s(_vm._f("moment")(this.$route.query.time)))]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_vm._v("结算人：" + _vm._s(this.$route.query.name))])], 1)], 1)])], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "button-bar"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.handleExport
	    }
	  }, [_vm._v("导出")])], 1), _vm._v(" "), _c('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.detail,
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
	      "prop": "materialUnitName",
	      "label": "进货单位",
	      "min-width": "120"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "purchasePrice",
	      "label": "采购均价",
	      "min-width": "80"
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
	      "prop": "purchaseCount",
	      "label": "采购数量",
	      "min-width": "80"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "totalFee",
	      "label": "合计金额",
	      "min-width": "80"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm._f("number")(_vm.row.totalFee)))])
	        
	      },
	      staticRenderFns: []
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "total-bar"
	  }, [_c('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "start"
	    }
	  }, [_c('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("\n                         采购 "), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v(_vm._s(_vm.pmsSettlementAmountVo.purchaseCount) + "项")])]), _vm._v(" "), _c('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("\n                          总计："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v("¥" + _vm._s(_vm.pmsSettlementAmountVo.totalPayment))])]), _vm._v(" "), _c('el-col', {
	    staticClass: "rowSpan",
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("\n                            实付："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v("¥" + _vm._s(_vm.pmsSettlementAmountVo.payment))])])], 1)], 1)], 1)])]), _vm._v(" "), _c('transition', {
	    on: {
	      "leave": _vm.refresh
	    }
	  }, [_c('router-view')], 1)], 1)
	},staticRenderFns: []}

/***/ })

});