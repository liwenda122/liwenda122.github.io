webpackJsonp([14],{

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(524)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(526),
	  /* template */
	  __webpack_require__(527),
	  /* scopeId */
	  "data-v-1ed8aabc",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(525);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("5ce91159", content, true);

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".search-bar .el-select[data-v-1ed8aabc]{width:110px}.button-bar[data-v-1ed8aabc]{font-size:14px;color:#475669}.button-bar .orange[data-v-1ed8aabc]{color:#f60;padding-left:3px}.what_onCreatePO[data-v-1ed8aabc]{position:absolute;right:8px;top:0;color:#ff5f00;font-size:16px;cursor:pointer;line-height:60px}.dialogContent[data-v-1ed8aabc]{max-height:500px;overflow:auto}.dialog[data-v-1ed8aabc]{max-width:660px;margin:0 auto}.dialog h1[data-v-1ed8aabc]{font-size:20px;text-align:center;margin-bottom:40px;color:#333;font-weight:700}.dialog h3[data-v-1ed8aabc]{margin-bottom:15px;font-weight:700;color:#333;font-size:16px}.dialog h3 .h3Tips[data-v-1ed8aabc]{display:inline-block;width:23px;height:23px;line-height:23px;margin-right:10px;background-color:#20a0ff;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;text-align:center;color:#fff}.dialog .function[data-v-1ed8aabc]{margin-bottom:15px}.dialog .function .blue[data-v-1ed8aabc]{color:#20a0ff}.dialog button[data-v-1ed8aabc]{margin:0 5px}.dialog .text[data-v-1ed8aabc]{padding:0 35px;line-height:25px}.dialog .centent[data-v-1ed8aabc]{margin-bottom:40px}.dialog img[data-v-1ed8aabc]{min-height:221px}.dialog .mt20[data-v-1ed8aabc]{margin-top:20px}", ""]);

	// exports


/***/ }),

/***/ 526:
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
				loading: true,
				dialogVisible: false
			};
		},

		methods: {
			showDialog: function showDialog() {
				this.dialogVisible = true;
			},
			closeDialog: function closeDialog() {
				this.dialogVisible = false;
			},

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

/***/ }),

