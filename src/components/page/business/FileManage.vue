<template>
    <div v-show="showInfo">
        <div class="container">
            <div class="vas-picture-item">
                <fileManageList ref="deletFile"></fileManageList>
            </div>
            <div class="vas-history-item">
                <div  class="vas-list-btn">
                    <div class="btn-display-des">
                        <div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[0].id}" :id="btn[0].id"  :value="btn[0].value" @click="delAll"></div>
                        <div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[1].id}" :id="btn[1].id"  :value="btn[1].value" @click="share"></div>
                        <!--<div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[2].id}" :id="btn[2].id"  :value="btn[2].value" @click="cancleShare"></div>
                        -->
                        <div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[3].id}" :id="btn[3].id"  :value="btn[3].value" @click="addLabel"></div>
                        <div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[4].id}" :id="btn[4].id"  :value="btn[4].value" @click="uploadChildrenFile"></div>
                        <!--<div class="btn-margin"><input type="button" name="primary" class="btn" :class="{active: activeName == btn[5].id}" :id="btn[5].id"  :value="btn[5].value" @click="dowloadFile"></div>
                        -->
                    </div>
                </div>
                <div>
                  <v-detail></v-detail>
                </div>
                <div>
                    <v-share v-bind:shareData ="shareData" v-show="showShareLabel"></v-share>
                </div>
                <div>
                    <fileUploadLabel v-bind:selectData="selectLabel" @callback="callListBack" v-show="showLabel"></fileUploadLabel>
                </div>
                <div>
                    <fileChildrenUpload :uploadParam = 'uploadParam' v-show="showUploadLabel"></fileChildrenUpload>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import fileManageList from "./FileManageList.vue";
import fileUploadLabel from "./FileUploadLabel.vue";
import fileChildrenUpload from "./FileChildrenUpload.vue";
import share from "../baseComponents/Share.vue";
import detail from "../baseComponents/Detail.vue";
import bus from "../../common/bus";

