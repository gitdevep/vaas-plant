<template>
    <div v-show="dataList.length>0">
        <div>
            <div class="vas-picture-list-item">
                <div style="margin-left:20px;"></div>
                <div class="vas-picture-list" v-for="(value, index) in dataList" :key="index"  @click.stop="selectPicture(value.id)">
                    <img v-bind:src="value.url" style="padding:10px; width:130px; height:130px">
                    <div class="list-checkbox">
                        <input type="checkbox" v-model="value.checked" @click.stop="selectFile(value)">
                    </div>
                </div>
                <div>
                  <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
                </div>
            </div>   
        </div>
         <div class="vas-picture-display">
            <div style="min-height:640px; min-width: 800px; position: relative;">
                  <div id="box" >
                      <img id='myimage' v-bind:src="imgUrl" v-bind:style="{margin:'20px', width: imgWidth+'px', height: imgHeight+'px', cursor:'pointer'}">
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from "../baseComponents/Pagination.vue";
import bus from "../../common/bus";

export default {
  name: "fileManageList",
  data() {
    return {
      total: 0, // 记录总条数
      display: 8, // 每页显示条数
      current: 1, // 当前的页数
      imgUrl: "", //放大的图片
      dataList: [], //列表数据
      selectData: [],
      downloadData: [], //图片下载数据
      imgWidth: "800",
      imgHeight: "580"
    };
  },
  components: {
    "v-pagination": pagination
  },
  created() {
    this.getListData();
  },
  mounted() {
    //实现图片的滚动放大缩小
    this.$message.bigimg();
    this.$on("deleteFile", () => {
      this.current = 1;
      this.getListData();
    });
    bus.$on("uploadChildrenFileSuccess", ()=>{
      this.getListData();
    });
    bus.$on("shareInfo", (e)=>{
       if(e.success){
         this.getListData();
       }
    });
    bus.$on("uploadChild", (e) =>{
      if(e.success){
        this.getListData();
      }
    });
  },
  methods: {
    pagechange: function(currentPage) {
      this.current = currentPage;
      this.selectData = [];
      bus.$emit("modalCallback", this.selectData);
      this.getListData();
    },
    // 用于点击小图片显示大图片
    selectPicture(id) {
      let data = this.dataList.filter((value, index) => {
        return value.id === id;
      });
      if (data.length > 0) {
        if (Number(data[0].width) <= 800) {
          this.imgWidth = data[0].width;
        }else {
          this.imgWidth = "800";
        }
        if (Number(data[0].height) <= 580) {
          this.imgHeight = data[0].height;
        }else {
          this.imgHeight = "580"
        }
        this.imgUrl = data[0].url;
      }
      this.getDetailInfo(id);
    },
    // 复选框的选择事件
    selectFile(value) {
      setTimeout(() => {
        //解决checkbox的click事件获取值相反问题
        if (value.checked) {
          //选中
          this.downloadData.push({id:value.id, url: value.url});
          this.selectData.push(value.id);
        } else {
          let _index = 0;
          this.selectData.forEach((data, index) => {
            if (data === value.id) {
              _index = index;
            }
          });
          this.downloadData.splice(_index, 1);
          this.selectData.splice(_index, 1);
        }
        bus.$emit("downloadFile", this.downloadData);
        bus.$emit("modalCallback", this.selectData);
      }, 0);
    },
    getDetailInfo(id){
      let fileLabelList = [];
      let fileUserList = [];
      this.$http.post(this.$interfaceApi.DetailInfo + id).then((res)=>{
        if(res.data.success){
          fileLabelList = res.data.data.fileLabelDicList; //标签数据
          fileUserList = res.data.data.fileAuthList; // 分享数据
          let params = {
            fileLabelList: fileLabelList,
            fileUserList: fileUserList,
            fileId: id,
          }
          bus.$emit("detailInfo",params);
        }
      })
    },
    getListData() {
      // 获取图片列表
      var param = {
        conditions: {},
        limit: this.display,
        loading: false,
        page: this.current,
        searchType: null,
        searchVal: null
      };
      this.$http.post(this.$interfaceApi.FileManageList, param).then(res => {
          if (res.data.success) {
            this.selectData = [];
            this.total = res.data.data.total;
            this.dataList = res.data.data.datas;
            this.dataList.forEach((value, index) => {
              // 创建对象
              var img = new Image();
              // 改变图片的src
              img.src = value.url;
              // 判断是否有缓存
              if (img.complete) {
                value.width = img.width;
                value.height = img.height;
              } else {
                // 加载完成执行
                img.onload = function() {
                  value.width = img.width;
                  value.height = img.height;
                };
              }
            });
            if (this.dataList[0]) {
              this.getDetailInfo(this.dataList[0].id);
              if (Number(this.dataList[0].width) <= Number(this.imgWidth)) {
                this.imgWidth = this.dataList[0].width;
              }else {
                this.imgWidth = "800";
              }
              if (Number(this.dataList[0].height) <= Number(this.imgHeight)) {
                this.imgHeight = this.dataList[0].height;
              }else {
                this.imgHeight = "580";
              }
              this.imgUrl = this.dataList[0].url;
            } else {
              this.imgUrl = "";
            }
          }
          bus.$emit("listData",{listLeigth:this.dataList.length});
        }).catch(error => {
          console.log("error=========", error);
        });
    }
  }
};
</script>
