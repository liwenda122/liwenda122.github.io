webpackJsonp([10],{496:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},a=t(16);r.default={data:function(){var e=function(e,r,t){return r?void t():t(new Error("请输入用户名"))},r=function(e,r,t){""===r?t(new Error("请输入密码")):t()};return{ruleForm2:{rememberme:!1,rememberps:!1,password:"",username:"",captchaObj:{}},rules2:{password:[{validator:r,trigger:"blur"}],username:[{validator:e,trigger:"blur"}]},loading:!1,loginMsg:"登录"}},methods:o({},(0,a.mapActions)(["SIGNIN","AUTHORIZE"]),{submit:function(){this.loading=!0,this.loginMsg="登录中...";var e={};e.userRealName=this.ruleForm2.username,e.orgName="车联网简易DEMO",this.SIGNIN(e),this.setStorage(),this.$router.replace({path:"/"})},handleSubmit:function(e){var r=this;this.$refs.ruleForm2.validate(function(e){return e?void r.submit():(console.log("error submit!!"),!1)})},handleKeyDown:function(e){13==e.keyCode&&this.handleSubmit()},getCaptcha:function(){var e=this;this.$http({url:"/pms/slidecheck/getCode.do?t="+(new Date).getTime(),method:"POST"}).then(function(e){return e.body}).then(function(r){initGeetest({gt:r.gt,challenge:r.challenge,product:"float",offline:!r.success},e.handlerEmbed)})},handlerEmbed:function(e){e.appendTo("#float-captcha"),this.captchaObj=e},getStorage:function(){var e=window.localStorage,r=e.username,t=e.password,o=e.rememberme,a=e.rememberps;"1"==o&&(this.ruleForm2.rememberme=!0,this.ruleForm2.username=r,"1"==a&&(this.ruleForm2.rememberps=!0,this.ruleForm2.password=t))},setStorage:function(){var e=window.localStorage;this.ruleForm2.rememberme?(e.rememberme=1,e.username=this.ruleForm2.username,this.ruleForm2.rememberps?(e.rememberps=1,e.password=this.ruleForm2.password):(e.rememberps=0,e.password="")):(e.rememberme=0,e.username="")}}),created:function(){window.addEventListener("keydown",this.handleKeyDown),this.getStorage()},beforeDestroy:function(){window.removeEventListener("keydown",this.handleKeyDown)}}},533:function(e,r,t){r=e.exports=t(8)(),r.push([e.id,".login[data-v-5ee1d749]{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#3a4d62;background-image:url("+t(555)+');background-position:50%;background-repeat:no-repeat;-moz-background-size:cover;-o-background-size:cover;background-size:cover;text-align:center}.login[data-v-5ee1d749]:after{content:" ";width:0;height:100%;vertical-align:middle;display:inline-block}.form-login[data-v-5ee1d749]{width:560px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:50px 90px 80px;display:inline-block;vertical-align:middle;background-color:#fcfcfb;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.form-login h3[data-v-5ee1d749]{color:#404040;font-size:28px;text-align:center;margin-bottom:46px}.form-login .chrome-hack[data-v-5ee1d749]{display:none}.form-login .button-login[data-v-5ee1d749]{width:100%;padding:15px 19px}.form-login .left[data-v-5ee1d749]{text-align:left}.form-login .box[data-v-5ee1d749]{margin:22px 0}',""])},555:function(e,r,t){e.exports=t.p+"bg.jpg"},562:function(e,r,t){t(603);var o=t(12)(t(496),t(585),"data-v-5ee1d749",null);e.exports=o.exports},585:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("el-form",{ref:"ruleForm2",staticClass:"form-login",attrs:{model:e.ruleForm2,rules:e.rules2}},[t("h3",[e._v("车联网系统DEMO-Vue")]),e._v(" "),t("input",{staticClass:"chrome-hack",attrs:{type:"text"}}),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{size:"large",placeholder:"登录名/手机号"},model:{value:e.ruleForm2.username,callback:function(r){e.ruleForm2.username="string"==typeof r?r.trim():r},expression:"ruleForm2.username"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{size:"large",type:"password","auto-complete":"off",placeholder:"请输入密码"},model:{value:e.ruleForm2.password,callback:function(r){e.ruleForm2.password=r},expression:"ruleForm2.password"}})],1),e._v(" "),t("div",{staticClass:"box"},[t("div",{staticClass:"box-captcha",attrs:{id:"float-captcha"}})]),e._v(" "),t("el-form-item",{staticClass:"left"},[t("el-checkbox",{model:{value:e.ruleForm2.rememberme,callback:function(r){e.ruleForm2.rememberme=r},expression:"ruleForm2.rememberme"}},[e._v("记住用户名")]),e._v(" "),t("el-checkbox",{model:{value:e.ruleForm2.rememberps,callback:function(r){e.ruleForm2.rememberps=r},expression:"ruleForm2.rememberps"}},[e._v("记住密码")])],1),e._v(" "),t("el-form-item",[t("el-button",{staticClass:"button-login",attrs:{size:"large",type:"primary",disabled:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.loginMsg))])],1)],1)],1)},staticRenderFns:[]}},603:function(e,r,t){var o=t(533);"string"==typeof o&&(o=[[e.id,o,""]]),o.locals&&(e.exports=o.locals);t(13)("9dd73724",o,!0)}});