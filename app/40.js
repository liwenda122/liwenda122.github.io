webpackJsonp([40],{

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

/***/ 649:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(650)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(652),
	  /* template */
	  __webpack_require__(653),
	  /* scopeId */
	  "data-v-6e2b59a8",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(651);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("7ecd28f0", content, true);

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".po-dialog .el-upload[data-v-6e2b59a8]{margin:0 auto}.po-dialog .el-alert[data-v-6e2b59a8]{width:360px;margin:0 auto;margin-top:10px}", ""]);

	// exports


/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(utils) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vuex = __webpack_require__(443);

	exports.default = {
	    data: function data() {
	        return {
	            importedData: [], //导入内容
	            dialogVisible: '',
	            showTemplateLoading: true,
	            templateUrl: '',
	            uploadDescShow: false,
	            uploadDesc: ''
	        };
	    },

	    methods: {
	        close: function close() {
	            this.$router.push('/settings/handleMateriel/index');
	        },

	        /*导入相关*/
	        handleRemove: function handleRemove(file, fileList) {
	            //importedData.clear()
	            this.importedData = [];
	        },
	        handleSuccess: function handleSuccess(response, file, fileList) {
	            if (response.code == 200) {
	                //here array concat/append to importedData
	                utils.postJSON('/pms/import/material/template/query.do', { uploadId: response.result }, this).then(function (data) {
	                    this.uploadDescShow = true;
	                    this.uploadDesc = '\u672C\u6B21\u5BFC\u5165\u7269\u6599' + data.result.pmsUpload.totalNum + '\u4E2A\uFF0C\u5176\u4E2D\u6210\u529F' + data.result.pmsUpload.successNum + '\u4E2A\uFF0C\u5931\u8D25' + data.result.pmsUpload.errorNum + '\u4E2A';
	                });
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
	            console.log(err);
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
	            //concat all importedData to tableData
	        },
	        loadTemplate: function loadTemplate() {
	            var _this = this;

	            //加载导入模板地址
	            this.$http({
	                url: '/pms/download/material/template/export.do',
	                method: 'POST'
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.showTemplateLoading = false;
	                    _this.templateUrl = data.result;
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        }
	    },
	    created: function created() {
	        this.loadTemplate();
	    },

	    computed: (0, _vuex.mapState)({ user: function user(state) {
	            return state.user;
	        } })
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(464)))

/***/ }),

/***/ 653:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-dialog', {
	    staticClass: "po-dialog",
	    attrs: {
	      "title": "导入物料",
	      "size": "small"
	    },
	    on: {
	      "close": _vm.close
	    },
	    model: {
	      value: (_vm.dialogVisible),
	      callback: function($$v) {
	        _vm.dialogVisible = $$v
	      },
	      expression: "dialogVisible"
	    }
	  }, [_c('el-upload', {
	    attrs: {
	      "action": "/pms/import/material/template.do",
	      "type": "drag",
	      "multiple": false,
	      "on-remove": _vm.handleRemove,
	      "on-success": _vm.handleSuccess,
	      "on-error": _vm.handleError
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-upload"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "el-dragger__text"
	  }, [_vm._v("将Excel文件拖到此处，或"), _c('em', [_vm._v("点击上传")]), _c('p', [_vm._v("每次导入最多200条")])]), _vm._v(" "), _c('div', {
	    staticClass: "el-upload__tip",
	    slot: "tip"
	  }, [(_vm.showTemplateLoading) ? _c('div', {
	    staticClass: "upload-tips"
	  }, [_c('i', {
	    staticClass: "el-icon-loading"
	  }), _vm._v("正在生成导入模板...")]) : _vm._e(), _vm._v(" "), (!_vm.showTemplateLoading) ? _c('div', {
	    staticClass: "upload-tips"
	  }, [_vm._v("仅支持Excel格式，首次使用请先"), _c('a', {
	    attrs: {
	      "href": _vm.templateUrl
	    }
	  }, [_vm._v("下载模板")])]) : _vm._e()])]), _vm._v(" "), (_vm.uploadDescShow) ? _c('el-alert', {
	    attrs: {
	      "title": "导入完成",
	      "type": "success",
	      "description": _vm.uploadDesc,
	      "show-icon": ""
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.handleCancelUpload
	    }
	  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleConfirmUpload
	    }
	  }, [_vm._v("确认导入")])], 1)], 1)
	},staticRenderFns: []}

/***/ })

});