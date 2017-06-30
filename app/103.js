webpackJsonp([103],{

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(150)

	/* script */
	__vue_exports__ = __webpack_require__(152)

	/* template */
	var __vue_template__ = __webpack_require__(153)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\purchase\\create.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-5204b136"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5204b136", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5204b136", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] create.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(151);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5204b136&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./create.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5204b136&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./create.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.el-table .el-input-con[data-v-5204b136] {\n  padding: 8px 0;\n}\n.el-table .el-input-con .small-input[data-v-5204b136] {\n  width: 180px;\n}\n.el-table .el-input-con .el-input-number[data-v-5204b136] {\n  width: 120px;\n  display: block;\n}\n.el-table .el-input-con .el-form-item[data-v-5204b136] {\n  margin: 10px 0;\n}\n.remark-con[data-v-5204b136] {\n  padding: 20px 0;\n}\n.submit-con[data-v-5204b136] {\n  border-top: 1px solid #e5e5e5;\n  padding: 20px 0;\n  color: #475669;\n}\n.submit-con .orange[data-v-5204b136] {\n  color: #ff6600;\n}\n.submit-con .left[data-v-5204b136],\n.submit-con .middle[data-v-5204b136] {\n  line-height: 36px;\n  height: 36px;\n}\n.submit-con .middle[data-v-5204b136] {\n  text-align: center;\n}\n.submit-con .middle .tooltips[data-v-5204b136] {\n  padding-left: 10px;\n}\n.submit-con .right[data-v-5204b136] {\n  text-align: right;\n}\n.po-dialog .el-upload[data-v-5204b136] {\n  margin: 0 auto;\n}\n.po-dialog .el-alert[data-v-5204b136] {\n  width: 360px;\n  margin: 0 auto;\n  margin-top: 10px;\n}\n.upload-tips i.el-icon-loading[data-v-5204b136] {\n  font-size: 14px;\n}\n.upload-tips a[data-v-5204b136] {\n  color: #20a0ff;\n}\n", ""]);

	// exports


