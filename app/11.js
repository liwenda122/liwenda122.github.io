webpackJsonp([11],{497:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},a=r(7);t.default={data:function(){var e=function(e,t,r){return t?void r():r(new Error("请输入用户名"))},t=function(e,t,r){""===t?r(new Error("请输入密码")):r()};return{ruleForm2:{rememberme:!1,rememberps:!1,password:"",username:"",captchaObj:{}},rules2:{password:[{validator:t,trigger:"blur"}],username:[{validator:e,trigger:"blur"}]},loading:!1,loginMsg:"立刻登录"}},methods:o({},(0,a.mapActions)(["SIGNIN","AUTHORIZE"]),{submit:function(){var e=this;this.loading=!0,this.loginMsg="登录中...";var t=this.captchaObj.getValidate();this.$http({url:"/pms/account/signin.do",method:"POST",body:{username:this.ruleForm2.username,password:this.ruleForm2.password,geetest_challenge:t.geetest_challenge,geetest_validate:t.geetest_validate,geetest_seccode:t.geetest_seccode},emulateJSON:!0}).then(function(e){return e.body}).then(function(t){200==t.code?(e.SIGNIN(t.result),e.AUTHORIZE(t.result.pmsModuleList),e.setStorage(),e.$router.replace({path:"/"})):e.$message({message:t.message,type:"warning"}),e.loading=!1,e.loginMsg="立刻登录"},function(t){e.loading=!1,e.loginMsg="立刻登录"}).catch(function(e){this.loading=!1,this.loginMsg="立刻登录"})},handleReset2:function(){this.$refs.ruleForm2.resetFields()},handleSubmit2:function(e){var t=this;this.$refs.ruleForm2.validate(function(e){if(!e)return console.log("error submit!!"),!1;if(t.captchaObj&&t.captchaObj.getValidate instanceof Function){var r=t.captchaObj.getValidate();r?t.submit():t.$message({message:"请先拖动滑块完成验证",type:"warning"})}else t.$message({message:"网络异常，请检查网络设置或刷新重试",type:"error"})})},handleKeyDown:function(e){13==e.keyCode&&this.handleSubmit2()},getCaptcha:function(){var e=this;this.$http({url:"/pms/slidecheck/getCode.do?t="+(new Date).getTime(),method:"POST"}).then(function(e){return e.body}).then(function(t){initGeetest({gt:t.gt,challenge:t.challenge,product:"float",offline:!t.success},e.handlerEmbed)})},handlerEmbed:function(e){e.appendTo("#float-captcha"),this.captchaObj=e},getStorage:function(){var e=window.localStorage,t=e.username,r=e.password,o=e.rememberme,a=e.rememberps;"1"==o&&(this.ruleForm2.rememberme=!0,this.ruleForm2.username=t,"1"==a&&(this.ruleForm2.rememberps=!0,this.ruleForm2.password=r))},setStorage:function(){var e=window.localStorage;this.ruleForm2.rememberme?(e.rememberme=1,e.username=this.ruleForm2.username,this.ruleForm2.rememberps?(e.rememberps=1,e.password=this.ruleForm2.password):(e.rememberps=0,e.password="")):(e.rememberme=0,e.username="")}}),created:function(){window.addEventListener("keydown",this.handleKeyDown),this.getCaptcha(),this.getStorage()},beforeDestroy:function(){window.removeEventListener("keydown",this.handleKeyDown)}}},560:function(e,t,r){t=e.exports=r(4)(),t.push([e.id,".login[data-v-14142102]{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#3a4d62;background-image:url("+r(614)+');background-position:50%;background-repeat:no-repeat;-moz-background-size:cover;-o-background-size:cover;background-size:cover;text-align:center}.login[data-v-14142102]:after{content:" ";width:0;height:100%;vertical-align:middle;display:inline-block}.login .header[data-v-14142102]{position:absolute;left:0;right:0;height:60px;line-height:60px;color:#fff;text-align:center;font-size:28px}.login .header .item[data-v-14142102]{position:absolute;top:0;bottom:0;z-index:1}.login .header .left[data-v-14142102]{left:10px;padding-left:46px;background:url('+r(615)+") no-repeat 0;-moz-background-size:40px;-o-background-size:40px;background-size:40px}.login .header .right[data-v-14142102]{right:10px}.login .header .right i[data-v-14142102]{font-size:32px;display:inline-block;vertical-align:text-bottom;padding-right:0;line-height:31px}.login .footer[data-v-14142102]{display:none;color:#fff;padding-bottom:20px;position:fixed;bottom:0;left:0;right:0}@media screen and (min-height:768px){.login .footer[data-v-14142102]{display:block}}.login .footer ul[data-v-14142102]{text-align:center}.login .footer ul li[data-v-14142102]{display:inline-block;margin:0 10px;font-size:14px;font-size:1rem;cursor:pointer}.login .footer ul li a[data-v-14142102]{height:21px;display:inline-block;cursor:pointer;color:#fff}.login .footer .gov[data-v-14142102]{color:#fff}.login .footer .gov[data-v-14142102]:hover{text-decoration:underline}.login .footer ul li a[data-v-14142102]:hover{color:#ff8d1c}.login .footer p[data-v-14142102]{font-size:12px;font-size:.8rem;text-align:center;margin-top:14px;margin-top:1rem;line-height:24px}.login .footer p img[data-v-14142102]{padding:0 6px;margin-bottom:-3px}.login .thinLine[data-v-14142102]{width:140px;width:10rem;height:1px;background-color:#eaeaea;margin:0 auto;margin-top:20px}.form-login[data-v-14142102]{width:560px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:50px 90px 80px;display:inline-block;vertical-align:middle;background-color:#fcfcfb;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.form-login h3[data-v-14142102]{color:#404040;font-size:28px;text-align:center;margin-bottom:46px}.form-login .chrome-hack[data-v-14142102]{display:none}.form-login .el-button--primary[data-v-14142102]:focus,.form-login .el-button--primary[data-v-14142102]:hover{background:#475669;border-color:#475669;color:#fff}.form-login .button-login[data-v-14142102]{width:100%;background-color:#3a4d62;border-color:#3a4d62;padding:15px 19px}.form-login .left[data-v-14142102]{text-align:left}.form-login .box[data-v-14142102]{margin:22px 0}",""])},614:function(e,t,r){e.exports=r.p+"bg3.jpg"},615:function(e,t,r){e.exports=r.p+"logo.png"},616:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAAPHXrvPpku/oo/Pnqvr0zdiuff784P//4+TQlfTfi/Hfx9ynWfPpq+rYg+GwZ+3egOTCbeS8WdmvgtOTcMqEW8N/Pt2pU+OsU+e1XOnIXue8bOvSmNucUd6nXOzZjf/5wejGfO/Zf//50Pjagv7Yj+rDevv/3uvJef767O3NhuzdsvjOev/vhuS2guS2gOO8ad+vZ5ppXPDWu//3l62LerSUfp9oVeGzaNusYuTBj9u6h/2/VNmobdGudum9Wf/SWM4AAgAAbua6W+7WcumwSunGXurKX+vAV+nBYOKxUea3V96ZRN6jSdWQRuXAU+/NZNQhGTkUOOWyUtQDCZN4WtYfGFE2UdpJKNydQ//bXv7FUtM4ItZlMAAAZtc+INd1OP0sD/LLbt6TPe1xMAAEdwAAeQICa7tMJgAAgPPkcvfidOzNaOfEZuK2X/LJVui5T+i/TuCkTO6+UOSzWum3Uuy5T+7IWunKbdqWSuvFXeW8Uu/KYdKDPdaOPPHTad6DMtYaF+u7XPN8KNV0KNc9IeOvS9ieWM8sGr2QXtYxH/jEWOigPfyOLNeRU6yic7mLWP/vbeOTPf/YTe3CYvCvSJNgNnN2grSjZtSWPdEMEfufRs8XEcEMC6m0kc2sUskAAmx5ik4OTlZOb9bAeMlZKv++YFxfeMwnEwwAXWAeUAAAYcVSJEIkRMQYCl5ZZuOqStkABo2Gd8YnE/BeHtdfM+W1Xcw+LQAAeOeCP3J6gtNAJmkCNrEODtVIKss9IUwAOcY+HYSPmbYAEAAbjv/SZuqCPdOHPdlOKt22afvSb+VgI4FYOqN9UoRpSsRrM55fMOKpV+RvNtttN78AEQAQemtzhGl+jr26fs3CcdeKRvSwQBcwiZWQg9EVCv/iY+tfKXx6edjMd8q2eHlkYPLYeOCORwsGZ8W9h9NlPeJGHqeNWTYaTfaCNtO8h7WAP25iYvekOcWufOmXNM54OgAIkf+1SfrERJSMdXKFlNuGOJKNfhw+l7SZWKOZhPzMZNp07osAAAA/dFJOUwBpq3xBW6wIGgK6QetEk+fh7PRIFF2cxuTk8LyM0sYnQfvsTDCy5inEIZWDwb7HseDb+xw10cv3+fWfmMPlb0PdBigAAAF2SURBVBjTY2CAAA5GM1NGDgZkoMBmfuHMubNGbMoIMfbOoGnnT6ec7A+awA4T49AJD20OiTnhOHteuCpUVN3izfrewMCOiDlzl11bqyYPFjT5kfl6S0hX46yYBQ9uOG1SAYkZ2/xOff9qY1hrfJhj/COnh7qaQEG7j/8y/751XDrT/9m9lJtOdx20gYLWnz99/fA942BswuVb95+kvbhtBRS0/ZX0Jz3j2L79W3dfevn8ztNkQ6Cg5ZdvP9MOJ8auSdiZeCX9evRxA6CgfuT/d0cO7F23eUXE9j1XH58K1gIK6iVfPHooNW71olUr43bsitq2QQMoqNjeNylpSejCGfOXL54+pSeyTQkoyFrt69fSHTU5eqrDRIcGPy93FpDrWaX8a+sCmoLtA+p9KisEecHe5OZ3c/P2qPKssff1dsnlAStk4Mp2ySux9/Is9Slyds7JYoKEJp9QQX6xa5mrR3mhuwAzJzRARUTFxGUlJOWkZYTBQgAlso7dQYeMaQAAAABJRU5ErkJggg=="},631:function(e,t,r){var o,a;r(729),o=r(497);var i=r(676);a=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(a=o=o.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,a._scopeId="data-v-14142102",e.exports=o},676:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[e._m(0),e._v(" "),r("el-form",{ref:"ruleForm2",staticClass:"form-login",attrs:{model:e.ruleForm2,rules:e.rules2}},[r("h3",[e._v("登录客到账号")]),e._v(" "),r("input",{staticClass:"chrome-hack",attrs:{type:"text"}}),e._v(" "),r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{directives:[{name:"model",rawName:"v-model.trim",value:e.ruleForm2.username,expression:"ruleForm2.username",modifiers:{trim:!0}}],attrs:{size:"large",placeholder:"登录名/手机号/员工号"},domProps:{value:e.ruleForm2.username},on:{input:function(t){e.ruleForm2.username="string"==typeof t?t.trim():t},blur:function(t){e.$forceUpdate()}}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm2.password,expression:"ruleForm2.password"}],attrs:{size:"large",type:"password","auto-complete":"off",placeholder:"请输入密码"},domProps:{value:e.ruleForm2.password},on:{input:function(t){e.ruleForm2.password=t}}})],1),e._v(" "),r("div",{staticClass:"box"},[r("div",{staticClass:"box-captcha",attrs:{id:"float-captcha"}})]),e._v(" "),r("el-form-item",{staticClass:"left"},[r("el-checkbox",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm2.rememberme,expression:"ruleForm2.rememberme"}],domProps:{value:e.ruleForm2.rememberme},on:{input:function(t){e.ruleForm2.rememberme=t}}},[e._v("记住用户名")]),e._v(" "),r("el-checkbox",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm2.rememberps,expression:"ruleForm2.rememberps"}],domProps:{value:e.ruleForm2.rememberps},on:{input:function(t){e.ruleForm2.rememberps=t}}},[e._v("记住密码")])],1),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"button-login",attrs:{size:"large",type:"primary",disabled:e.loading},on:{click:e.handleSubmit2}},[e._v(e._s(e.loginMsg))])],1)],1),e._v(" "),e._m(1)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("div",{staticClass:"item left"},[e._v("客到采购管理系统")]),e._v(" "),r("div",{staticClass:"item right"},[r("i",{staticClass:"icon-nav_ico_phone"}),e._v(" "),r("span",[e._v("400 - 1688 - 927")])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"footer",attrs:{id:"footer"}},[o("ul",[o("li",[o("a",{attrs:{href:"http://grkj.cn",target:"_blank"}},[e._v("关于我们")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://ht.kd.cc/agreements/ctrz.html",target:"_blank"}},[e._v("餐厅入驻")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://ht.kd.cc/agreements/fwxy.html",target:"_blank"}},[e._v("商家服务协议")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://ht.kd.cc/agreements/yszc.html",target:"_blank"}},[e._v("商家隐私政策")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://kd.cc/agent.html",target:"_blank"}},[e._v("代理商入驻")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://partner.kd.cc/",target:"_blank"}},[e._v("代理商后台")])]),e._v("|\n\t\t\t"),o("li",[o("a",{attrs:{href:"http://grkj.cn/business.html",target:"_blank"}},[e._v("联系我们")])])]),e._v(" "),o("p",[e._v("Copyright©2015-2018 KD.CC 版权所有"),o("img",{attrs:{src:r(616)}}),o("a",{staticClass:"gov",attrs:{target:"_blank",href:"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002001294"}},[e._v("苏公网安备  32059002001294号")]),e._v("    苏ICP备14055937号")])])}]}},729:function(e,t,r){var o=r(560);"string"==typeof o&&(o=[[e.id,o,""]]);r(5)(o,{});o.locals&&(e.exports=o.locals)}});