webpackJsonp([109],{

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(182)
	__webpack_require__(184)

	/* script */
	__vue_exports__ = __webpack_require__(186)

	/* template */
	var __vue_template__ = __webpack_require__(187)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\receives\\edit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-2e91ffb5"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2e91ffb5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2e91ffb5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] edit.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(183);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2e91ffb5&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2e91ffb5&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.el-table .el-input-con[data-v-2e91ffb5] {\n  padding: 8px 0;\n}\n.el-table .el-input-con .small-input[data-v-2e91ffb5] {\n  width: 180px;\n}\n.el-table .el-input-con .el-input-number[data-v-2e91ffb5] {\n  width: 120px;\n  display: block;\n}\n.el-table .el-input-con .el-form-item[data-v-2e91ffb5] {\n  margin: 10px 0;\n}\n.order-bar[data-v-2e91ffb5] {\n  color: #99a9bf;\n  font-size: 18px;\n  padding: 20px 0;\n}\n.order-bar .right[data-v-2e91ffb5] {\n  font-size: 14px;\n}\n.remark-con[data-v-2e91ffb5] {\n  padding: 20px 0;\n}\n.submit-con[data-v-2e91ffb5] {\n  border-top: 1px solid #e5e5e5;\n  padding: 20px 0;\n  color: #475669;\n}\n.submit-con .orange[data-v-2e91ffb5] {\n  color: #ff6600;\n}\n.submit-con .left[data-v-2e91ffb5],\n.submit-con .middle[data-v-2e91ffb5] {\n  line-height: 36px;\n  height: 36px;\n}\n.submit-con .middle[data-v-2e91ffb5] {\n  text-align: center;\n}\n.submit-con .middle .tooltips[data-v-2e91ffb5] {\n  padding-left: 10px;\n}\n.submit-con .right[data-v-2e91ffb5] {\n  text-align: right;\n}\n.po-dialog .el-upload[data-v-2e91ffb5] {\n  margin: 0 auto;\n}\n.po-dialog .el-alert[data-v-2e91ffb5] {\n  width: 360px;\n  margin: 0 auto;\n  margin-top: 10px;\n}\n.po-dialog .dialog-body .el-select[data-v-2e91ffb5] {\n  display: inline-block;\n}\n.upload-tips i.el-icon-loading[data-v-2e91ffb5] {\n  font-size: 14px;\n}\n.upload-tips a[data-v-2e91ffb5] {\n  color: #20a0ff;\n}\n", ""]);

	// exports


/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2e91ffb5!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./edit.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2e91ffb5!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./edit.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.ma-dialog .dialog-body .el-table .el-table__body-wrapper {\n  overflow-x: hidden;\n}\n", ""]);

	// exports


