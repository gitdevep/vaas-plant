<template>
    <div class="vas-wrap">
        <div class="vas-login-wrap">
            <div class="vas-login">
                <div class="vas-login-form">
                    <div class="vas-login-logo"></div>
                    <div class="el-title">登录</div>
                    <div class="el-input-line">
                        <div class="el-label">
                            <label>账号</label>
                        </div>
                        <div class="el-input">
                            <input v-model="ruleForm.username" id="username" name="username" type="text" value="" placeholder="请输入个人或公司账号">
                        </div>
                    </div>
                    <div class="el-input-line">
                        <div class="el-label">
                            <label>密码</label>
                        </div>
                        <div class="el-input">
                            <input v-model="ruleForm.password" id="password" name="password"  type="password" value="" placeholder="请输入个人或公司账号">
                        </div>
                    </div>
                    <div class="el-input-line">
                        <div class="el-label">
                            <label>验证码</label>
                        </div>
                        <div class="el-input el-input-code">
                            <input v-model="ruleForm.loginCode" id="username" name="username" value="" placeholder="请输入验证码">
                        </div>
                        <div class="el-code" @click="getLoginCode">
                            <img v-bind:src="ruleForm.loginCodeImg">
                        </div>
                    </div>
                    <div class="el-input-oprate">
                        <span class="check" @click="switchPassword"><span v-if="switchRemember" class="check-yes"></span>记住密码</span>
                        <span class="forget" onClick={this.goForget}>忘记密码 ?</span>
                        <span class="forget">&nbsp;&nbsp;</span>
                        <span class="forget" onClick={this.goRegist}>注册</span>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="el-input-btn">
                        <div class="btn-animation">
                            <button @click="login"> 立即登录 </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
  data: function() {
    return {
      switchRemember: true,
      ruleForm: {
        username: "",
        password: "",
        loginCode: "",
        loginCodeImg: "",
        token: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // 获取验证码
    this.getLoginCode();
  },
  methods: {
    getLoginCode() {
      this.$http.get(this.$interfaceApi.RequestLoginCode).then(res => {
        this.ruleForm.loginCodeImg = res.data.data.img;
        this.ruleForm.token = res.data.data.token;
      });
    },
    switchPassword() {
      this.switchRemember = !this.switchRemember;
    },
    login() {
      if (this.ruleForm.username === "") {
        return false;
      }
      if (this.ruleForm.password === "") {
        return false;
      }
      if (this.ruleForm.loginCode == "") {
        return false;
      }

      let logindata = {
        clientId: "pc",
        loginName: this.ruleForm.username,
        password: this.ruleForm.password,
        validateCode: this.ruleForm.loginCode,
        validateToken: this.ruleForm.token
      };
      this.$http.post(this.$interfaceApi.Login, logindata).then( res => {
          if(res.data.success){
              localStorage.setItem("ms_username", this.ruleForm.username);
              localStorage.setItem("ms_token", this.ruleForm.token);
          }
          if(this.switchRemember){
              localStorage.setItem("ms_paasword", this.ruleForm.password);
          }
          this.$router.push("/");
      }).catch(error => {
          this.getLoginCode();
      })
    }
  }
};
</script>