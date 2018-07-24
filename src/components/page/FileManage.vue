<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <div>
                  <div>
                    <img v-bind:src="imgUrl" style="padding:20px;max-width:100%;width:900px;min-width:'200px'">
                  </div>
                </div>
            </div>

            <div class="vas-history-item">
                <div v-bind:style="{'margin-top': '20px', 'text-align': 'center'}">
                    <input type="button" name="primary" class="btn" :id="btn[0].id" :title="btn[0].title" :value="btn[0].value" @click="upload">
                    <input type="button" name="danger"  class="btn" :id="btn[1].id" :title="btn[1].title" :value="btn[1].value" @click="btn[1].delAll">
                    <input type="button" name="primary" class="btn" :id="btn[2].id" :title="btn[2].title" :value="btn[2].value" @click="share">
                </div>
                <div v-bind:style="{'position': 'absolute', 'bottom':'40px', 'right':'40px','color':'#fff'}">
                  <a @click="previous" v-bind:style="{'cursor': 'pointer', 'display':'inline-block'}">上一张</a>
                  <a @click="next" v-bind:style="{'cursor': 'pointer', 'display':'inline-block', 'margin-left':'20px'}">下一张</a>
                </div>
            </div>
        </div>
        <div>
            <vmodal :modal ="modalData" @callback="modalCallback"></vmodal>
        </div>
    </div>
</template>

<script>
  import vmodal from './Modal.vue';
  export default {
    name: "fileManage",
    data() {
      return {
        imgUrl:"static/img/test11.jpg",
        url: "./static/vuetable.json",
        title: '分享',
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
        ],
        modalData:{
          title:'分享',
          showModal:false,
          selectId: 0,
          height:"800px",
          width:"600px",
          data:[{
              "id":"123",
              "name":"公有云"
          },{
              "id":"245",
              "name":"私有云"
          },{
              "id":"rtt",
              "name":"用户"
          }]
        },
        form: {
          name: "",
          date: "",
          address: ""
        },
        idx: -1
      };
    },
    components:{
      vmodal
    },
    created() {
      
    },
    computed: {
    },
    methods: {
      previous() {

      },
      next() {

      },
      // 确定删除
      deleteRow() {
        this.$message.success("删除成功");
        this.delVisible = false;
      },
      // 分享
      share() {
        this.modalData.showModal = true;
      },
      // 打标签
      tag() {

      },
      // 弹框的回调函数
      modalCallback(e) {
        this.modalData.showModal = !this.modalData.showModal;
        console.log(e)
      },
      selectFile(value) {
        console.log("dddd==", value);
      },
      // 文件上传
      upload() {
        this.$router.push({ path: '/fileupload', params: { data: this.data }})
      }
    }
  };
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>