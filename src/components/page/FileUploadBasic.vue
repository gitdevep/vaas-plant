<template>
    <div>
        <div class="crumbs">
            <div>文件上传</div>
        </div>
        <div class="container">
            <form>
                <div class="content-common">
                    <div>
                        <label>{{fileFormData.select_file}}</label>
                        <label for="uploadFile">{{fileFormData.select_file}}</label>
                        <input type="file" id="uploadFile" multiple="multiple"  @change='onUpload'>
                    </div>
                    <div v-if="fileData.length>0">
                        <table>
                            <thead>
                                <tr>
                                    <th>{{fileFormData.table.file_name}}</th>
                                    <th>{{fileFormData.table.process}}</th>
                                    <th>{{fileFormData.table.operation}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for ='(value, index) in fileData' :key="index">
                                    <td>{{value.name}}</td>
                                    <td></td>
                                    <td><input type="button" name="danger"  class="btn" :value="fileFormData.table.deleteFile" @click="deleteFile(index)"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <label>{{fileFormData.origin_name}}</label>
                        <select v-model="originValue">
                            <option v-for="(value, index) in originate" :key="index" :value="value.id">{{value.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label>{{fileFormData.file_name}}</label>
                        <input type="text" id="name" v-model="name"  value=''>
                    </div>
                    <div class="mg-left-30">
                        <input type="button" name="primary" class="btn" :value="fileFormData.btn_save" @click="save">
                        <input type="button" name="danger"  class="btn" :value="fileFormData.btn_cancle" @click="cancle">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: "fileUpload",
  data() {
    return {
      fileData: [], // 上传文件时的数据
      originate: [{
          "id":"123",
          "name":"公有云"
      },{
          "id":"245",
          "name":"私有云"
      },{
          "id":"rtt",
          "name":"用户"
      }], // 图片的来源
      originValue:"",
      fileFormData: {
        select_file: "选择文件",
        btn_save: "确定",
        btn_cancle: "取消",
        file_name: "名称",
        origin_name: "来源",
        table: {
            file_name:"文件名称",
            process: "上传进度",
            operation: "操作",
            deleteFile: "删除"
        }
      }
    };
  },
  created() {},
  computed: {},
  methods: {
    // 保存
    save() {
      console.log("originValue",this.originValue);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" // 以表单传数据的格式来传递fromdata
        }
      };
      this.$http
        .post("/url/upload", this.formData, config)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 取消
    cancle() {

    },
    // 选择文件
    onUpload(e) {
      let fileName = e.target.files[0].name;
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      let map = {
          name:fileName,
          formData:formData
      }
      this.fileData.push(map);
    },
    // 删除选择的文件
    deleteFile(index) {
        this.fileData.splice(index, 1);
        var obj = document.getElementById('uploadFile') ;
        obj.value=""; 
    }
  }
};
</script>
