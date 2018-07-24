<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <div style="display:flex">
                  <div class="vas-picture-list">
                    <img v-bind:src="imgUrl" style="padding:20px; width:160px; height:160px">
                  </div>
                  <div class="vas-picture-list">
                    <img v-bind:src="imgUrl" style="padding:20px; width:160px; height:160px">
                  </div>
                </div>
            </div>

            <div class="vas-history-item">
                <div v-bind:style="{'margin-top': '20px', 'text-align': 'center'}">
                    <input type="button" name="primary" class="btn" :id="btn[0].id" :title="btn[0].title" :value="btn[0].value">
                    <input type="button" name="danger"  class="btn" :id="btn[1].id" :title="btn[1].title" :value="btn[1].value" @click="btn[1].delAll">
                    <input type="button" name="primary" class="btn" :id="btn[2].id" :title="btn[2].title" :value="btn[2].value">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "fileUpload",
  data() {
    return {
      imgUrl:"static/img/test11.jpg",
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
      },
        btn:[{
             id:"btn0",
             title:"文件上传",
             value:"文件上传"
           },
           {
             id:"btn1",
             title:"删除",
             value:"删除",
             delAll:()=> {
                const length = this.multipleSelection.length;
                let str = "";
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                  str += this.multipleSelection[i].name + " ";
                }
                this.$message.error("删除了" + str);
                this.multipleSelection = [];
              },
           },
           {
             id:"btn2",
             title:"分享",
             value:"分享"
           }
        ]      
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
