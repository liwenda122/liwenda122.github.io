webpackJsonp([3],{

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(454)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(456),
	  /* template */
	  __webpack_require__(457),
	  /* scopeId */
	  "data-v-2dbc34b7",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(455);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("5d546c79", content, true);

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".what_onCreatePO[data-v-2dbc34b7]{position:absolute;right:8px;top:0;color:#ff5f00;font-size:16px;cursor:pointer;line-height:60px}.dialogContent[data-v-2dbc34b7]{max-height:500px;overflow:auto}.dialog[data-v-2dbc34b7]{max-width:660px;margin:0 auto}.dialog h1[data-v-2dbc34b7]{font-size:20px;text-align:center;margin-bottom:40px;color:#333;font-weight:700}.dialog h3[data-v-2dbc34b7]{margin-bottom:15px;font-weight:700;color:#333;font-size:16px}.dialog h3 .h3Tips[data-v-2dbc34b7]{display:inline-block;width:23px;height:23px;line-height:23px;margin-right:10px;background-color:#20a0ff;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;text-align:center;color:#fff}.dialog .function[data-v-2dbc34b7]{margin-bottom:15px}.dialog .function .blue[data-v-2dbc34b7]{color:#20a0ff}.dialog button[data-v-2dbc34b7]{margin:0 5px}.dialog .text[data-v-2dbc34b7]{padding:0 35px;line-height:25px}.dialog .centent[data-v-2dbc34b7]{margin-bottom:40px}.dialog img[data-v-2dbc34b7]{min-height:221px}.dialog .mt20[data-v-2dbc34b7]{margin-top:20px}", ""]);

	// exports


/***/ }),

