<template>
    <div>
        <div class="vas-picture-display">
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
        selectId: "1",
        select_file: "上传文件",
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
  created() {},
  computed: {},
  methods: {
    // 选择文件
    onUpload(e) {
      let files = e.target.files;
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        var exec = /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName.toLowerCase()) : [];
        if (exec[0] !== "jpg" && exec[0] !== "png") {
          this.$message.showTips("error", "文件格式不对，请上传jpg、png格式文件!");
          return false;
        }
        formData.append("file[]", files[i]);
      }
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
