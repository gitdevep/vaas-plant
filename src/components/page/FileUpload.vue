<template>
    <div>
        <div class="vas-picture-display">
            <div class="content-common">
                <label>{{fileFormData.fileTypeName}}</label>
                <select v-model="fileFormData.selectId">
                    <option v-for="( value, index) in fileFormData.fileType" :key="index" :value="value.id">{{value.name}}</option>
                </select>
            </div>
            <div>
                <label></label>
                <label for="uploadFile">{{fileFormData.select_file}}</label>
                <input type="file" id="uploadFile" multiple="multiple"  @change='onUpload'>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "fileUpload",
  data() {
    return {
      fileFormData: {
        selectId:'1',
        select_file: "上传文件",
        fileTypeName: "属性",
        fileType: [{
            id: '1',
            name: '图片'
        },{
            id: '2',
            name: '文件'
        }]
      }
    };
  },
  created() {},
  computed: {},
  methods: {
    // 选择文件
    onUpload(e) {
      let fileName = e.target.files[0].name;
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("fileName", e.target.files[0].name);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" // 以表单传数据的格式来传递fromdata
        }
      };
      this.$http
        .post("/url/upload", formData, config)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