/***/ 456:
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

	exports.default = {
					data: function data() {
									var crumbs = [{ path: '/', name: '首页' }, { path: '/purchase', name: '开采购单' }];
									var formSearch = {
													date: [],
													status: '',
													purchaseno: ''
									};
									var tableData = [];
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
													this.$router.push({ name: 'purchaseView', params: { id: id } });
									},
									handleEdit: function handleEdit(id) {
													this.$router.push({ name: 'purchaseEdit', params: { id: id } });
									},
									handleDel: function handleDel(id) {
													var _this = this;

													var requestData = { purchaseId: id };
													this.$confirm('确认删除该采购单?', '提示', {
																	confirmButtonText: '确定',
																	cancelButtonText: '取消',
																	type: 'warning'
													}).then(function () {
																	_this.$http({
																					url: '/pms/purchase/order/delete.do',
																					method: 'POST',
																					body: { requestData: JSON.stringify(requestData) },
																					emulateJSON: true
																	}).then(function (res) {
																					return res.body;
																	}).then(function (data) {
																					if (data.code == 200) {
																									_this.$message({
																													message: '删除成功',
																													type: 'success'
																									});
																									_this.fetchData();
																					} else {
																									_this.$message({
																													message: data.message,
																													type: 'warning'
																									});
																					}
																	});
													}).catch(function () {});
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
													return row.receiptStatus === value;
									},
									fetchData: function fetchData() {
													var _this2 = this;

													this.loading = true;
													var requestData = { "filter": this.formSearch.purchaseno, "pageNo": this.pageData.pageNo, "pageSize": this.pageData.pageSize };
													requestData.startTime = this.formSearch.date.length > 0 && this.formSearch.date[0] ? (0, _moment2.default)(this.formSearch.date[0]).format('YYYY-MM-DD') : '';
													requestData.endTime = this.formSearch.date.length > 1 && this.formSearch.date[1] ? (0, _moment2.default)(this.formSearch.date[1]).format('YYYY-MM-DD') : '';
													this.$http({
																	url: '/pms/purchase/order/list.do',
																	method: 'POST',
																	body: { requestData: JSON.stringify(requestData) },
																	emulateJSON: true
													}).then(function (res) {
																	return res.body;
													}).then(function (data) {
																	if (data.code == 200) {
																					_this2.tableData = data.result.pmsPurchaseOrderVos;
																					_this2.pageData.pageNo = data.result.pageNo;
																					_this2.pageData.pageSize = data.result.pageSize;
																					_this2.pageData.totalCount = data.result.totalCount;
																					_this2.pageData.totalPage = data.result.totalPage;
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
									this.fetchData();
					},

					computed: (0, _vuex.mapState)({
									user: function user(state) {
													return state.user;
									}
					})
	};

/***/ }),

/***/ 457:
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
	  }, [_c('el-form-item', [_c('el-date-picker', {
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
	  }, [_c('el-button', {
	    attrs: {
	      "type": "orange"
	    },
	    on: {
	      "click": _vm.onCreatePO
	    }
	  }, [_vm._v("开采购单")])], 1), _vm._v(" "), _c('el-table', {
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
	      "min-width": "120"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "createTime",
	      "label": "开单日期",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('span', [_vm._v(_vm._s(_vm._f("moment")(_vm.row.createTime)))])
	        
	      },
	      staticRenderFns: []
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "createUserName",
	      "label": "开单人",
	      "min-width": "120"
	    }
	  }), _vm._v(" "), _c('el-table-column', {
	    attrs: {
	      "prop": "receiptStatus",
	      "label": "状态",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	          return _c('el-tag', {
	            attrs: {
	              "type": _vm.row.receiptStatus == 0 ? 'primary' : 'success',
	              "close-transition": ""
	            }
	          }, [_vm._v(_vm._s(_vm.row.receiptStatus == 0 ? '未收货' : _vm.row.status == 1 ? '已发货未收货' : '已收货'))])
	        
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
	          return _c('span', [(_vm.row.receiptStatus != 0) ? _c('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleView(_vm.row.purchaseId)
	              }
	            }
	          }, [_vm._v("查看")]) : _vm._e(), _vm._v(" "), (_vm.row.receiptStatus == 0) ? _c('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleEdit(_vm.row.purchaseId)
	              }
	            }
	          }, [_vm._v("编辑")]) : _vm._e(), _vm._v(" "), (_vm.row.receiptStatus == 0) ? _c('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleDel(_vm.row.purchaseId)
	              }
	            }
	          }, [_vm._v("删除")]) : _vm._e()], 1)
	        
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
	  }, [_vm._v("如何开采购单？")])])]), _vm._v(" "), _c('el-dialog', {
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
	  }, [_c('h1', [_vm._v("如何开采购单？")]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("1")]), _vm._v("第一步：点击“"), _c('el-button', {
	    attrs: {
	      "size": "small",
	      "type": "orange"
	    }
	  }, [_vm._v("开采购单")]), _vm._v("”进入>开单页；")], 1), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('img', {
	    attrs: {
	      "src": "http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/caigou1.png"
	    }
	  })]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("2")]), _vm._v("第二步：添加此次所需要采购的物料和数量。")]), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('img', {
	    attrs: {
	      "src": "http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/caigou2.png"
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "function mt20"
	  }, [_c('span', {
	    staticClass: "blue"
	  }, [_vm._v("| 方法1：")]), _vm._v("点击“"), _c('el-button', {
	    attrs: {
	      "size": "small",
	      "type": "primary",
	      "icon": "plus"
	    }
	  }, [_vm._v("添加物料")]), _vm._v("”在物料列表中直接选中自己需要采购的物料（推荐使用）。")], 1), _vm._v(" "), _c('p', {
	    staticClass: "function"
	  }, [_c('span', {
	    staticClass: "blue"
	  }, [_vm._v("| 方法2：")]), _vm._v("点击“"), _c('el-button', {
	    attrs: {
	      "size": "small",
	      "type": "primary"
	    }
	  }, [_vm._v("导入")]), _vm._v("”下载EXCEL模板，填入物料批量上传。")], 1), _vm._v(" "), _c('p', {
	    staticClass: "function"
	  }, [_c('span', {
	    staticClass: "blue"
	  }, [_vm._v("| 方法3：")]), _vm._v("直接在列表中一个个添加（适用于采购物料较少的情况）。")])]), _vm._v(" "), _c('h3', [_c('span', {
	    staticClass: "h3Tips"
	  }, [_vm._v("3")]), _vm._v("第三步：完成下单")]), _vm._v(" "), _c('div', {
	    staticClass: "centent text"
	  }, [_c('p', [_vm._v("完成下单后，系统会自动生成一个采购单号，采购单号规则为餐厅名称前三位首写字母+日期+三位编号，如：“肯打鸡餐厅17年1月1日开第一个单，应该为KDG-170101-001。”（采购单只有未收货之前可以编辑，收完货则不可再编辑。）")])])])])])], 1)
	},staticRenderFns: []}

/***/ })

});