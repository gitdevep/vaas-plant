<template>
                <div v-if="shareData.btn.show">
                    <div class="vas-list-btn" style="min-height:350px">
                        <div>
                            <div class="title">{{shareData.btn.title}}</div>
                        </div>
                        <div class="container-table" style="height: 250px; overflow: auto;">
                            <table class="form-table" cellpadding="0" cellspacing="0">

                                <thead class="fixed-thead">
                                  <tr>
                                    <th><input type="checkbox" v-model="selectAll" @change="allSelect"></th>
                                    <th>姓名</th>
                                  </tr>
                                </thead>

                                <tbody class="scroll-tbody" v-for="(value, index) in userInfo" :key="index">
                                  <tr>
                                    <td><input type="checkbox" v-model="value.checked" @change="selectFile(value)"></td>
                                    <td>{{value.name}}</td>
                                  </tr>
                                </tbody>
                            </table>
                            <div style="text-align: center; margin-top:10px;">
                              <input type="button" name="primary" class="btn" :id="shareData.btn.id"  :value="shareData.btn.value" @click="shareSave">
                            </div>
                        </div>
                    </div>
                </div>   
</template>

<script>
import bus from "../../common/bus";

export default {
  data() {
    return {
      selectAll: false,
      selectUserData: [],
      userInfo: [],
      selectPictureData: []
    };
  },
  props: {
    shareData: {
      type: Object,
      default: function(e) {
        return {
          btn: {
            show: false,
            type: "share",
            title: "分享",
            id: "shareSave",
            value: "保存"
          }
        };
      }
    }
  },
  created() {
  },
  mounted() {
    bus.$on("modalCallback", (data) => {
      this.selectPictureData = JSON.parse(JSON.stringify(data));
    });
    bus.$on("cancleFileShare", (data) => {
      this.getUserData(data.fileId);
    });
    bus.$on("getUserInfo", (data) => {
      this.selectUserData = [];
      this.getUserData();
    })
  },
  methods: {
    getUserData(id) {
      this.selectUserData = [];
      this.userInfo = [];
      if(id){  // 取消分享的逻辑处理
        this.$http.post(this.$interfaceApi.GetShareInfo, {"fileId": id}).then(res => {
          if(res.data.success){
             let sharedata = res.data.data;
             this.$http.get(this.$interfaceApi.UserList).then(res => {
               if(res.data.success){
                  res.data.data.forEach((value, index) => {
                    sharedata.forEach((v,k)=>{
                      if(value.userId===v.userId){
                        var map = {
                          id: v.userId,
                          accountId: v.accountId,
                          name: value.userName
                        }
                        this.userInfo.push(map);
                      }
                    })
                })
               }
             })

          }else {
            this.$message.showTips("error", res.data.msg);
          }
        }).catch(error => {
         this.$message.showTips("error", error);
        });
      }else { //分享的逻辑处理
        this.$http.get(this.$interfaceApi.UserList).then(res => {
          if(res.data.success){
            let userData = res.data.data;
            // 获取分享记录，查看是否有已经分享的人
            let id = this.selectPictureData[0];
            let _index = [];
            this.$http.post(this.$interfaceApi.GetShareInfo, {"fileId": id}).then(res => {
                if(res.data.success){
                    userData.forEach((value, index) => {
                      res.data.data.forEach((v,k)=>{
                        if(value.userId===v.userId){
                          _index.push(index);
                        }
                      })
                  })
                  if(_index.length>0){
                    for(var i=0;i<_index.length;i++){
                        userData.splice((_index[i]-i),1);
                    }
                  }
                  userData.forEach((value, index) => {
                    var map = {
                      id: value.userId,
                      accountId: value.accountId,
                      name: value.userName
                    }
                    this.userInfo.push(map);
                  })
                }
             })
          }else {
            this.$message.showTips("error", res.data.msg);
          }
        }).catch(error => {
         this.$message.showTips("error", error);
        });
      }
    },
    selectFile(value) {
      if (value.checked) {
        this.selectUserData.push(value.id);
      } else {
        let _index = 0;
        this.selectUserData.forEach((data, index) => {
          if (data === value.id) {
            _index = index;
          }
        });
        this.selectUserData.splice(_index, 1);
      }
    },
    allSelect() {
      if (this.selectAll) {
        this.userInfo.forEach((value, index) => {
          value.checked = true;
          this.selectUserData.push(value.id);
        });
      } else {
        this.userInfo.forEach((value, index) => {
          value.checked = false;
        });
        this.selectUserData = [];
      }
    },
    shareSave() {
      if (this.selectUserData.length === 0) {
        this.$message.showTips("warn", "请选择用户。");
      } else if(this.selectPictureData.length === 0){
        this.$message.showTips("warn", "请选择一张图片。");
      }else {
        let params = {
          userId:this.selectUserData.join(","),
          fileId: this.selectPictureData.join(",")
        }
        let url = this.$interfaceApi.ShareInfo;
        if(this.shareData.btn.type === "cancleShare"){
          url = this.$interfaceApi.CancleShareInfo;
        }
        this.$http.post(url, params).then((res)=>{
          if(res.data.success){
            this.shareData.btn.show = false;
            bus.$emit("shareInfo", {"success": true});
            this.getUserData();
          }else {
            this.$message.showTips("error", res.data.msg);
          }
         
        }).catch((error) =>{
          this.$message.showTips("error", error);
        })
      }
    }
  }
};
</script>
