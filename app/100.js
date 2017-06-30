webpackJsonp([100],{

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(132)

	/* script */
	__vue_exports__ = __webpack_require__(136)

	/* template */
	var __vue_template__ = __webpack_require__(138)
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
	__vue_options__.__file = "C:\\Users\\Administrator\\git\\KDRMS_PMSC\\WebContent\\www\\src\\pages\\login\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-012659c4"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-012659c4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-012659c4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(133);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(128)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-012659c4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-012659c4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	// imports


	// module
	exports.push([module.id, "\n.login[data-v-012659c4] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #3a4d62;\n  background-image: url(" + __webpack_require__(134) + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  -moz-background-size: cover;\n    -o-background-size: cover;\n       background-size: cover;\n  text-align: center;\n}\n.login[data-v-012659c4]:after {\n  content: ' ';\n  width: 0;\n  height: 100%;\n  vertical-align: middle;\n  display: inline-block;\n}\n.login .header[data-v-012659c4] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 60px;\n  line-height: 60px;\n  color: #fff;\n  text-align: center;\n  font-size: 28px;\n}\n.login .header .item[data-v-012659c4] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n}\n.login .header .left[data-v-012659c4] {\n  left: 10px;\n  padding-left: 46px;\n  background: url(" + __webpack_require__(135) + ") no-repeat center left;\n  -moz-background-size: 40px;\n    -o-background-size: 40px;\n       background-size: 40px;\n}\n.login .header .right[data-v-012659c4] {\n  right: 10px;\n}\n.login .header .right i[data-v-012659c4] {\n  font-size: 32px;\n  display: inline-block;\n  vertical-align: text-bottom;\n  padding-right: 0px;\n  line-height: 31px;\n}\n.form-login[data-v-012659c4] {\n  width: 560px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 50px 90px 80px 90px;\n  display: inline-block;\n  vertical-align: middle;\n  background-color: #fcfcfb;\n  -webkit-border-radius: 8px;\n     -moz-border-radius: 8px;\n          border-radius: 8px;\n}\n.form-login h3[data-v-012659c4] {\n  color: #404040;\n  font-size: 28px;\n  text-align: center;\n  margin-bottom: 46px;\n}\n.form-login .chrome-hack[data-v-012659c4] {\n  display: none;\n}\n.form-login .el-button--primary[data-v-012659c4]:focus,\n.form-login .el-button--primary[data-v-012659c4]:hover {\n  background: #475669;\n  border-color: #475669;\n  color: #fff;\n}\n.form-login .button-login[data-v-012659c4] {\n  width: 100%;\n  background-color: #3a4d62;\n  border-color: #3a4d62;\n}\n.form-login .left[data-v-012659c4] {\n  text-align: left;\n}\n.form-login .box[data-v-012659c4] {\n  margin: 10px 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bg3.jpg";

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "logo.png";

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(137);

	exports.default = {
	    data: function data() {
	        var checkUser = function checkUser(rule, value, callback) {
	            if (!value) {
	                return callback(new Error('请输入用户名'));
	            } else {
	                callback();
	            }
	        };
	        var validatePass = function validatePass(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请输入密码'));
	            } else {
	                callback();
	            }
	        };
	        return {
	            ruleForm2: {
	                rememberme: false,
	                rememberps: false,
	                password: '',
	                username: '',
	                captchaObj: {}
	            },
	            rules2: {
	                password: [{ validator: validatePass, trigger: 'blur' }],
	                username: [{ validator: checkUser, trigger: 'blur' }]
	            }
	        };
	    },

	    methods: _extends({}, (0, _vuex.mapActions)(['SIGNIN']), {
	        submit: function submit() {
	            var _this = this;

	            var validate = this.captchaObj.getValidate();
	            this.$http({
	                url: '/pms/account/signin.do',
	                method: 'POST',
	                body: {
	                    username: this.ruleForm2.username,
	                    password: this.ruleForm2.password,
	                    geetest_challenge: validate.geetest_challenge,
	                    geetest_validate: validate.geetest_validate,
	                    geetest_seccode: validate.geetest_seccode
	                },
	                emulateJSON: true
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                if (data.code == 200) {
	                    _this.SIGNIN(data.result);
	                    _this.setStorage();
	                    _this.$router.replace({ path: '/' });
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	            });
	        },
	        handleReset2: function handleReset2() {
	            this.$refs.ruleForm2.resetFields();
	        },
	        handleSubmit2: function handleSubmit2(ev) {
	            var _this2 = this;

	            this.$refs.ruleForm2.validate(function (valid) {
	                if (valid) {
	                    if (_this2.captchaObj && _this2.captchaObj.getValidate instanceof Function) {
	                        var captCha = _this2.captchaObj.getValidate();
	                        if (captCha) {
	                            _this2.submit();
	                        } else {
	                            _this2.$message({
	                                message: '请先拖动滑块完成验证',
	                                type: 'warning'
	                            });
	                        }
	                    } else {
	                        _this2.$message({
	                            message: '网络异常，请检查您的网络设置',
	                            type: 'error'
	                        });
	                    }
	                } else {
	                    console.log('error submit!!');
	                    return false;
	                }
	            });
	        },
	        handleKeyDown: function handleKeyDown(e) {
	            if (e.keyCode == 13) {
	                this.handleSubmit2();
	            }
	        },

	        //加载滑块验证码
	        getCaptcha: function getCaptcha() {
	            var that = this;
	            this.$http({
	                url: "/pms/slidecheck/getCode.do?t=" + new Date().getTime(), // 加随机数防止缓存
	                method: "POST"
	            }).then(function (res) {
	                return res.body;
	            }).then(function (data) {
	                // 使用initGeetest接口
	                // 参数1：配置参数
	                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
	                initGeetest({
	                    gt: data.gt,
	                    challenge: data.challenge,
	                    product: "float",
	                    offline: !data.success
	                }, that.handlerEmbed);
	            });
	        },
	        handlerEmbed: function handlerEmbed(captchaObj) {
	            // 将验证码加到id为captcha的元素里
	            captchaObj.appendTo("#float-captcha");
	            this.captchaObj = captchaObj;
	        },

	        //检查是否有记住用户名密码
	        getStorage: function getStorage() {
	            var storage = window.localStorage;
	            var getUid = storage["username"];
	            var getPwd = storage["password"];
	            var getrememberme = storage["rememberme"];
	            var getrememberps = storage["rememberps"];
	            if (getrememberme == "1") {
	                this.ruleForm2.rememberme = true;
	                this.ruleForm2.username = getUid;
	                if (getrememberps == "1") {
	                    this.ruleForm2.rememberps = true;
	                    this.ruleForm2.password = getPwd;
	                }
	            }
	        },
	        setStorage: function setStorage() {
	            var storage = window.localStorage;
	            if (!!this.ruleForm2.rememberme) {
	                storage["rememberme"] = 1;
	                storage["username"] = this.ruleForm2.username;
	                if (!!this.ruleForm2.rememberps) {
	                    storage["rememberps"] = 1;
	                    storage["password"] = this.ruleForm2.password;
	                } else {
	                    storage["rememberps"] = 0;
	                    storage["password"] = "";
	                }
	            } else {
	                storage["rememberme"] = 0;
	                storage["username"] = "";
	            }
	        }
	    }),
	    created: function created() {
	        window.addEventListener("keydown", this.handleKeyDown);
	        this.getCaptcha();
	        this.getStorage();
	    },

	    beforeDestroy: function beforeDestroy() {
	        window.removeEventListener("keydown", this.handleKeyDown);
	    }
	};

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "login"
	  }, [_h('el-form', {
	    ref: "ruleForm2",
	    staticClass: "form-login",
	    attrs: {
	      "model": _vm.ruleForm2,
	      "rules": _vm.rules2
	    }
	  }, [_h('h3', ["登录客到账号"]), " ", _h('input', {
	    staticClass: "chrome-hack",
	    attrs: {
	      "type": "text"
	    }
	  }), " ", _h('el-form-item', {
	    attrs: {
	      "prop": "username"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model.trim",
	      value: (_vm.ruleForm2.username),
	      expression: "ruleForm2.username",
	      modifiers: {
	        "trim": true
	      }
	    }],
	    attrs: {
	      "size": "large",
	      "placeholder": "登录名/手机号/员工号"
	    },
	    domProps: {
	      "value": (_vm.ruleForm2.username)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ruleForm2.username = (typeof $event === 'string' ? $event.trim() : $event)
	      }
	    }
	  })]), " ", _h('el-form-item', {
	    attrs: {
	      "prop": "password"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.ruleForm2.password),
	      expression: "ruleForm2.password"
	    }],
	    attrs: {
	      "size": "large",
	      "type": "password",
	      "auto-complete": "off",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": (_vm.ruleForm2.password)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ruleForm2.password = $event
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "box"
	  }, [_h('div', {
	    staticClass: "box-captcha",
	    attrs: {
	      "id": "float-captcha"
	    }
	  })]), " ", _h('el-form-item', {
	    staticClass: "left"
	  }, [_h('el-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.ruleForm2.rememberme),
	      expression: "ruleForm2.rememberme"
	    }],
	    domProps: {
	      "value": (_vm.ruleForm2.rememberme)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ruleForm2.rememberme = $event
	      }
	    }
	  }, ["记住用户名"]), " ", _h('el-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.ruleForm2.rememberps),
	      expression: "ruleForm2.rememberps"
	    }],
	    domProps: {
	      "value": (_vm.ruleForm2.rememberps)
	    },
	    on: {
	      "input": function($event) {
	        _vm.ruleForm2.rememberps = $event
	      }
	    }
	  }, ["记住密码"])]), " ", _h('el-form-item', [_h('el-button', {
	    staticClass: "button-login",
	    attrs: {
	      "size": "large",
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.handleSubmit2
	    }
	  }, ["立刻登录"])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-012659c4", module.exports)
	  }
	}

/***/ }

});