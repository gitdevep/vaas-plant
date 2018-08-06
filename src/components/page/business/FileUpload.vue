<template>
    <div>
        <div class="vas-picture-display">
          <!--
            <div class="content-common">
                <label>{{fileFormData.fileTypeName}}</label>
                <select v-model="fileFormData.selectId">
                    <option v-for="( value, index) in fileFormData.fileType" :key="index" :value="value.id">{{value.name}}</option>
                </select>
            </div> -->
            <div v-bind:style="{'margin-left': uploadParam.width}">
                <label></label>
                <label  v-bind:style="{'margin-left': uploadParam.leftWidth, 'margin-top': uploadParam.topWidth}" for="uploadFile">{{uploadParam.select_file}}</label>
                <input type="file" id="uploadFile" multiple="multiple"  @change='onUpload'>
            </div>
        </div>
    </div>
</template>

<script>
import bus from "../../common/bus";
export default {
  name: "fileUpload",
  data() {
    return {
      selectPictureData: [],
      fileFormData: {
        selectId: "1",
        fileTypeName: "属性",
        fileType: [
          {
            id: "1",
            name: "图片"
          }
        ]
      }
    };
  },
  props: {
    uploadParam:{
            type: Object,
            default: function (e) {
                return {
                    type: "upload",
                    width: "95px",
                    leftWidth: '0px',
                    topWidth: '6px',
                    select_file: "上传文件"
                }
            }
        }
  },
  created() {},
  mounted() {
    bus.$on("modalCallback", (data) => {
      this.selectPictureData = JSON.parse(JSON.stringify(data));
    })
  },
  computed: {},
  methods: {
    // 选择文件
    onUpload(e) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" // 以表单传数据的格式来传递fromdata
        }
      };
      let files = e.target.files;
      let formData = new FormData();
      let url = this.$interfaceApi.FileUpload;
      formData.append("fileAction", JSON.stringify({actId:"8001"}));
      formData.append("fileSource", JSON.stringify({address:"手动上传"}));
      if (files.length === 1) {
         let fileName = files[0].name;
          var exec = /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName.toLowerCase()) : [];
          if (exec[0] !== "jpg" && exec[0] !== "png") {
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "文件格式不对，请上传jpg、png格式文件!"
            );
            return false;
          }
          formData.append("file", files[0]);
      } else {
        let params = {
          "parentId":""
        }
        formData.append("fileMain", JSON.stringify(params));
        for (var i = 0; i < files.length; i++) {
          let fileName = files[i].name;
          var exec = /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName.toLowerCase()) : [];
          if (exec[0] !== "jpg" && exec[0] !== "png") {
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "文件格式不对，请上传jpg、png格式文件!"
            );
            return false;
          }
          formData.append("files", files[i]);
        }
        url = this.$interfaceApi.BacthUploadFile;
      }
      this.$http.post(url, formData, config).then(res => {
          document.getElementById('uploadFile').value = null;
          if(res.data.success){
              this.$emit("callback");;
          }else{
                this.$message.showTips("error", res.data.msg);
          }
        }) .catch(error => {
          document.getElementById('uploadFile').value = null;
          console.log(error);
        });
    }
  }
};
</script>
