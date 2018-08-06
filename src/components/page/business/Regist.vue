<template>
    <div class="vas-wrap">
        <div class="vas-login-wrap">
            <div class="vas-login">
                <div class="vas-login-form">
                    <div class="vas-login-logo"></div>
                    <div class="regist-el-title">
                        <div style="position: relative; margin-top: 40px;">
                            <div style="z-index:999999; position: absolute; margin-left: 50px;">
                                <span style="display: inline-block; margin-left: 104px; cursor: pointer;"  @click="selctTags('1')">公司</span>
                                <span style="display: inline-block; margin-left: 70px;; cursor: pointer;" @click="selctTags('2')">个人</span>
                            </div>
                            <div  class="regist-common-bg" v-if="selct_tags" ></div>
                            <div  class="regist-common-persion" v-if="!selct_tags" ></div>
                        </div>
                    </div>
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
                    <div class="el-input-line" v-if="selct_tags">
                        <div class="el-label">
                            <label>邮箱</label>
                        </div>
                        <div class="el-input">
                            <input v-model="ruleForm.email" id="email" name="email"  type="text" value="" placeholder="请输入邮箱">
                        </div>
                    </div>
                    <div class="el-input-line" v-if="!selct_tags">
                        <div class="el-label">
                            <label>手机</label>
                        </div>
                        <div class="el-input">
                            <input v-model="ruleForm.telephone" id="telephone" name="telephone"  type="text" value="" placeholder="请输入手机号">
                        </div>
                    </div>
                    <div class="el-input-line">
                        <div class="el-label">
                            <label>验证码</label>
                        </div>
                        <div class="el-input el-input-code">
                            <input v-model="ruleForm.registCode" id="username" name="username" value="" placeholder="请输入验证码">
                        </div>
                        <div class="el-code" @click="sendEmailCode">
                            <img>发送验证码
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
                            <button @click="doRegist"> 立即注册 </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
const phoneReg = /1[0-9]{10}/;
const mailReg = /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
export default {
  data: function() {
    return {
      selct_tags: true,
      switchRemember: true,
      typeName: 1,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        telephone: "",
        registCode: "",
        loginCodeImg: "",
        email_token: "",
        evalMailTime: 0
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
  },
  methods: {
    selctTags(v) {
        if(v=="1"){
            this.selct_tags = true;
            this.typeName = 1;
        }else {
            this.typeName = 2;
            this.selct_tags = false;
        }
    },
    sendEmailCode() {
      if (this.ruleForm.email === "") {
        this.$message.showTips("warn","请输入邮箱地址");
        return false;
      }
      if (!mailReg.test(this.ruleForm.email)) {
        this.$message.showTips("warn","输入邮箱的格式有误");
        return false;
      }
      this.$http.get(this.$interfaceApi.RegistEmaillCode, { mail: this.email }).then(res => {
          if(res.data.success){
            this.email_token = res.data;
            this.evalMailTime = 60;
          }else {
            this.$message.showTips("warn","输入邮箱的格式有误");
          }
      });
    },
    switchPassword() {
      this.switchRemember = !this.switchRemember;
    },
    doRegist() {
      var data = {};
      if (this.ruleForm.username === "") {
        this.$message.showTips("warn","请输入账号");
        return false;
      }
      if (this.ruleForm.password === "") {
        this.$message.showTips("warn","请输入密码");
        return false;
      }
      if (this.ruleForm.loginCode == "") {
        this.$message.showTips("warn","请输入验证码");
        return false;
      }
      if(this.typeName===1){
        if (this.ruleForm.email === "") {
            this.$message.showTips("warn","请输入邮箱地址");
            return false;
        } else if (!mailReg.test(this.ruleForm.email)) {
            this.$message.showTips("warn","输入邮箱的格式有误");
            return false;
        } else {
             data.mail = this.ruleForm.email;
        }
      }else {

      }
      data.userType = this.typeName;
      data.validateToken = this.email_token;
      data.validateCode = this.registCode;
      data.loginName = this.ruleForm.username;
      data.password = this.ruleForm.password;

      this.$http.post(this.$interfaceApi.Regist, data).then( res => {
          if(res.data.success){
              this.$router.push('/login');
          }
      }).catch(error => {
          this.$message.showTips("error","注册失败");
      })
    }
  }
};
</script>