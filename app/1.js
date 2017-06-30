webpackJsonp([1],{

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(438)

	var Component = __webpack_require__(434)(
	  /* script */
	  __webpack_require__(442),
	  /* template */
	  __webpack_require__(444),
	  /* scopeId */
	  "data-v-5ee1d749",
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(439);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(432)("9dd73724", content, true);

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(426)();
	// imports


	// module
	exports.push([module.id, ".login[data-v-5ee1d749]{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#3a4d62;background-image:url(" + __webpack_require__(440) + ");background-position:50%;background-repeat:no-repeat;-moz-background-size:cover;-o-background-size:cover;background-size:cover;text-align:center}.login[data-v-5ee1d749]:after{content:\" \";width:0;height:100%;vertical-align:middle;display:inline-block}.login .header[data-v-5ee1d749]{position:absolute;left:0;right:0;height:60px;line-height:60px;color:#fff;text-align:center;font-size:28px}.login .header .item[data-v-5ee1d749]{position:absolute;top:0;bottom:0;z-index:1}.login .header .left[data-v-5ee1d749]{left:10px;padding-left:46px;background:url(" + __webpack_require__(441) + ") no-repeat 0;-moz-background-size:40px;-o-background-size:40px;background-size:40px}.login .header .right[data-v-5ee1d749]{right:10px}.login .header .right i[data-v-5ee1d749]{font-size:32px;display:inline-block;vertical-align:text-bottom;padding-right:0;line-height:31px}.login .footer[data-v-5ee1d749]{display:none;color:#fff;padding-bottom:20px;position:fixed;bottom:0;left:0;right:0}@media screen and (min-height:768px){.login .footer[data-v-5ee1d749]{display:block}}.login .footer ul[data-v-5ee1d749]{text-align:center}.login .footer ul li[data-v-5ee1d749]{display:inline-block;margin:0 10px;font-size:14px;font-size:1rem;cursor:pointer}.login .footer ul li a[data-v-5ee1d749]{height:21px;display:inline-block;cursor:pointer;color:#fff}.login .footer .gov[data-v-5ee1d749]{color:#fff}.login .footer .gov[data-v-5ee1d749]:hover{text-decoration:underline}.login .footer ul li a[data-v-5ee1d749]:hover{color:#ff8d1c}.login .footer p[data-v-5ee1d749]{font-size:12px;font-size:.8rem;text-align:center;margin-top:14px;margin-top:1rem;line-height:24px}.login .footer p img[data-v-5ee1d749]{padding:0 6px;margin-bottom:-3px}.login .thinLine[data-v-5ee1d749]{width:140px;width:10rem;height:1px;background-color:#eaeaea;margin:0 auto;margin-top:20px}.form-login[data-v-5ee1d749]{width:560px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:50px 90px 80px;display:inline-block;vertical-align:middle;background-color:#fcfcfb;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.form-login h3[data-v-5ee1d749]{color:#404040;font-size:28px;text-align:center;margin-bottom:46px}.form-login .chrome-hack[data-v-5ee1d749]{display:none}.form-login .el-button--primary[data-v-5ee1d749]:focus,.form-login .el-button--primary[data-v-5ee1d749]:hover{background:#475669;border-color:#475669;color:#fff}.form-login .button-login[data-v-5ee1d749]{width:100%;background-color:#3a4d62;border-color:#3a4d62;padding:15px 19px}.form-login .left[data-v-5ee1d749]{text-align:left}.form-login .box[data-v-5ee1d749]{margin:22px 0}", ""]);

	// exports


/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bg3.jpg";

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "logo.png";

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(443);

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
	            },
	            loading: false,
	            loginMsg: "立刻登录"
	        };
	    },

	    methods: _extends({}, (0, _vuex.mapActions)(['SIGNIN', 'AUTHORIZE']), {
	        submit: function submit() {
	            var _this = this;

	            this.loading = true;
	            this.loginMsg = '登录中...';
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
	                    //vuex store/user 内定义的mutations
	                    _this.SIGNIN(data.result);
	                    _this.AUTHORIZE(data.result.pmsModuleList);
	                    _this.setStorage();
	                    _this.$router.replace({ path: '/' });
	                } else {
	                    _this.$message({
	                        message: data.message,
	                        type: 'warning'
	                    });
	                }
	                _this.loading = false;
	                _this.loginMsg = '立刻登录';
	            }, function (response) {
	                // 响应错误回调
	                _this.loading = false;
	                _this.loginMsg = '立刻登录';
	            }).catch(function (response) {
	                this.loading = false;
	                this.loginMsg = '立刻登录';
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
	                            message: '网络异常，请检查网络设置或刷新重试',
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
	        //this.getCaptcha();
	        this.getStorage();
	    },

	    beforeDestroy: function beforeDestroy() {
	        window.removeEventListener("keydown", this.handleKeyDown);
	    }
	};

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "login"
	  }, [_vm._m(0), _vm._v(" "), _c('el-form', {
	    ref: "ruleForm2",
	    staticClass: "form-login",
	    attrs: {
	      "model": _vm.ruleForm2,
	      "rules": _vm.rules2
	    }
	  }, [_c('h3', [_vm._v("登录客到账号")]), _vm._v(" "), _c('input', {
	    staticClass: "chrome-hack",
	    attrs: {
	      "type": "text"
	    }
	  }), _vm._v(" "), _c('el-form-item', {
	    attrs: {
	      "prop": "username"
	    }
	  }, [_c('el-input', {
	    attrs: {
	      "size": "large",
	      "placeholder": "登录名/手机号/员工号"
	    },
	    model: {
	      value: (_vm.ruleForm2.username),
	      callback: function($$v) {
	        _vm.ruleForm2.username = (typeof $$v === 'string' ? $$v.trim() : $$v)
	      },
	      expression: "ruleForm2.username"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', {
	    attrs: {
	      "prop": "password"
	    }
	  }, [_c('el-input', {
	    attrs: {
	      "size": "large",
	      "type": "password",
	      "auto-complete": "off",
	      "placeholder": "请输入密码"
	    },
	    model: {
	      value: (_vm.ruleForm2.password),
	      callback: function($$v) {
	        _vm.ruleForm2.password = $$v
	      },
	      expression: "ruleForm2.password"
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "box"
	  }, [_c('div', {
	    staticClass: "box-captcha",
	    attrs: {
	      "id": "float-captcha"
	    }
	  })]), _vm._v(" "), _c('el-form-item', {
	    staticClass: "left"
	  }, [_c('el-checkbox', {
	    model: {
	      value: (_vm.ruleForm2.rememberme),
	      callback: function($$v) {
	        _vm.ruleForm2.rememberme = $$v
	      },
	      expression: "ruleForm2.rememberme"
	    }
	  }, [_vm._v("记住用户名")]), _vm._v(" "), _c('el-checkbox', {
	    model: {
	      value: (_vm.ruleForm2.rememberps),
	      callback: function($$v) {
	        _vm.ruleForm2.rememberps = $$v
	      },
	      expression: "ruleForm2.rememberps"
	    }
	  }, [_vm._v("记住密码")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
	    staticClass: "button-login",
	    attrs: {
	      "size": "large",
	      "type": "primary",
	      "disabled": _vm.loading
	    },
	    on: {
	      "click": _vm.handleSubmit2
	    }
	  }, [_vm._v(_vm._s(_vm.loginMsg))])], 1)], 1), _vm._v(" "), _vm._m(1)], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "header"
	  }, [_c('div', {
	    staticClass: "item left"
	  }, [_vm._v("客到采购管理系统")]), _vm._v(" "), _c('div', {
	    staticClass: "item right"
	  }, [_c('i', {
	    staticClass: "icon-nav_ico_phone"
	  }), _vm._v(" "), _c('span', [_vm._v("400 - 1688 - 927")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "footer",
	    attrs: {
	      "id": "footer"
	    }
	  }, [_c('ul', [_c('li', [_c('a', {
	    attrs: {
	      "href": "http://grkj.cn",
	      "target": "_blank"
	    }
	  }, [_vm._v("关于我们")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://ht.kd.cc/agreements/ctrz.html",
	      "target": "_blank"
	    }
	  }, [_vm._v("餐厅入驻")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://ht.kd.cc/agreements/fwxy.html",
	      "target": "_blank"
	    }
	  }, [_vm._v("商家服务协议")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://ht.kd.cc/agreements/yszc.html",
	      "target": "_blank"
	    }
	  }, [_vm._v("商家隐私政策")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://kd.cc/agent.html",
	      "target": "_blank"
	    }
	  }, [_vm._v("代理商入驻")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://partner.kd.cc/",
	      "target": "_blank"
	    }
	  }, [_vm._v("代理商后台")])]), _vm._v("|\n\t\t\t"), _c('li', [_c('a', {
	    attrs: {
	      "href": "http://grkj.cn/business.html",
	      "target": "_blank"
	    }
	  }, [_vm._v("联系我们")])])]), _vm._v(" "), _c('p', [_vm._v("Copyright©2015-2018 KD.CC 版权所有"), _c('img', {
	    attrs: {
	      "src": __webpack_require__(445)
	    }
	  }), _c('a', {
	    staticClass: "gov",
	    attrs: {
	      "target": "_blank",
	      "href": "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002001294"
	    }
	  }, [_vm._v("苏公网安备  32059002001294号")]), _vm._v("    苏ICP备14055937号")])])
	}]}

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAAPHXrvPpku/oo/Pnqvr0zdiuff784P//4+TQlfTfi/Hfx9ynWfPpq+rYg+GwZ+3egOTCbeS8WdmvgtOTcMqEW8N/Pt2pU+OsU+e1XOnIXue8bOvSmNucUd6nXOzZjf/5wejGfO/Zf//50Pjagv7Yj+rDevv/3uvJef767O3NhuzdsvjOev/vhuS2guS2gOO8ad+vZ5ppXPDWu//3l62LerSUfp9oVeGzaNusYuTBj9u6h/2/VNmobdGudum9Wf/SWM4AAgAAbua6W+7WcumwSunGXurKX+vAV+nBYOKxUea3V96ZRN6jSdWQRuXAU+/NZNQhGTkUOOWyUtQDCZN4WtYfGFE2UdpJKNydQ//bXv7FUtM4ItZlMAAAZtc+INd1OP0sD/LLbt6TPe1xMAAEdwAAeQICa7tMJgAAgPPkcvfidOzNaOfEZuK2X/LJVui5T+i/TuCkTO6+UOSzWum3Uuy5T+7IWunKbdqWSuvFXeW8Uu/KYdKDPdaOPPHTad6DMtYaF+u7XPN8KNV0KNc9IeOvS9ieWM8sGr2QXtYxH/jEWOigPfyOLNeRU6yic7mLWP/vbeOTPf/YTe3CYvCvSJNgNnN2grSjZtSWPdEMEfufRs8XEcEMC6m0kc2sUskAAmx5ik4OTlZOb9bAeMlZKv++YFxfeMwnEwwAXWAeUAAAYcVSJEIkRMQYCl5ZZuOqStkABo2Gd8YnE/BeHtdfM+W1Xcw+LQAAeOeCP3J6gtNAJmkCNrEODtVIKss9IUwAOcY+HYSPmbYAEAAbjv/SZuqCPdOHPdlOKt22afvSb+VgI4FYOqN9UoRpSsRrM55fMOKpV+RvNtttN78AEQAQemtzhGl+jr26fs3CcdeKRvSwQBcwiZWQg9EVCv/iY+tfKXx6edjMd8q2eHlkYPLYeOCORwsGZ8W9h9NlPeJGHqeNWTYaTfaCNtO8h7WAP25iYvekOcWufOmXNM54OgAIkf+1SfrERJSMdXKFlNuGOJKNfhw+l7SZWKOZhPzMZNp07osAAAA/dFJOUwBpq3xBW6wIGgK6QetEk+fh7PRIFF2cxuTk8LyM0sYnQfvsTDCy5inEIZWDwb7HseDb+xw10cv3+fWfmMPlb0PdBigAAAF2SURBVBjTY2CAAA5GM1NGDgZkoMBmfuHMubNGbMoIMfbOoGnnT6ec7A+awA4T49AJD20OiTnhOHteuCpUVN3izfrewMCOiDlzl11bqyYPFjT5kfl6S0hX46yYBQ9uOG1SAYkZ2/xOff9qY1hrfJhj/COnh7qaQEG7j/8y/751XDrT/9m9lJtOdx20gYLWnz99/fA942BswuVb95+kvbhtBRS0/ZX0Jz3j2L79W3dfevn8ztNkQ6Cg5ZdvP9MOJ8auSdiZeCX9evRxA6CgfuT/d0cO7F23eUXE9j1XH58K1gIK6iVfPHooNW71olUr43bsitq2QQMoqNjeNylpSejCGfOXL54+pSeyTQkoyFrt69fSHTU5eqrDRIcGPy93FpDrWaX8a+sCmoLtA+p9KisEecHe5OZ3c/P2qPKssff1dsnlAStk4Mp2ySux9/Is9Slyds7JYoKEJp9QQX6xa5mrR3mhuwAzJzRARUTFxGUlJOWkZYTBQgAlso7dQYeMaQAAAABJRU5ErkJggg=="

/***/ })

});