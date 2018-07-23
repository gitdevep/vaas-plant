<template>
    <div>
        <div class="crumbs">
            <div><i class="el-icon-tickets"></i> 文件列表</div>
        </div>
        <div class="container">
            <div class="handle-box">
                <input type="button" name="primary" class="btn" :id="btn[0].id" :title="btn[0].title" :value="btn[0].value" @click="upload">
                <input type="button" name="danger"  class="btn" :id="btn[1].id" :title="btn[1].title" :value="btn[1].value" @click="btn[1].delAll">
                <input type="button" name="primary" class="btn" :id="btn[2].id" :title="btn[2].title" :value="btn[2].value" @click="tag">
                <input type="button" name="primary" class="btn" :id="btn[3].id" :title="btn[3].title" :value="btn[3].value" @click="share">
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" v-model="allSelect"></th>
                            <th>名称</th>
                            <th>时间</th>
                            <th>上传人</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for ='(value, index) in data' :key="index">
                            <td><input type="checkbox" v-model="checkedList[index]" @change="selectFile(index)"></td>
                            <td>{{value.name}}</td>
                            <td>{{value.date}}</td>
                            <td>{{value.address}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
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
        url: "./static/vuetable.json",
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: "",
        select_word: "",
        del_list: [],
        allSelect: [],
        checkedList: [],
        is_search: false,
        editVisible: false,
        delVisible: false,
        title: '分享',
        btn:[{
             id:"btn0",
             title:"文件上传",
             value:"文件上传"
           },
           {
             id:"btn1",
             title:"批量删除",
             value:"批量删除",
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
             title:"标签",
             value:"标签"
           },
           {
             id:"btn3",
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
      this.getData();
    },
    computed: {
      data() {
        return this.tableData.filter(d => {
          let is_del = false;
          for (let i = 0; i < this.del_list.length; i++) {
            if (d.name === this.del_list[i].name) {
              is_del = true;
              break;
            }
          }
          if (!is_del) {
            if (
              d.address.indexOf(this.select_cate) > -1 &&
              (d.name.indexOf(this.select_word) > -1 ||
                d.address.indexOf(this.select_word) > -1)
            ) {
              return d;
            }
          }
        });
      }
    },
    methods: {
      // 分页导航
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
      // 获取 easy-mock 的模拟数据
      getData() {
        // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
        if (process.env.NODE_ENV === "development") {
          this.url = "/ms/table/list";
        }
        this.$http
          .post(this.url, {
            page: this.cur_page
          })
          .then(res => {
            this.tableData = res.data.list;
          });
      },
      search() {
        this.is_search = true;
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {
        this.idx = index;
        const item = this.tableData[index];
        this.form = {
          name: item.name,
          date: item.date,
          address: item.address
        };
        this.editVisible = true;
      },
      handleDelete(index, row) {
        this.idx = index;
        this.delVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 保存编辑
      saveEdit() {
        this.$set(this.tableData, this.idx, this.form);
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      },
      // 确定删除
      deleteRow() {
        this.tableData.splice(this.idx, 1);
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