/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(137);

	exports.default = {
	    data: function data() {
	        var crumbs = [{ path: '/', name: '首页' }, { path: '/purchase', name: '开采购单' }, { path: '/purchase/create', name: '开单' }];
	        var tableData = [{
	            materialId: '',
	            materialName: '',
	            materialUnitName: '--',
	            purchaseCount: 0,
	            materialTypeName: '--'
	        }];
	        var newTableData = [{
	            materialId: '',
	            materialName: '',
	            materialUnitName: '--',
	            purchaseCount: 0,
	            materialTypeName: '--'
	        }];
	        var materials = [];
	        var remark = '';
	        var isInternal = false;
	        var dialogVisible = false;
	        var purchaseId = '';
	        var showTemplateLoading = true; //正在加载导入模板
	        var templateUrl = ''; //导入模板地址
	        var importedData = []; //导入内容
	        var uploadDescShow = false; //导入结果显示
	        var uploadDesc = ''; //导入结果
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
	            newTableData: newTableData,
	            materials: materials,
	            remark: remark,
	            isInternal: isInternal,
	            dialogVisible: dialogVisible,
	            purchaseId: purchaseId,
	            showTemplateLoading: showTemplateLoading,
	            templateUrl: templateUrl,
	            importedData: importedData,
	            uploadDescShow: uploadDescShow,
	            uploadDesc: uploadDesc,
	            rules: { //验证规则
	                materialId: [{ required: true, message: '必须选择一个物料', trigger: 'change' }]
	            }
	        };
	    },

	    methods: {
	        removeItem: function removeItem(item) {
	            this.tableData.remove(item);
	        },
	        loadAll: function loadAll() {
	            var _this = this;

	            //获取所有物料
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
	        },
	        loadTemplate: function loadTemplate() {
	            var _this2 = this;

	            //加载导入模板地址
	            this.$http({
	                url: '/pms/download/purchase/template/export.do',
	                method: 'POST'
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this2.showTemplateLoading = false;
	                    _this2.templateUrl = data.result;
	                } else {
	                    _this2.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },
	        fetchData: function fetchData() {
	            var _this3 = this;

	            //获取的信息
	            var purchaseId = this.$route.params.id;
	            var requestData = { "purchaseId": purchaseId };
	            this.$http({
	                url: '/pms/purchase/order/show.do',
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this3.tableData = data.result.pmsPurchaseVo.pmsPurchaseDetailVos;
	                    _this3.remark = data.result.pmsPurchaseVo.purchaseRemark;
	                } else {
	                    _this3.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },
	        handleChangeMaterial: function handleChangeMaterial(item) {
	            if (item.materialId != undefined && item.materialId != '') {
	                var index = this.materials.findIndex(function (el, index, arr) {
	                    return el.materialId == item.materialId;
	                });
	                if (index > -1) {
	                    item.materialTypeName = this.materials[index].materialTypeName;
	                    //here id
	                    item.materialUnitName = this.materials[index].materialUnitName;
	                    //here id
	                    item.materialName = this.materials[index].materialName;
	                }
	            }
	        },
	        handleBlur: function handleBlur(item) {
	            if (item.materialName != undefined && item.materialName != '' && !isNaN(item.purchaseCount) && item.purchaseCount > 0) {
	                this.tableData.push({
	                    materialName: item.materialName,
	                    materialTypeName: item.materialTypeName,
	                    purchaseCount: item.purchaseCount,
	                    materialUnitName: item.materialUnitName,
	                    materialId: item.materialId
	                });
	                item.materialName = '';
	                item.materialTypeName = '--';
	                item.materialUnitName = '--';
	                item.purchaseCount = '';
	                item.materialId = '';
	            }
	        },
	        handleBackToList: function handleBackToList() {
	            this.$router.push({ path: '/purchase' });
	        },
	        handleSubmitPO: function handleSubmitPO() {
	            var _this4 = this;

	            /*奇葩的验证 start*/
	            var that = this;
	            var pass = true;
	            this.tableData.forEach(function (n, key) {
	                var field1 = 'row' + key;
	                that.$refs[field1].validate(function (valid) {
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
	            var requestUrl = '/pms/purchase/order/create.do';
	            var retMsg = '添加采购单成功';
	            requestData.pmsPurchaseDetailVos = [];
	            this.tableData.forEach(function (n, key) {
	                var obj = {};
	                obj.materialId = n.materialId;
	                obj.purchaseCount = n.purchaseCount;
	                requestData.pmsPurchaseDetailVos.push(obj);
	            });
	            requestData.purchaseRemark = this.remark;
	            if (this.purchaseId != '') {
	                //mode =Edit
	                requestUrl = '/pms/purchase/order/edit.do';
	                retMsg = '更新采购单成功';
	                requestData.purchaseId = this.purchaseId;
	            }
	            this.$http({
	                url: requestUrl,
	                method: 'POST',
	                body: { requestData: JSON.stringify(requestData) },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this4.$message({
	                        message: retMsg,
	                        type: 'success'
	                    });
	                    _this4.$router.push('/purchase');
	                } else {
	                    _this4.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },

	        /*导入相关*/
	        handleRemove: function handleRemove(file, fileList) {
	            //importedData.clear()
	            this.importedData = [];
	        },
	        handleSuccess: function handleSuccess(response, file, fileList) {
	            if (response.code == 200) {
	                //here array concat/append to importedData
	                this.importedData = this.importedData.concat(response.result.pmsPurchaseParseDetailVoL);
	                //when click OK , concat all importedData to tableData
	                this.uploadDescShow = true;
	                this.uploadDesc = '\u672C\u6B21\u5BFC\u5165\u7269\u6599' + (response.result.pmsPurchaseParseDetailVoL.length + response.result.pmsPurchaseParseDetailVoErrorL.length) + '\u4E2A\uFF0C\u5176\u4E2D\u6210\u529F' + response.result.pmsPurchaseParseDetailVoL.length + '\u4E2A\uFF0C\u5931\u8D25' + response.result.pmsPurchaseParseDetailVoErrorL.length + '\u4E2A';
	            } else {
	                this.$message({
	                    message: response.message,
	                    type: 'warning'
	                });
	            }
	        },
	        handleError: function handleError(err, response, file) {
	            this.$message({
	                message: err,
	                type: 'warning'
	            });
	        },
	        handleCancelUpload: function handleCancelUpload() {
	            this.dialogVisible = false;
	            this.uploadDescShow = false;
	            //remove all importedData
	            this.importedData = [];
	        },
	        handleConfirmUpload: function handleConfirmUpload() {
	            this.dialogVisible = false;
	            this.uploadDescShow = false;
	            this.tableData = this.tableData.concat(this.importedData);
	            //concat all importedData to tableData
	        }
	    },
	    created: function created() {
	        this.loadAll();
	        this.loadTemplate();
	        this.purchaseId = this.$route.params.id ? this.$route.params.id : '';
	        if (this.purchaseId != '') {
	            //this is edit
	            this.fetchData();
	            this.crumbs = [{ path: '/', name: '首页' }, { path: '/purchase', name: '开采购单' }, { path: '/purchase/create', name: '编辑' }];
	        }
	    },

	    computed: (0, _vuex.mapState)({
	        user: function user(state) {
	            return state.user;
	        },
	        showAdd: function showAdd(state) {
	            //here
	            var item = this.newTableData[0];
	            return item.materialName != undefined && item.materialName != '' && !isNaN(item.purchaseCount) && item.purchaseCount > 0;
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

/***/ },

/***/ 153:
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
	    staticClass: "button-bar"
	  }, [_h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": function($event) {
	        _vm.dialogVisible = true
	      }
	    }
	  }, ["导入"])]), " ", _h('el-table', {
	    staticClass: "el-table_my",
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.tableData,
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
	      "context": _vm._self,
	      "label": "物料名称",
	      "min-width": "150"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-form', {
	            ref: 'row' + _vm.$index,
	            attrs: {
	              "model": _vm.row,
	              "rules": _vm.rules
	            }
	          }, [_h('el-form-item', {
	            attrs: {
	              "prop": "materialId"
	            }
	          }, [_h('el-select', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.materialId),
	              expression: "row.materialId"
	            }],
	            attrs: {
	              "clearable": "",
	              "filterable": "",
	              "placeholder": "物料名称"
	            },
	            domProps: {
	              "value": (_vm.row.materialId)
	            },
	            on: {
	              "change": function($event) {
	                _vm.handleChangeMaterial(_vm.row)
	              },
	              "input": function($event) {
	                _vm.row.materialId = $event
	              }
	            }
	          }, [_vm._l((_vm.materials), function(item) {
	            return _h('el-option', {
	              attrs: {
	                "label": item.materialName,
	                "value": item.materialId
	              }
	            })
	          })])])])])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "物料类别",
	      "min-width": "150"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "采购数量",
	      "min-width": "200"
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
	              "max": 9999
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
	      "prop": "materialUnitName",
	      "label": "进货单位",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_h('el-button', {
	            attrs: {
	              "type": "primary",
	              "size": "small"
	            },
	            on: {
	              "click": function($event) {
	                _vm.removeItem(_vm.row)
	              }
	            }
	          }, ["删除"])])
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('el-table', {
	    staticStyle: {
	      "width": "100%",
	      "border-top": "none"
	    },
	    attrs: {
	      "data": _vm.newTableData,
	      "height": "240",
	      "border": "",
	      "show-header": false
	    }
	  }, [_h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "序号",
	      "width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span', [_vm._s(_vm.tableData.length + 1)])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "物料名称",
	      "min-width": "150"
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
	              value: (_vm.row.materialId),
	              expression: "row.materialId"
	            }],
	            attrs: {
	              "clearable": "",
	              "filterable": "",
	              "placeholder": "物料名称"
	            },
	            domProps: {
	              "value": (_vm.row.materialId)
	            },
	            on: {
	              "change": function($event) {
	                _vm.handleChangeMaterial(_vm.row)
	              },
	              "input": function($event) {
	                _vm.row.materialId = $event
	              }
	            }
	          }, [_vm._l((_vm.materials), function(item) {
	            return _h('el-option', {
	              attrs: {
	                "label": item.materialName,
	                "value": item.materialId
	              }
	            })
	          })])])
	        
	      },
	      staticRenderFns: []
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "prop": "materialTypeName",
	      "label": "物料类别",
	      "min-width": "150"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "采购数量",
	      "min-width": "200"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('div', {
	            staticClass: "el-input-con"
	          }, [_h('el-input', {
	            directives: [{
	              name: "model",
	              rawName: "v-model",
	              value: (_vm.row.purchaseCount),
	              expression: "row.purchaseCount"
	            }],
	            staticClass: "small-input",
	            attrs: {
	              "placeholder": "采购数量",
	              "minlength": 1,
	              "maxlength": 6
	            },
	            domProps: {
	              "value": (_vm.row.purchaseCount)
	            },
	            on: {
	              "blur": function($event) {
	                _vm.handleBlur(_vm.row)
	              },
	              "click": function($event) {
	                _vm.handleBlur(_vm.row)
	              },
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
	      "prop": "materialUnitName",
	      "label": "进货单位",
	      "min-width": "120"
	    }
	  }), " ", _h('el-table-column', {
	    attrs: {
	      "context": _vm._self,
	      "label": "操作",
	      "min-width": "100"
	    },
	    inlineTemplate: {
	      render: function() {
	        var _vm=this;var _h=_vm.$createElement;
	          return _h('span')
	        
	      },
	      staticRenderFns: []
	    }
	  })]), " ", _h('div', {
	    staticClass: "remark-con"
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.remark),
	      expression: "remark"
	    }],
	    attrs: {
	      "type": "textarea",
	      "autosize": {
	        minRows: 3,
	        maxRows: 5
	      },
	      "placeholder": "填写备注（选填）"
	    },
	    domProps: {
	      "value": (_vm.remark)
	    },
	    on: {
	      "input": function($event) {
	        _vm.remark = $event
	      }
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
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content left"
	  }, ["\n\t\t\t\t\t\t\t\t数量：", _h('span', {
	    staticClass: "orange"
	  }, [_vm._s(_vm.tableData.length)]), "项\n\t\t\t\t\t\t\t"])]), " ", _h('el-col', {
	    attrs: {
	      "span": 8
	    }
	  }, [_h('div', {
	    staticClass: "grid-content middle"
	  }, [_h('el-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.isInternal),
	      expression: "isInternal"
	    }],
	    domProps: {
	      "value": (_vm.isInternal)
	    },
	    on: {
	      "input": function($event) {
	        _vm.isInternal = $event
	      }
	    }
	  }, ["由内部配送"]), " ", _h('el-tooltip', {
	    staticClass: "tooltips",
	    attrs: {
	      "effect": "dark",
	      "placement": "top"
	    }
	  }, [_h('div', {
	    slot: "content"
	  }, ["“由内部配送”主要服务于连锁餐厅或配送管理而用；", _h('br'), "勾选此项，便于发货部门接收订单"]), " ", _h('i', {
	    staticClass: "el-icon-warning"
	  })])])]), " ", _h('el-col', {
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
	      "type": "primary",
	      "loading": _vm.user.lock
	    },
	    on: {
	      "click": _vm.handleSubmitPO
	    }
	  }, ["完成开单"])])])])])])])]), " ", _h('el-dialog', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.dialogVisible),
	      expression: "dialogVisible"
	    }],
	    staticClass: "po-dialog",
	    attrs: {
	      "title": "导入采购单",
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
	  }, [_h('el-upload', {
	    attrs: {
	      "action": "/pms/import/purchase/template.do",
	      "type": "drag",
	      "multiple": false,
	      "on-remove": _vm.handleRemove,
	      "on-success": _vm.handleSuccess,
	      "on-error": _vm.handleError
	    }
	  }, [_h('i', {
	    staticClass: "el-icon-upload"
	  }), " ", _h('div', {
	    staticClass: "el-dragger__text"
	  }, ["将Excel文件拖到此处，或", _h('em', ["点击上传"])]), " ", _h('div', {
	    staticClass: "el-upload__tip",
	    slot: "tip"
	  }, [(_vm.showTemplateLoading) ? _h('div', {
	    staticClass: "upload-tips"
	  }, [_h('i', {
	    staticClass: "el-icon-loading"
	  }), "正在生成导入模板..."]) : _vm._e(), " ", (!_vm.showTemplateLoading) ? _h('div', {
	    staticClass: "upload-tips"
	  }, ["仅支持Excel格式，首次使用请先", _h('a', {
	    attrs: {
	      "href": _vm.templateUrl
	    }
	  }, ["下载模板"])]) : _vm._e()])]), " ", (_vm.uploadDescShow) ? _h('el-alert', {
	    attrs: {
	      "title": "导入完成",
	      "type": "success",
	      "description": _vm.uploadDesc,
	      "show-icon": ""
	    }
	  }) : _vm._e(), " ", _h('div', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_h('el-button', {
	    on: {
	      "click": _vm.handleCancelUpload
	    }
	  }, ["取 消"]), " ", _h('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleConfirmUpload
	    }
	  }, ["确认导入"])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5204b136", module.exports)
	  }
	}

/***/ }

});