/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(137);

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/receives', name: '收货单' }, { path: '/receives/', name: '编辑收货记录' }];
	        var tableData = [];
	        var orderData = {};
	        var materials = [];
	        var dialogVisible = false;
	        var purchaseId = '';
	        var dialogMaterials = false; //选择物料弹窗
	        //验证用户输入值 将来考虑实现一个check.js库 如何复用?
	        var checkNumber = function checkNumber(rule, value, callback) {
	            if (value === '') {
	                return callback(new Error('该值不能为空'));
	            }
	            if (isNaN(value)) {
	                callback(new Error('请输入数字值'));
	            } else {
	                if (parseFloat(value) < 0) {
	                    callback(new Error('金额必须大于0'));
	                } else {
	                    callback();
	                }
	            }
	        };
	        return {
	            crumbs: crumbs,
	            tableData: tableData,
	            orderData: orderData,
	            materials: materials,
	            dialogVisible: dialogVisible,
	            dialogMaterials: dialogMaterials,
	            purchaseId: purchaseId,
	            multipleSelection: [],
	            checkedMaterials: [], //选择物料弹窗
	            payStatus: [{ value: 0, name: "否" }, { value: 1, name: "是" }],
	            batchPurchasers: [], //采购员列表
	            batchSuppliers: [], //供应商列表
	            batchType: 1, //1采购员 2供应商 3是否结算
	            batchSelect: '', // 批量设置为
	            rules: { //验证规则
	                purchasePrice: [{ validator: checkNumber, trigger: 'blur' }],
	                totalFee: [{ validator: checkNumber, trigger: 'blur' }]
	            }
	        };
	    },

	    methods: {
	        handleSelectionChange: function handleSelectionChange(val) {
	            this.multipleSelection = val;
	        },
	        handleCheckAll: function handleCheckAll(val) {
	            //选择物料弹窗
	            this.checkedMaterials = val;
	        },
	        handleExport: function handleExport() {},
	        handlePrint: function handlePrint() {
	            this.$router.push({ name: 'receivesPrint', params: { id: this.purchaseId } });
	        },
	        removeItem: function removeItem() {
	            var that = this;
	            this.multipleSelection.forEach(function (n, key) {
	                that.tableData.remove(n);
	            });
	        },
	        loadAll: function loadAll() {
	            var _this = this;

	            //获取所有物料，采购员和供应商列表
	            this.$http({
	                url: '/pms/purchase/material/list.do',
	                method: 'POST',
	                body: { requestData: JSON.stringify({ "materialName": "" }) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.materials = data.result;
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	            this.$http({
	                url: '/pms/receipt/user/option.do',
	                method: 'POST'
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.batchPurchasers = data.result.pmsPurchaserVos;
	                    _this.batchSuppliers = data.result.pmsSupplierVos;
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },
	        fetchData: function fetchData() {
	            var _this2 = this;

	            //获取编辑的信息
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
	                    _this2.tableData = data.result.pmsReceiptVo.pmsReceiptDetailVos;
	                    _this2.orderData.createUserName = data.result.pmsReceiptVo.createUserName;
	                    _this2.orderData.purchaseNo = data.result.pmsReceiptVo.purchaseNo;
	                    _this2.orderData.purchaseRemark = data.result.pmsReceiptVo.purchaseRemark;
	                    _this2.orderData.createTime = data.result.pmsReceiptVo.createTime;
	                } else {
	                    _this2.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ path: '/receives' });
	        },
	        handleSubmitPO: function handleSubmitPO() {
	            var _this3 = this;

	            /*奇葩的验证 start*/
	            var that = this;
	            var pass = true;
	            this.tableData.forEach(function (n, key) {
	                var field1 = 'row' + key + 'a';
	                var field2 = 'row' + key + 'b';
	                that.$refs[field1].validate(function (valid) {
	                    if (!valid) {
	                        pass = false;
	                    }
	                });
	                that.$refs[field2].validate(function (valid) {
	                    if (!valid) {
	                        pass = false;
	                    }
	                });
	            });
	            if (!pass) {
	                return false;
	            }
	            /*奇葩的验证 end*/
	            var requestData = {};
	            var requestUrl = '/pms/receipt/detail/edit.do';
	            var retMsg = '编辑收货记录成功';
	            requestData.pmsReceiptDetailVos = this.tableData;
	            requestData.receiptId = this.receiptId;
	            this.$http({
	                url: requestUrl,
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this3.$message({
	                        message: retMsg,
	                        type: 'success'
	                    });
	                    _this3.$router.push('/receives');
	                } else {
	                    _this3.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },

	        /*validates & computed functions*/
	        handleChangePrice: function handleChangePrice(row) {
	            var number = +row.purchasePrice;
	            row.totalFee = isNaN(number) ? 0 : parseFloat(number * row.receivedCount).toFixed(2);
	        },
	        handleChangeTotal: function handleChangeTotal(row) {
	            var number = +row.totalFee;
	            if (row.receivedCount > 0) {
	                row.purchasePrice = isNaN(number) ? 0 : (row.totalFee / row.receivedCount).toFixed(2);
	            }
	        },
	        handleChangeCount: function handleChangeCount(row) {
	            var number = +row.purchasePrice;
	            setTimeout(function () {
	                row.totalFee = isNaN(number) ? 0 : parseFloat(number * row.receivedCount).toFixed(2);
	            }, 0);
	        },

	        /*dialog 批量操纵*/
	        handleBatchTypeChange: function handleBatchTypeChange() {
	            this.batchSelect = '';
	        },
	        handleCancelDialog: function handleCancelDialog() {
	            this.dialogVisible = false;
	        },
	        handleConfirmDialog: function handleConfirmDialog() {
	            var that = this;
	            var objKey = "purchaserId";
	            switch (parseInt(that.batchType)) {
	                case 1:
	                    {
	                        objKey = "purchaserId";
	                        break;
	                    }
	                case 2:
	                    {
	                        objKey = "supplierId";
	                        break;
	                    }
	                case 3:
	                    {
	                        objKey = "payStatus";
	                        break;
	                    }
	            }
	            this.multipleSelection.forEach(function (n, key) {
	                n[objKey] = that.batchSelect;
	                // let firstAdult = that.tableData.find(el => el.materialId == n.materialId)
	                //that.tableData.remove(n)
	            });
	            this.dialogVisible = false;
	        },
	        handleCancelDialogMaterials: function handleCancelDialogMaterials() {
	            this.checkedMaterials = [];
	            this.$refs.materials.clearSelection();
	            this.dialogMaterials = false;
	        },
	        handleConfirmDialogMaterials: function handleConfirmDialogMaterials() {
	            var that = this;
	            this.checkedMaterials.forEach(function (n, key) {
	                var arr = [{
	                    "materialId": n.materialId,
	                    "materialName": n.materialName,
	                    "materialTypeId": "",
	                    "materialTypeName": n.materialTypeName,
	                    "materialUnitId": "",
	                    "materialUnitName": n.materialUnitName,
	                    "no": that.tableData.length + 1,
	                    "payStatus": 0,
	                    "purchaseCount": 0,
	                    "purchaseId": "",
	                    "purchasePrice": 0,
	                    "purchaserId": "",
	                    "purchaserName": "",
	                    "receiptDetailId": "",
	                    "receivedCount": 0,
	                    "supplierId": "",
	                    "supplierName": "",
	                    "totalFee": 0
	                }];
	                that.tableData = that.tableData.concat(arr);
	            });
	            this.checkedMaterials = [];
	            this.$refs.materials.clearSelection();
	            this.dialogMaterials = false;
	        }
	    },
	    created: function created() {
	        this.loadAll();
	        this.receiptId = this.$route.params.id ? this.$route.params.id : '';
	        this.fetchData();
	    },

	    computed: (0, _vuex.mapState)({
	        user: function user(state) {
	            return state.user;
	        },
	        showBatchOption: function showBatchOption(state) {
	            return this.multipleSelection.length > 0;
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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

/***/ 187:
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
	  }, ["编辑收货记录"])]), " ", _h('el-col', {
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
	  }, ["开单人：" + _vm._s(_vm.orderData.createUserName)])]), " ", _h('el-row', [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["备注：" + _vm._s(_vm.orderData.purchaseRemark)])])])])])]), " ", _h('div', {
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    attrs: {
	      "type": "primary",
	      "disabled": !_vm.showBatchOption
	    },
	    on: {
	      "click": function($event) {
	        _vm.dialogVisible = true
	      }
	    }
	  }, ["批量编辑"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary",
	      "disabled": !_vm.showBatchOption
	    },
	    on: {
	      "click": _vm.removeItem
	    }
	  }, ["删除"]), " "]), " ", _h('el-table', {
	    staticClass: "el-table_my",
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.tableData,
	      "border": ""
	    },
	    on: {
	      "selection-change": _vm.handleSelectionChange
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "selection",
	      "width": "55"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序",
	      "width": "55"
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
	      "min-width": "60"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "label": "进价",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-form', {
	            ref: 'row' + _vm.$index + 'a',
	            attrs: {
	              "model": _vm.row,
	              "rules": _vm.rules
	            }
	          }, [_h('el-form-item', {
	            attrs: {
	              "prop": "purchasePrice"
	            }
	          }, [_h('el-input', {
	            directives: [{
	              name: "model",
	              rawName: "v-model.number",
	              value: (_vm.row.purchasePrice),
	              expression: "row.purchasePrice",
	              modifiers: {
	                "number": true
	              }
	            }],
	            attrs: {
	              "maxlength": 6
	            },
	            domProps: {
	              "value": (_vm.row.purchasePrice)
	            },
	            on: {
	              "blur": function($event) {
	                _vm.handleChangePrice(_vm.row)
	              },
	              "input": function($event) {
	                _vm.row.purchasePrice = _vm._n($event)
	              }
	            }
	          })])])])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "采购数量",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-input-number', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.purchaseCount),
	              expression: "row.purchaseCount"
	            }],
	            attrs: {
	              "placeholder": "采购数量",
	              "min": 0,
	              "max": 9999,
	              "maxlength": 6
	            },
	            domProps: {
	              "value": (_vm.row.purchaseCount)
	            },
	            on: {
	              "input": function($event) {
	                _vm.row.purchaseCount = $event
	              }
	            }
	          })])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "收货数量",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-input-number', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.receivedCount),
	              expression: "row.receivedCount"
	            }],
	            attrs: {
	              "placeholder": "收货数量",
	              "min": 0,
	              "max": 9999
	            },
	            domProps: {
	              "value": (_vm.row.receivedCount)
	            },
	            on: {
	              "change": function($event) {
	                _vm.handleChangeCount(_vm.row)
	              },
	              "input": function($event) {
	                _vm.row.receivedCount = $event
	              }
	            }
	          })])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "单位",
	      "min-width": "50"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "合计",
	      "min-width": "120"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-form', {
	            ref: 'row' + _vm.$index + 'b',
	            attrs: {
	              "model": _vm.row,
	              "rules": _vm.rules
	            }
	          }, [_h('el-form-item', {
	            attrs: {
	              "prop": "totalFee"
	            }
	          }, [_h('el-input', {
	            directives: [{
	              name: "model",
	              rawName: "v-model.number",
	              value: (_vm.row.totalFee),
	              expression: "row.totalFee",
	              modifiers: {
	                "number": true
	              }
	            }],
	            attrs: {
	              "maxlength": 8
	            },
	            domProps: {
	              "value": (_vm.row.totalFee)
	            },
	            on: {
	              "blur": function($event) {
	                _vm.handleChangeTotal(_vm.row)
	              },
	              "input": function($event) {
	                _vm.row.totalFee = _vm._n($event)
	              }
	            }
	          })])])])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "是否付款",
	      "min-width": "80"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-select', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.payStatus),
	              expression: "row.payStatus"
	            }],
	            domProps: {
	              "value": (_vm.row.payStatus)
	            },
	            on: {
	              "input": function($event) {
	                _vm.row.payStatus = $event
	              }
	            }
	          }, [_vm._l((_vm.payStatus), function(item) {
	            return _h('el-option', {
	              attrs: {
	                "label": item.name,
	                "value": item.value
	              }
	            })
	          })])])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "采购员",
	      "min-width": "100",
	      "show-overflow-tooltip": ""
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('el-select', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.purchaserId),
	              expression: "row.purchaserId"
	            }],
	            attrs: {
	              "placeholder": "请选择"
	            },
	            domProps: {
	              "value": (_vm.row.purchaserId)
	            },
	            on: {
	              "input": function($event) {
	                _vm.row.purchaserId = $event
	              }
	            }
	          }, [_vm._l((_vm.batchPurchasers), function(item) {
	            return _h('el-option', {
	              attrs: {
	                "label": item.purchaseName,
	                "value": item.purchaserId
	              }
	            })
	          })])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "供应商",
	      "min-width": "100",
	      "show-overflow-tooltip": ""
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('el-select', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.supplierId),
	              expression: "row.supplierId"
	            }],
	            attrs: {
	              "placeholder": "请选择"
	            },
	            domProps: {
	              "value": (_vm.row.supplierId)
	            },
	            on: {
	              "input": function($event) {
	                _vm.row.supplierId = $event
	              }
	            }
	          }, [_vm._l((_vm.batchSuppliers), function(item) {
	            return _h('el-option', {
	              attrs: {
	                "label": item.supplierName,
	                "value": item.supplierId
	              }
	            })
	          })])
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('div', {
	    staticClass: "remark-con"
	  }, [_h('el-button', {
	    attrs: {
	      "type": "primary",
	      "icon": "plus"
	    },
	    on: {
	      "click": function($event) {
	        _vm.dialogMaterials = true
	      }
	    }
	  }, ["添加物料"])]), " ", _h('div', {
	    staticClass: "submit-con"
	  }, [_h('el-row', {
	    staticClass: "row-bg",
	    attrs: {
	      "type": "flex",
	      "justify": "space-between"
	    }
	  }, [_h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content right"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleBackToList
	    }
	  }, ["取消"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleSubmitPO
	    }
	  }, ["完成编辑"])])])])])])])]), " ", _h('el-dialog', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.dialogVisible),
	      expression: "dialogVisible"
	    }],
	    staticClass: "po-dialog",
	    attrs: {
	      "title": "批量编辑",
	      "size": "small"
	    },
	    domProps: {
	      "value": (_vm.dialogVisible)
	    },
	    on: {
	      "input": function($event) {
	        _vm.dialogVisible = $event
	      }
	    }
	  }, [_h('div', {
	    staticClass: "dialog-body"
	  }, [_h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.batchType),
	      expression: "batchType"
	    }],
	    attrs: {
	      "placeholder": "请选择"
	    },
	    domProps: {
	      "value": (_vm.batchType)
	    },
	    on: {
	      "change": _vm.handleBatchTypeChange,
	      "input": function($event) {
	        _vm.batchType = $event
	      }
	    }
	  }, [_h('el-option', {
	    attrs: {
	      "label": "采购员",
	      "value": 1
	    }
	  }), " ", _h('el-option', {
	    attrs: {
	      "label": "供应商",
	      "value": 2
	    }
	  }), " ", _h('el-option', {
	    attrs: {
	      "label": "是否付款",
	      "value": 3
	    }
	  })]), " ", _h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.batchSelect),
	      expression: "batchSelect"
	    }],
	    attrs: {
	      "placeholder": "请选择"
	    },
	    domProps: {
	      "value": (_vm.batchSelect)
	    },
	    on: {
	      "input": function($event) {
	        _vm.batchSelect = $event
	      }
	    }
	  }, [_vm._l((_vm.batchPurchasers), function(item) {
	    return (_vm.batchType == 1) ? _h('el-option', {
	      attrs: {
	        "label": item.purchaseName,
	        "value": item.purchaserId
	      }
	    }) : _vm._e()
	  }), " ", _vm._l((_vm.batchSuppliers), function(item) {
	    return (_vm.batchType == 2) ? _h('el-option', {
	      attrs: {
	        "label": item.supplierName,
	        "value": item.supplierId
	      }
	    }) : _vm._e()
	  }), " ", _vm._l((_vm.payStatus), function(item) {
	    return (_vm.batchType == 3) ? _h('el-option', {
	      attrs: {
	        "label": item.name,
	        "value": item.value
	      }
	    }) : _vm._e()
	  })])]), " ", _h('div', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleCancelDialog
	    }
	  }, ["取 消"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary",
	      "loading": _vm.user.lock
	    },
	    on: {
	      "click": _vm.handleConfirmDialog
	    }
	  }, ["保存"])])]), " ", _h('el-dialog', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.dialogMaterials),
	      expression: "dialogMaterials"
	    }],
	    staticClass: "ma-dialog",
	    attrs: {
	      "title": "请选择物料",
	      "size": "small"
	    },
	    domProps: {
	      "value": (_vm.dialogMaterials)
	    },
	    on: {
	      "input": function($event) {
	        _vm.dialogMaterials = $event
	      }
	    }
	  }, [_h('div', {
	    staticClass: "dialog-body"
	  }, [_h('el-table', {
	    ref: "materials",
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.materials,
	      "height": "200",
	      "border": ""
	    },
	    on: {
	      "selection-change": _vm.handleCheckAll
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "type": "selection",
	      "width": "55"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "type": "index",
	      "label": "序",
	      "width": "55"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialName",
	      "label": "物料名称",
	      "min-width": "100"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialShortName",
	      "label": "物料简拼",
	      "min-width": "80"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "物料类别",
	      "min-width": "60"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialUnitName",
	      "label": "进货单位",
	      "min-width": "50"
	    }
	  })])]), " ", _h('div', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleCancelDialogMaterials
	    }
	  }, ["取消"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleConfirmDialogMaterials
	    }
	  }, ["选入"])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2e91ffb5", module.exports)
	  }
	}

/***/ }

});