/***/ 527:
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
	    staticClass: "search-bar"
	  }, [_c('el-form', {
	    staticClass: "demo-form-inline",
	    attrs: {
	      "inline": true,
	      "model": _vm.formSearch
	    }
	  }, [_c('el-form-item', [_c('el-select', {
	    attrs: {
	      "clearable": "",
	      "placeholder": "状态"
	    },
	    on: {
	      "change": _vm.onSubmit
	    },
	    model: {
	      value: (_vm.formSearch.status),
	      callback: function($$v) {
	        _vm.formSearch.status = $$v
	      },
	      expression: "formSearch.status"
	    }
	  }, [_c('el-option', {
	    attrs: {
	      "label": "未结清",
	      "value": "0"
	    }
	  }), _vm._v(" "), _c('el-option', {
	    attrs: {
	      "label": "已结清",
	      "value": "1"
	    }
	  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-date-picker', {
	    staticStyle: {
	      "width": "220px"
	    },
	    attrs: {
	      "type": "daterange",
	      "align": "right",
	      "placeholder": "选择日期范围",
	      "picker-options": _vm.pickerOptions
	    },
	    model: {
	      value: (_vm.formSearch.date),
	      callback: function($$v) {
	        _vm.formSearch.date = $$v
	      },
	      expression: "formSearch.date"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
	    attrs: {
	      "placeholder": "请输入采购单号"
	    },
	    model: {
	      value: (_vm.formSearch.purchaseno),
	      callback: function($$v) {
	        _vm.formSearch.purchaseno = $$v
	      },
	      expression: "formSearch.purchaseno"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.onSubmit
	    }
	  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "table-content"
	  }, [_c('div', {
	    staticClass: "button-bar"
	  }, [_c('el-row', [_c('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("总计金额："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v("¥" + _vm._s(_vm.pmsSettlementAmountVo.totalPayment))])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("已付金额："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v("¥" + _vm._s(_vm.pmsSettlementAmountVo.payment))])]), _vm._v(" "), _c('el-col', {
	    attrs: {
	      "span": 4
	    }
	  }, [_vm._v("未付金额："), _c('span', {
	    staticClass: "orange"
	  }, [_vm._v("¥" + _vm._s(_vm.pmsSettlementAmountVo.nonPayment))])])], 1)], 1), _vm._v(" "), _c('el-table', {
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
	      "height": "442",
	      "border": ""
	    }
	  }, [_c('el-table-column', {
	    attrs: {
	      "label": "序号",
	      "width": "70"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm.$index + 1 + _vm.pageData.pageSize * (_vm.pageData.pageNo - 1)))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "purchaseNo",
	      "label": "采购单号",
	      "min-width": "150"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "payment",
	      "label": "已付金额（元）",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm._f("number")(_vm.row.payment)))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "nonPayment",
	      "label": "未付金额（元）",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm._f("number")(_vm.row.nonPayment)))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "label": "结算时间",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm._f("moment")(_vm.row.settlementTime)))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "settlementStatus",
	      "label": "状态",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('el-tag', {
	            attrs: {
	              "type": _vm.row.settlementStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._v(_vm._s(_vm.row.settlementStatus == 0 ? '未结清' : '已结清'))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [(_vm.row.settlementStatus == 0) ? _c('el-button', {
	            attrs: {
	              "type": "orange",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleCheckout(_vm.row.receiptId)
	              }
	            }
	          }, [_vm._v("结算")]) : _vm._e(), _vm._v(" "), (_vm.row.settlementStatus == 1) ? _c('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleView(_vm.row.receiptId)
	              }
	            }
	          }, [_vm._v("查看")]) : _vm._e()], 1)
	        
	      },
	      staticRenderFns: []
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "pagination"
	  }, [_c('el-pagination', {
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
	  })], 1)], 1), _vm._v(" "), _c('span', {
	    staticClass: "what_onCreatePO",
	    on: {
	      "click": _vm.showDialog
	    }
	  }, [_vm._v("如何结算？")])])]), _vm._v(" "), _c('el-dialog', {
	    attrs: {
	      "title": "帮助",
	      "size": "large"
	    },
	    on: {
	      "close": _vm.closeDialog
	    },
	    model: {
	      value: (_vm.dialogVisible),
	      callback: function($$v) {
	        _vm.dialogVisible = $$v
	      },
	      expression: "dialogVisible"
	    }
	  }, [_c('div', {
	    staticClass: "dialogContent"
	  }, [_c('div', {
	    staticClass: "dialog"
	  }, [_c('h1', [_vm._v("如何收货？")]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("1")]), _vm._v("第一步：选择结算对象，点击“"), _c('el-button', {
	    attrs: {
	      "size": "small",
	      "type": "orange"
	    }
	  }, [_vm._v("结算")]), _vm._v("”进入>结算页面。")], 1), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('img', {
	    attrs: {
	      "src": "http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/jiesuan1.png"
	    }
	  })]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("2")]), _vm._v("第二步：确认物料、金额，选择支付方式支付。")]), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('img', {
	    attrs: {
	      "src": "http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/jisuan2.png"
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "function mt20"
	  }, [_c('span', {
	    staticClass: "blue"
	  }, [_vm._v("| ")]), _vm._v("实付金额默认需付金额，可根据实际情况修改，选择支付方式，自动提示添加供应商时添加的支付账号。")])]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("3")]), _vm._v("第三步：完成结算")]), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('p', [_vm._v("所有物料都结算完后，点击确认，完成整笔订单的结算，可分批结算")])])])])])], 1)
	},staticRenderFns: []}

/***/ })

});