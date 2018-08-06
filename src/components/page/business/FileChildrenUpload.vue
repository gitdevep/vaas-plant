<template>
    <div>
        <div class="vas-picture-display">
            <div class="content-common">
                <div>
                    <label>{{fileFormData.fileTypeName}}</label>
                    <select v-model="fileFormData.selectId" @change="selectAction">
                        <option v-for="( value, index) in fileFormData.fileType" :key="index" :value="value.id">{{value.dicName}}</option>
                    </select>
                </div>
                <div>
                    <label>{{fileActionMethods.fileTypeName}}</label>
                    <select v-model="fileActionMethods.selectMethodsId">
                        <option v-for="( value, index) in fileActionMethods.fileType" :key="index" :value="value.id">{{value.dicName}}</option>
                    </select>
                </div>

                <div style="color: #fff">
                    <label>文件格式</label>
                    <input type="checkbox" name='fileXml'  v-model="fileXml" value=""><span  style="vertical-align: middle">XML</span>
                    <input type="checkbox" name='fileJson' v-model="fileJson" value=""><span style="vertical-align: middle">JSON</span>
                    <input type="checkbox" name='filePng'  v-model="filePng" value=""><span  style="vertical-align: middle">图片</span>
                </div>
            </div>
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
  name: "fileChildrenUpload",
  data() {
    return {
      actionLabel: true,
      fileXml: false,
      fileJson: false,
      filePng: false,
      selectPictureData: [],
      fileFormData: {
        selectId: "",
        fileTypeName: "执行动作",
        fileType: [
        ]
      },
      fileActionMethods: {
        selectMethodsId: "",
        fileTypeName: "执行算法",
        fileType: []
      }
    };
  },
  props: {
    uploadParam: {
      type: Object,
      default: function(e) {
        return {
          type: "upload",
          width: "95px",
          leftWidth: "0px",
          topWidth: "6px",
          select_file: "选择文件"
        };
      }
    }
  },
  created() {
      this.getActionInfo();
  },
  mounted() {
    bus.$on("uploadChildrenFile", data => {
      this.selectPictureData = data;
    });
  },
  computed: {},
  methods: {
    getActionInfo() {
        this.fileFormData.fileType = [];
        this.fileActionMethods.fileType = [];
        this.$http.get(this.$interfaceApi.GetSingalLabel + "6").then(res => {
            if (res.data.success) {
               this.fileFormData.fileType = res.data.data;
            }
          }).catch(error => {
            console.log("===根据设备类型获取来源===", error);
          });
    },
    selectAction() {
        if(this.fileFormData.selectId === '1'){
            this.actionLabel = true;
        }else {
            this.actionLabel = false;
        }
        this.$http.get(this.$interfaceApi.GetSingalLabel + this.fileFormData.selectId).then(res => {
            if (res.data.success) {
              this.fileActionMethods.fileType = res.data.data;
            }
          }).catch(error => {
            console.log("===根据设备类型获取来源===", error);
            });       
    },
    // 选择文件
    onUpload(e) {
      if(this.selectPictureData.length !== 1){
        this.$message.showTips("warn", "请选择一张图片");
        return false;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" // 以表单传数据的格式来传递fromdata
        }
      };
      let formData = new FormData();
      let files = e.target.files;
      if (files.length ===0) {
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "请选择上传的文件。");
      } else {
        let png_number = 0;
        let json_number = 0;
        let xml_number = 0;
        for (var i = 0; i < files.length; i++) {
          let fileName = files[i].name;
          var exec = /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName.toLowerCase()) : [];

          if (exec[0].toLowerCase() !== "jpg" && exec[0].toLowerCase() !== "png" && exec[0].toLowerCase() !== "json" && exec[0].toLowerCase() !== "xml") {
                    document.getElementById('uploadFile').value = null;
                    this.$message.showTips("error", "文件格式错误，请上传一个jpg或png或json或xml格式文件。");
                    return false;
                } else {
                    if (exec[0].toLowerCase() === "jpg" || exec[0].toLowerCase() === "png") {
                        png_number += 1;
                    } else if (exec[0].toLowerCase() === "json") {
                        json_number += 1;
                    }
                    else if (exec[0].toLowerCase() === "xml") {
                        xml_number += 1;
                    }
                }
          
          formData.append("files", files[i]);
        }
        if(!this.fileXml && !this.fileJson && !this.filePng){
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "请选择上传的文件格式!");
            return false;
        }
        if(this.fileXml && xml_number === 0 ){
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "文件格式错误，没有上传XML格式文件!");
            return false;
        } else if (this.fileJson && json_number === 0){
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "文件格式错误，没有上传json格式文件!");
            return false;
        } else if (this.filePng && png_number === 0){
            document.getElementById('uploadFile').value = null;
            this.$message.showTips("error", "文件格式错误，没有上传图片格式文件!");
            return false;
        }
      }
      if(this.fileFormData.selectId === ""){
          document.getElementById('uploadFile').value = null;
          this.$message.showTips("error", "请选择执行动作");
           return false;
      }
      if(this.fileActionMethods.selectMethodsId === ""){
          document.getElementById('uploadFile').value = null;
          this.$message.showTips("error", "请选择执行算法");
          return false;
      }
      formData.append("fileAction", JSON.stringify({ actId: "8001" }));
      formData.append("fileSource", JSON.stringify({ address: "手动上传子文件" }));
      let params = {
        parentId: this.selectPictureData[0]
      };
      formData.append("fileMain", JSON.stringify(params));
      this.$http.post(this.$interfaceApi.ObjectUploadFile, formData, config).then(res => {
          document.getElementById('uploadFile').value = null;
          if(res.data.success){
            var prama = {
                "fileId": this.selectPictureData[0],
                "labId": "6,4",
                "labVal": `${this.fileFormData.selectId},${this.fileActionMethods.selectMethodsId}`
            };
            this.$http.post(this.$interfaceApi.SaveFileLabel, prama).then(res => {
            }).catch(error => {
                this.$message.showTips("error", error);
            });
              bus.$emit("uploadChildrenFileSuccess");
          }else{
              this.$message.showTips("error", res.data.msg);
          }
        }).catch(error => {
          document.getElementById('file').value = null;
        });
    }
  }
};
</script>