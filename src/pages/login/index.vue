<style lang="less" scoped>
	.login {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #3a4d62;
		background-image: url(bg.jpg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		text-align: center;
		&:after{
			content: ' ';
			width: 0;
			height: 100%;
			vertical-align: middle;
			display: inline-block;
		}
	}
	.form-login{
		width: 560px;
		box-sizing: border-box;
		padding: 50px 90px 80px 90px;
		display: inline-block;
		vertical-align: middle;
		background-color: #fcfcfb;
		border-radius: 8px;
		h3{
			color: #404040;
			font-size: 28px;
			text-align: center;
			margin-bottom: 46px;
		}
		.chrome-hack{
			display: none;
		}
		.button-login{
			width: 100%;
			padding: 15px 19px;
		}
		.left{
			text-align: left;
		}
		.box{
			margin: 22px 0;
		}
	}
</style>
<template>
	<div class="login">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="form-login">
			<h3>车联网系统DEMO-Vue</h3>
			<input type="text" class="chrome-hack">
			<el-form-item prop="username">
				<el-input size="large" v-model.trim="ruleForm2.username" placeholder="登录名/手机号"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input size="large" type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<div class="box">
				<!--<div class="box-label">滑动完成验证</div>
				<span id="wait" class="show">正在加载验证码......</span>-->
				<div class="box-captcha" id="float-captcha"></div>
			</div>
			<el-form-item class="left">
				<el-checkbox v-model="ruleForm2.rememberme" >记住用户名</el-checkbox>
				<el-checkbox v-model="ruleForm2.rememberps" >记住密码</el-checkbox>
			</el-form-item>

			<el-form-item>
				<el-button size="large" type="primary" class="button-login" @click="handleSubmit" :disabled="loading">{{loginMsg}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
		data() {
		  var checkUser = (rule, value, callback) => {
			if (!value) {
			  return callback(new Error('请输入用户名'));
			}else {
			  callback();
			}
		  };
		  var validatePass = (rule, value, callback) => {
			if (value === '') {
			  callback(new Error('请输入密码'));
			} else {
			  callback();
			}
		  };
		  return {
			ruleForm2: {
			  rememberme:false,
			  rememberps:false,
			  password: '',
			  username: '',
			  captchaObj:{}
			},
			rules2: {
			  password: [
				{ validator: validatePass, trigger: 'blur' }
			  ],
			  username: [
				{ validator: checkUser, trigger: 'blur' }
			  ]
			},
			  loading:false,
			  loginMsg:"登录"
		  };
		},
		methods: {
	      ...mapActions(['SIGNIN','AUTHORIZE']),
	   	  submit(){
              this.loading = true;
              this.loginMsg = '登录中...';
              var userObj ={};
              userObj.userRealName = this.ruleForm2.username;
              userObj.orgName = '车联网简易DEMO';
              this.SIGNIN(userObj);
              //this.AUTHORIZE(data.result.pmsModuleList);
              this.setStorage();
              this.$router.replace({path: '/'})
	          //let validate = this.captchaObj.getValidate();
              /*this.$http({
                  url:'/pms/account/signin.do',
                  method:'POST',
                  body:{
                      username:this.ruleForm2.username,
                      password:this.ruleForm2.password,
                      geetest_challenge: validate.geetest_challenge,
                      geetest_validate: validate.geetest_validate,
                      geetest_seccode: validate.geetest_seccode
                  },
                  emulateJSON:true
              }).then((res)=>res.body).then((data)=> {
                  if (data.code == 200) {
                      //vuex store/user 内定义的mutations
                      this.SIGNIN(data.result);
                      this.AUTHORIZE(data.result.pmsModuleList);
                      this.setStorage();
                      this.$router.replace({path: '/'})
                  }else{
                      this.$message({
                          message: data.message,
                          type: 'warning'
                      });
                  }
	              this.loading = false;
	              this.loginMsg = '立刻登录';
              },(response) => {
                  // 响应错误回调
                  this.loading = false;
                  this.loginMsg = '立刻登录';
              }).catch(function(response) {
                  this.loading = false;
                  this.loginMsg = '立刻登录';
              })*/
	   	  },
		  handleSubmit(ev) {
			this.$refs.ruleForm2.validate((valid) => {
			  if (valid) {
                  this.submit()
			      /*if(this.captchaObj && this.captchaObj.getValidate instanceof Function){
                      let captCha = this.captchaObj.getValidate();
                      if(captCha){
                          this.submit()
                      }else{
                          this.$message({
                              message: '请先拖动滑块完成验证',
                              type: 'warning'
                          });
                      }
			      }else{
                      this.$message({
                          message: '网络异常，请检查网络设置或刷新重试',
                          type: 'error'
                      });
			      }*/
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
		  },
		  handleKeyDown(e){
              if(e.keyCode ==13){
                  this.handleSubmit()
              }
		  },
			//加载滑块验证码
          getCaptcha(){
		      let that =this;
              this.$http({
                  url: "/pms/slidecheck/getCode.do?t=" + (new Date()).getTime(), // 加随机数防止缓存
                  method: "POST"
              }).then((res)=>res.body).then((data)=> {
                  // 使用initGeetest接口
                  // 参数1：配置参数
                  // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                  initGeetest({
                      gt: data.gt,
                      challenge: data.challenge,
                      product: "float",
                      offline: !data.success
                  }, that.handlerEmbed);
              })
          },
	       handlerEmbed(captchaObj){
				// 将验证码加到id为captcha的元素里
               captchaObj.appendTo("#float-captcha");
               this.captchaObj = captchaObj;
           },
			//检查是否有记住用户名密码
            getStorage(){
                let storage = window.localStorage;
                let getUid = storage["username"];
                let getPwd = storage["password"];
                let getrememberme = storage["rememberme"];
                let getrememberps = storage["rememberps"];
                if(getrememberme =="1"){
                    this.ruleForm2.rememberme =true;
                    this.ruleForm2.username =getUid;
                    if(getrememberps =="1"){
                        this.ruleForm2.rememberps =true;
                        this.ruleForm2.password =getPwd;
                    }
                }
            },
			setStorage(){
                let storage = window.localStorage;
                if(!!this.ruleForm2.rememberme){
                    storage["rememberme"] = 1;
                    storage["username"] =this.ruleForm2.username;
                    if(!!this.ruleForm2.rememberps){
                        storage["rememberps"] = 1;
                        storage["password"] =this.ruleForm2.password;
                    }else{
                        storage["rememberps"] = 0;
                        storage["password"] ="";
                    }
                }else{
                    storage["rememberme"] = 0;
                    storage["username"] ="";
                }
			}

		},
		created(){
			window.addEventListener("keydown",this.handleKeyDown);
			//this.getCaptcha();
			this.getStorage();
		},
	    beforeDestroy:function () {
            window.removeEventListener("keydown",this.handleKeyDown)
        }
  	}
</script>