export default {
  name: "fileManage",
  data() {
    return {
      activeName:"",
      showInfo: false,
      showShareLabel:false,
      btn: [
        {
          id: "del",
          value: "删除"
        },
        {
          id: "share",
          value: "分享"
        },
        {
          id: "share_cancle",
          value: "取消分享"
        },
        {
          id: "addLabel",
          value: "添加标签"
        },
        {
          id: "uploadChildrenFile",
          value: "上传子文件"
        },
        {
          id: "downloadFile",
          value: "下载图片"
        }
      ],
      shareData: {
        btn: {
          show: false,
          type:"share",
          title: "分享",
          id: "shareSave",
          value: "保存"
        }
      },
      selectPictureData: [],
      downloadData: [],
      showUploadLabel: false,
      uploadParam: {
        type: "uploadChild",
        width:"95px",
        leftWidth: '0px',
        topWidth: '0px',
        select_file: "选择文件"
      },
      showLabel: false,
      selectLabel: {
        selectData: [],
        listData: []
      }
    };
  },
  components: {
    fileUploadLabel,
    fileManageList,
    fileChildrenUpload,
    "v-share": share,
    "v-detail": detail
  },
  mounted() {
    bus.$on("listData",(e)=>{
      this.selectPictureData = [];
      this.activeName = "";
      if(e.listLeigth>0){
        this.showInfo = true;
      }else {
        this.showInfo = false;
      }
    });
    bus.$on("modalCallback", (data) => {
      this.selectPictureData = JSON.parse(JSON.stringify(data));
    });
    bus.$on("downloadFile", (data) =>{
      this.downloadData = data;
    });
    bus.$on("shareInfo", (e)=>{
       if(e.success){
        this.selectPictureData = [];
        this.uploadParam.selectPictureData = [];
        this.shareData.selectPictureData = [];
       }
    });
    bus.$on("uploadChild", (e)=>{
      if(e.success){
        this.selectPictureData = [];
        this.uploadParam.selectPictureData = [];
        this.shareData.selectPictureData = [];
      }
    });
    bus.$on("uploadChildrenFileSuccess", (e)=>{
      this.showLabel = false;
      this.showShareLabel = false;
      this.showUploadLabel = false;
    });
    bus.$on("cancleFileShare", (e) =>{
        this.showLabel = false;
        this.showUploadLabel = false;
        this.showShareLabel = true;
        this.shareData.btn.show = true;
        this.shareData.btn.type = "cancleShare";
        this.shareData.btn.title = "取消分享";
    })
  },
  created() {},
  methods: {
    delAll() {
      this.activeName = this.btn[0].id;
      this.showLabel = false;
      this.showShareLabel = false;
      this.showUploadLabel = false;
      if (this.selectPictureData.length === 0) {
        this.$message.showTips("warn", "请选择要删除的图片。");
      } else {
        let id = this.selectPictureData.join(",");
        this.$http.delete(this.$interfaceApi.DeleteFile + id).then(res => {
          if (res.data.success) {
            this.$refs.deletFile.$emit("deleteFile");
            this.$message.showTips("success", "图片删除成功。");
          } else {
            this.$message.showTips(
              "error", "图片删除失败。原因：" + res.data.msg
            );
          }
        });
      }
    },
    share() {
      this.activeName = this.btn[1].id;
      this.showLabel = false;
      this.showUploadLabel = false;
      if (this.selectPictureData.length === 0 || this.selectPictureData.length>1) {
        this.$message.showTips("warn", "请选择一张图片进行分享。");
      } else {
        this.showShareLabel = true;
        this.shareData.btn.show = true;
        this.shareData.btn.type = "share";
        this.shareData.btn.title = "分享";
        bus.$emit("getUserInfo");
      }
    },
    cancleShare() {
      this.activeName = this.btn[2].id;
      this.showLabel = false;
      this.showUploadLabel = false;
      this.showShareLabel = true;
      if (this.selectPictureData.length === 0) {
        this.$message.showTips("warn", "请选择要取消分享的图片。");
      } else {
        this.shareData.btn.show = true;
        this.shareData.btn.type = "cancleShare";
        this.shareData.btn.title = "取消分享";
      }
    },
    callListBack() {
      this.showLabel = false;
    },
    addLabel() {
      this.activeName = this.btn[3].id;
      this.showUploadLabel = false;
      this.showShareLabel = false;
      if(this.selectPictureData.length === 0){
        this.showLabel = false;
        this.$message.showTips("warn", "请选择图片");
      } else {
        this.selectLabel = {
          selectData: this.selectPictureData,
          listData: this.selectPictureData
        }
        this.showLabel = true;
      }
      
    },
    uploadChildrenFile() {
      this.activeName = this.btn[4].id;
      this.showLabel = false;
      this.showShareLabel = false;
      if(this.selectPictureData.length !== 1){
        this.showUploadLabel = false;
        this.$message.showTips("warn", "请选择一张图片");
      } else {
        this.showUploadLabel = true;
        bus.$emit("uploadChildrenFile", this.selectPictureData);
      }
    },
    dowloadFile() {
      if(this.downloadData.length===0){
        this.$message.showTips("warn", "请选择图片");
      }else {
        for(var i=0; i<this.downloadData.length;i++){
          var url = this.downloadData[i].url
          this.download(url,100,1000);
        }

      }
    },
    download(url, triggerDelay, removeDelay) {
      setTimeout(function() {
         var a = document.createElement("a"), //创建a标签
            e = document.createEvent("MouseEvents"); //创建鼠标事件对象
        e.initEvent("click", false, false); //初始化事件对象
        a.href = url;  //设置下载地址
        a.download = "";  //设置下载文件名
        a.dispatchEvent(e); //给指定的元素，执行事件click事件
         setTimeout(function() {
                        a.remove();
                    }, removeDelay);
                }, triggerDelay);
         
        }
  }
};
</script>
